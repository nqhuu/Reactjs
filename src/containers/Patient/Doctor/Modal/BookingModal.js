import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../../Doctor/ProfileDoctor'
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import _ from 'lodash';
import { toast } from "react-toastify";



class BookingModal extends Component {

    state = {
        detailDoctor: [],
        genderArray: [],
        // schelduleDoctorSelect: {},
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthDay: '',
        gender: 'M',
        doctorId: '',
        timeType: '',
        // date: '',
    }

    async componentDidMount() {
        this.props.getGenderStart()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            })
        }

        if (prevProps.schelduleDoctorSelect !== this.props.schelduleDoctorSelect) {
            if (this.props.schelduleDoctorSelect && !_.isEmpty(this.props.schelduleDoctorSelect))
                this.setState({
                    doctorId: this.props.schelduleDoctorSelect.doctorId,
                    timeType: this.props.schelduleDoctorSelect.timeType,
                    // date: this.props.schelduleDoctorSelect.date,
                    // schelduleDoctorSelect: this.props.schelduleDoctorSelect,
                })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArray: this.props.genderRedux
            })
        }

    }


    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnchangeDatePicker = (date) => {
        if (date && Array.isArray(date)) {
            this.setState({
                // birthDay: new Date(date[0]).getTime() // convert to timestamp 
                birthDay: date[0]
            })
        }
    }

    handleCloseModal = () => {
        this.props.toggle()
        this.setState({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            gender: 'M',
        })
    }

    handleOnchangeSelect = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    handleConfirmBooking = async () => {
        let birthDayTimeStamp = new Date(this.state.birthDay).getTime()
        let { fullName, phoneNumber, email, address, reason, birthDay } = this.state
        if (birthDay) { birthDay = new Date(birthDay).getTime() }
        let arrayValidate = [fullName, phoneNumber, email, address, reason]
        let isEmpty = arrayValidate.some((item, index) => _.isEmpty(item))
        if (isEmpty || birthDay.toString().length <= 0) {
            toast.warning('Bạn cần nhập đủ các trường có dấu (*)')
        } else {
            let res = await this.props.patientBookAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                // birthDay: birthDayTimeStamp,
                gender: this.state.gender,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                date: birthDayTimeStamp,
            })
            console.log(res)
            if (res && res.errCode === 0) {
                this.handleCloseModal()
            }
        }

    }



    render() {

        let { detailDoctor, genderArray } = this.state
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
                            onClick={this.handleCloseModal}
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
                                <label>Họ Tên (*)</label>
                                <input
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnchangeInput(e, 'fullName')}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại (*)</label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email (*)</label>
                                <input
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ (*)</label>
                                <input
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}

                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám (*)</label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày Sinh (*)</label>
                                {/* <input className='form-control' /> */}
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthDay}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính (*)</label>
                                <select
                                    className='form-control'
                                    value={this.state.gender}
                                    onChange={(e) => this.handleOnchangeSelect(e)}
                                >
                                    <option value="" disabled>Chọn giới tính</option>
                                    {genderArray && genderArray.length > 0 &&
                                        genderArray.map((item, index) =>
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {item.valueVi}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>



                    <div className='modal-booking-footer'>
                        <button
                            className='btn-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >
                            Xác nhận
                        </button>
                        <button
                            className='btn-close'
                            onClick={() => this.handleCloseModal()}
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
        genderRedux: state.admin.gender,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
