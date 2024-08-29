// import { Modal } from 'bootstrap';  
import { last, set } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
class ModalUser extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         arrUsers: []
    //     }

    // }

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        sex: '1',
        role: '2'

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    // hàm check khu cá trường input xem đã nhập đủ hay chưa
    checkValidInput = () => {
        let isValid = true
        let arrValid = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber']
        for (let i = 0; i < arrValid.length; i++) {
            if (!this.state[arrValid[i]]) {
                isValid = false;
                console.log(this.state[arrValid[i]])
                alert(`bạn cần nhập ${arrValid[i]}`)
                break;
            }
        }
        return isValid;
    }


    handleAddNewUser = () => {
        if (this.checkValidInput()) {
            this.props.createNewUser(this.state) // truyền data cho hàm createNewUser được đặt ở bên component cha (Usermanage)
        }
    }




    render() {

        // console.log('check child props', this.props);
        // console.log('check child open Modal', this.props.isOpen);

        return (
            // Modal của bootraps
            <Modal

                //các props 
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}

                className={'modal-user-container'}
                size='lg' // kích thước khổ của modal 
            // centered  // căn giữa 
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="text" name="email" placeholder='Email'
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" name="password" placeholder='Password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type="text" name="firstName" placeholder='First Name'
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type="text" name="lastName" placeholder='Last Name'
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type="text" name="address" placeholder='Address'
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container width-iput-3'>
                            <label>Phonenumber</label>
                            <input type="text" name="phonenumber" placeholder='Phone Number'
                                onChange={(event) => { this.handleOnChangeInput(event, 'phonenumber') }}
                                value={this.state.phonenumber}
                            />
                        </div>
                        <div className='input-container width-iput-3'>
                            <label>Sex</label>
                            <select name='sex'
                                onChange={(event) => { this.handleOnChangeInput(event, 'sex') }}
                                value={this.state.sex}
                            >
                                <option value={'1'}>Male</option>
                                <option value={'0'}>Female</option>
                            </select>
                        </div>
                        <div className='input-container width-iput-3'>
                            <label>Role</label>
                            <select name='role'
                                onChange={(event) => { this.handleOnChangeInput(event, 'role') }}
                                value={this.state.role}
                            >
                                <option value={'1'}>admin</option>
                                <option value={'2'}>docter</option>
                            </select>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    >Add new</Button>{''}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
