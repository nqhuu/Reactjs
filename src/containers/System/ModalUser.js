// import { Modal } from 'bootstrap';  
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {

        console.log('check child props', this.props);
        console.log('check child open Modal', this.props.isOpen);

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
                            <input type="text" />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type="text" />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type="text" />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type="text" />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>Save changes</Button>{''}
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
