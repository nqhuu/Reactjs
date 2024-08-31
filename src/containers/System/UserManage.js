import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, updateUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import axios from 'axios';
import { emitter } from '../../utils/emitter'; //nhập module events từ Node.js. Module này cung cấp một lớp EventEmitter để quản lý và phát các sự kiện (events).
import { update } from 'lodash';

class UserManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            editUser: {},
        };

    }



    async componentDidMount() {
        await this.getAllUsersFromReact()

    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
                isOpenModalUser: false
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

    handleOnchangeUpdateUser = async (event, id) => {
        let editUserCopy = { ...this.state.editUser }
        editUserCopy[id] = event.target.value
        this.setState({
            editUser: editUserCopy
        })
    }

    handleUpdateUser = async (user) => {
        try {
            let { arrUsers, editUser } = this.state;
            let checkLengEditUser = Object.keys(editUser).length === 0
            if (!checkLengEditUser && user.id === editUser.id) {
                let response = await updateUserService(editUser)
                if (response && response.errCode !== 0) {
                    alert(response.errMessage)
                } else {
                    let stateCopy = [...this.setState]
                    let indexUserUpdate = stateCopy.findIndex(item => item.id === editUser.id)
                    stateCopy[indexUserUpdate] = this.editUser
                    this.setState({
                        arrUsers: stateCopy,
                        editUser: {},
                    })
                }
            }

            this.setState({
                editUser: user
            })

        } catch (e) {
            console.log(e)
        }
    }


    handleDeleteUser = async (userId) => {
        try {
            let response = await deleteUserService(userId.id)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
            }
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

        console.log(editUser)
        return (
            <div className="users-container">
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
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        {!checkLengEditUser && item.id === editUser.id ?
                                            <>
                                                <td>{index + 1}</td>
                                                {/* <input type='text' value={item.email} onChange={(event)=>this.handleOnchangeUpdateUser(event)}/> */}
                                                <td>{item.email}</td>
                                                <td><input type='text' value={editUser.firstName} onChange={(event) => this.handleOnchangeUpdateUser(event, 'firstName')} /></td>
                                                {/* <td><input type='text' value={item.firstName} /></td> */}
                                                <td><input type='text' value={editUser.lastName} onChange={(event) => this.handleOnchangeUpdateUser(event, 'lastName')} /></td>
                                                <td><input type='text' value={editUser.address} onChange={(event) => this.handleOnchangeUpdateUser(event, 'address')} /></td>
                                            </>
                                            :
                                            <>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                            </>
                                        }
                                        <td>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleUpdateUser(item)}>
                                                {!checkLengEditUser && item.id === editUser.id ? <i className="fas fa-save"></i> : <i className="fa fa-pencil-alt"></i>}
                                            </button>

                                            {!checkLengEditUser && item.id === editUser.id ?
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleCancelUpdateUser(item)}><i className="fas fa-window-close"></i>
                                                </button> : ''}

                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa fa-trash"></i></button>
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
