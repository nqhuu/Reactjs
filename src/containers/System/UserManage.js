import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, updateUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalConfirm from './ModalConfirm';
import axios from 'axios';
import { emitter } from '../../utils/emitter'; //nhập module events từ Node.js. Module này cung cấp một lớp EventEmitter để quản lý và phát các sự kiện (events).
import { update } from 'lodash';
import { dateFilter } from 'react-bootstrap-table2-filter';

class UserManage extends Component {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         arrUsers: [],
    //         editUser: {},
    //         isOpenModalUser: false,
    //         isOpenModalConfirm: false,
    //         dataConfirm: '',
    //     };

    // }

    state = {
        arrUsers: [],
        editUser: {},
        isOpenModalUser: false,
        isOpenModalConfirm: false,
        dataConfirm: '',
    };


    async componentDidMount() {
        await this.getAllUsersFromReact()

    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
                isOpenModalUser: false,
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleConfirmModal = async () => {
        this.setState({
            isOpenModalConfirm: !this.state.isOpenModalConfirm,
        })
    }


    // createNewUser = async (data) => { // data sẽ được lấy bên component con ModalUser, hàm này sẽ dược truyền vào ModalUser thông qua props của ModalUser
    //     // console.log('state cha: ', data)
    //     try {
    //         let response = await createNewUserService(data) // truyền dữ liệu sang hàm createNewUserService bên userSevice để thử hiện cập nhật dữ liệu trong db
    //         if (response && response.errCode !== 0) {
    //             alert(response.errMessage)
    //         } else {
    //             await this.getAllUsersFromReact();

    //         }
    //         // console.log('createNewUser', response)
    //     } catch (e) {
    //         return e
    //     }
    // }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                emitter.emit('EVENT_CLEAR', 'đối số thứ 2', '...đối số n') // emit để phát đi sự kiện, ta cos thể truyền thêm sữ liệu vào emit ở đối số thứ 2 sau dấu , với tất cả kiểu dữ liệu
            }

        } catch (e) {
            return e
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrSkip = ['roleId', 'image', 'positionId', 'gender',]
        for (let key in this.state.editUser) {
            if (!this.state.editUser[key] && !arrSkip.includes(key)) {
                isValid = false;
                alert(`nhập ${key}`);
                console.log(key)
                break;
            }
        }
        return isValid
    }

    handleOnchangeUpdateUser = async (event, id) => {
        let editUserCopy = { ...this.state.editUser }
        if (id === 'gender') {
            editUserCopy[id] = event.target.value
        } else {
            editUserCopy[id] = event.target.value
        }
        this.setState({
            editUser: editUserCopy
        }, () => console.log(this.state.editUser))
    }


    handleUpdateUser = async (user) => {
        try {
            let { arrUsers, editUser } = this.state;
            let checkLengEditUser = Object.keys(editUser).length === 0
            let checkValidateInput = this.checkValidateInput()
            if (!checkLengEditUser && user.id === editUser.id && checkValidateInput) {
                // console.log(editUser)
                let response = await updateUserService(editUser)
                if (response && response.errCode !== 0) {
                    alert(response.errMessage)
                } else {
                    let arrUsersCopy = [...arrUsers]
                    let indexUserUpdate = arrUsersCopy.findIndex(item => item.id === editUser.id)
                    arrUsersCopy[indexUserUpdate] = editUser
                    this.setState({
                        arrUsers: arrUsersCopy,
                        editUser: {},
                    })
                    return;
                }

            }

            this.setState({
                editUser: user
            })

        } catch (e) {
            console.log(e)
        }
    }

    confirmModal = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                isOpenModalConfirm: true,
                resolveModal: resolve,
            })
        })
    }

    handleDeleteUser = async (userId) => {
        try {
            // let dataConfirm = await this.confirmModal()
            // console.log(dataConfirm)
            // if (dataConfirm) {
            let response = await deleteUserService(userId.id)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
            }
            // }

        } catch (e) {
            console.log(e)
        }
    }


    handleCancelUpdateUser = async () => {
        this.setState({
            editUser: {}
        })
    }



    render() {
        let { arrUsers, editUser } = this.state;
        let checkLengEditUser = Object.keys(editUser).length === 0
        return (
            <div className="users-container">
                {/* <ModalConfirm
                    isOpen={this.state.isOpenModalConfirm}
                    toggleConfirmModal={this.toggleConfirmModal}
                    confirmModal={this.confirmModal}

                /> */}
                <ModalUser
                    // truyền props cho file ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className='title text-center'>MANAGE USERS</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"> </i>
                        add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone number</th>
                                <th>Address</th>
                                <th>Giới tính</th>
                                <th>Quyền</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                let arrRole = ['Admin', 'Docter', 'User']
                                return (
                                    <tr key={item.id}>
                                        {!checkLengEditUser && item.id === editUser.id ?
                                            <>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td><input type='text' value={editUser.firstName} onChange={(event) => this.handleOnchangeUpdateUser(event, 'firstName')} /></td>
                                                <td><input type='text' value={editUser.lastName} onChange={(event) => this.handleOnchangeUpdateUser(event, 'lastName')} /></td>
                                                <td><input type='text' value={editUser.address} onChange={(event) => this.handleOnchangeUpdateUser(event, 'address')} /></td>
                                                <td><select name='gender'
                                                    value={editUser.gender}
                                                    onChange={(event) => { this.handleOnchangeUpdateUser(event, 'gender') }}
                                                >
                                                    <option value={0}>Male</option>
                                                    <option value={1}>Female</option>
                                                </select></td>
                                                <td><select name='roleId'
                                                    value={editUser.roleId}
                                                    onChange={(event) => { this.handleOnchangeUpdateUser(event, 'roleId') }}
                                                >
                                                    <option value={1}>Admin</option>
                                                    <option value={2}>Docter</option>
                                                    <option value={3}>User</option>
                                                </select>
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.phonenumber}</td>
                                                <td>{item.address}</td>
                                                <td>{item.gender == 1 ? 'Female' : 'Male'}</td>
                                                <td>{arrRole.find((role, indexRole) => +item.roleId === indexRole + 1)}</td>

                                            </>
                                        }
                                        <td>
                                            {!checkLengEditUser && item.id === editUser.id ?
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleUpdateUser(item)}
                                                >
                                                    <i className="fas fa-save"></i>
                                                </button>
                                                :
                                                <>

                                                    <button
                                                        className='btn-edit'
                                                        onClick={() => this.handleUpdateUser(item)}
                                                    >
                                                        <i className="fa fa-pencil-alt"></i>
                                                    </button>
                                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa fa-trash"></i></button>
                                                </>
                                            }

                                            {!checkLengEditUser && item.id === editUser.id ?
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleCancelUpdateUser(item)}><i className="fas fa-window-close"></i>
                                                </button> : ''}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
