// import { Modal } from 'bootstrap';  
import { last, set } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter'; //nhập module events từ Node.js. Module này cung cấp một lớp EventEmitter để quản lý và phát các sự kiện (events).


class ModalConfirm extends Component {


    state = {
        confirm: false
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR', () => { // on để bắt sự kiện được phát ra, trong đối số thứ 2 của hàm bắt buộc là 1 callback để ta đưa các đối số từ emitter.emit vào xử lý chúng bên trong hàm callback này
            this.setState({

            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleConfirmModal();
    }



    handleOnChangeInput = (event, id) => {
        this.setState({
            /**muốn sử dụng giá trị của một biến làm tên thuộc tính trong đối tượng thì ta cần bổ vào trong dấu [] để lấyy được giá trị của biến id. 
             * [] là cú pháp Computed Property Names (tên thuộc tính được tính toán)  
             * Dấu ngoặc vuông [] cho phép bạn sử dụng giá trị của biến hoặc kết quả của biểu thức làm tên thuộc tính trong một đối tượng
             */
            [id]: event.target.value
        })
        // console.log(this.state)
    }

    handleConfirm = async (conf) => {
        if (this.props.confirmModal) {
            this.props.confirmModal(conf)
        }
        this.toggle()
    }

    render() {
        return (
            // Modal của reactstrap
            <Modal className=''
                //các props 
                isOpen={this.props.isOpen}
                size='sm'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Xác nhận thông tin</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <h2>Bạn có thực sự muốn xóa người dùng này</h2>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.props.confirmModal(true) }}
                    >
                        Ok
                    </Button>
                    {''}
                    <Button color="secondary" className='px-3'
                        onClick={() => { this.props.confirmModal(false) }}
                    >
                        Cancel
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
