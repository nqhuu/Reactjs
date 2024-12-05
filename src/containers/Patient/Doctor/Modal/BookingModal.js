import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../../Doctor/ProfileDoctor'

class BookingModal extends Component {

    state = {
        detailDoctor: [],
        schelduleDoctorSelect: {},

    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            })
        }

        if (prevProps.schelduleDoctorSelect !== this.props.schelduleDoctorSelect) {
            this.setState({
                schelduleDoctorSelect: this.props.schelduleDoctorSelect
            })
        }


    }

    render() {
        // console.log('modal detailDoctor====>', this.props.detailDoctor)
        // console.log('modal scheduleDoctorSelect====>', this.state.schelduleDoctorSelect.timeType)

        let { detailDoctor } = this.state
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                backdrop={true}
                size='lg'
                className='Modal-booking-container'
            >
                <div className='modal-booking-content'>
                    <div className='modal-booking-header'>
                        <span className='content-header'>
                            Đặt lịch khám bệnh
                        </span>
                        <span
                            className='btn-close'
                            onClick={this.props.toggle}
                        >
                            <i className="fa fa-times" aria-hidden="true">
                            </i></span>
                    </div>



                    <div className='modal-booking-body'>
                        <div className='profile-doctor'>
                            <ProfileDoctor
                                showInfor={false}
                                schelduleDoctorSelect={this.props.schelduleDoctorSelect}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ Tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>



                    <div className='modal-booking-footer'>
                        <button className='btn-confirm'>Xác nhận</button>
                        <button
                            className='btn-close'
                            onClick={this.props.toggle}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
