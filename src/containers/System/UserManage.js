import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import axios from 'axios';

class UserManage extends Component {


    // constructor(props) {
    //     super(props);
    //     this.
    // }
    state = {
        arrUsers: []
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


    createNewUser = async (data) => { // data sẽ được lấy bên component con ModalUser, hàm này sẽ truyền vào ModalUser thông qua props của ModalUser
        // console.log('state cha: ', data)
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();

            }
            // console.log('createNewUser', response)
        } catch (e) {
            return e
        }
    }

    handleEditUser = (id) => {

    }

    render() {
        let arrUsers = this.state.arrUsers;
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
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fa fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={(item) => this.handleEditUser(item.id)}><i className="fa fa-trash"></i></button>
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
