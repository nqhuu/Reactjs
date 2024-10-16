import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss'
import * as actions from "../../../store/actions";


class TableManagerUser extends Component {

    state = {
        userRedux: []
    };


    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }


    }

    handleDeleteUser = (user) => {
        console.log(user)
        this.props.handeleDeleteUser(user.id)
    }

    render() {

        console.log("check list User ", this.props.listUsers)
        console.log("check list User state redux", this.state.userRedux)
        let arrUser = this.state.userRedux;
        return (
            <table id='TableManagerUser'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Giới tính</th>
                        <th>Chức danh</th>
                        <th>Quyền</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            let arrGender = ['M', 'L', 'O'];
                            let arrRole = ['R1', 'R2', 'R3'];
                            let arrPosition = ['Bác sĩ', 'Thạc sĩ', 'Tiến sĩ', 'Phó giáo sư', 'Giáo sư'];
                            return <tr key={index}>
                                <td>{arrUser.length - index}</td>
                                {/* <td>{index + 1}</td> */}
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.address}</td>
                                <td>{item.gender === 'M' ? 'Nam' : item.gender === "F" ? 'Nữ' : 'Khác'}</td>
                                <td>{arrPosition.find((itemPosition, indexPosition) => {
                                    if ('P'.concat(indexPosition) === item.positionId) {
                                        return itemPosition
                                    }
                                })}</td>
                                <td>{item.roleId === 'R1' ? 'Quản trị' : item.roleId === "R2" ? "Bác Sĩ" : "Bệnh Nhân"}</td>
                                <td>
                                    <button
                                        className='btn-edit'
                                        onClick={() => this.handleUpdateUser(item.id)}
                                    >
                                        <i className="fa fa-pencil-alt"></i>
                                    </button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        handeleDeleteUser: (userId) => dispatch(actions.handeleDeleteUserStart(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
