import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './RemedyModal.scss';
import { Modal } from 'reactstrap';
import { toast } from "react-toastify";
import CommonUtils from "../../../../src/utils/CommonUtils"
import _ from "lodash"




class RemedyModal extends Component {

    state = {
        email: '',
        base64: '',
        doctorId: '',
        patientId: '',
        fullNamePatient: '',
        fulNameDoctor: '',
        statusId: '',
        date: '',
        timeTypePatient: '',
        timeType: ''


    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.DataPatient !== this.props.DataPatient) {
            this.setState({
                email: this.props.DataPatient.bookingData.email
            })
        }
    }

    handleSendRemedyModal = (data) => {
        if (data && !_.isEmpty(data.email) && !_.isEmpty(data.base64)) {
            this.props.handleSendRemedy(data)
        } else {
            toast.error('cần nhập đủ email và file hóa đơn đính kèm')
        }
    }

    handleCloseModal = () => {
        this.props.toggle()
        this.setState({
            base64: ''
        })
    }

    handleOnchangeInputEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    handleOnchangeImage = async (event) => {
        console.log(event.target.value)
        let img = event.target.files
        let base64Img = await CommonUtils.getBase64(img[0])
        this.setState({
            base64: base64Img
        })
    }

    render() {
        let { DataPatient, doctorName } = this.props;
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
                            Gửi kết quả khám bệnh
                        </span>
                        <span
                            className='btn-close'
                            onClick={this.handleCloseModal}
                        >
                            <i className="fa fa-times" aria-hidden="true">
                            </i>
                        </span>
                    </div>
                    <div className='modal-booking-body row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input
                                className='form-control'
                                value={this.state.email}
                                name='email'
                                onChange={(event) => this.handleOnchangeInputEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>File</label>
                            <input
                                type="file"
                                className=' form-control-file'
                                name='base64'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                    </div>
                    <div className='modal-booking-footer'>

                        <button
                            className='btn-confirm'
                            onClick={() => this.handleSendRemedyModal({
                                ...this.state,
                                doctorId: DataPatient.doctorId,
                                patientId: DataPatient.patientId,
                                fullNamePatient: DataPatient.bookingData.firstName,
                                fulNameDoctor: `${doctorName.firstName} ${doctorName.lastName}`,
                                statusId: DataPatient.statusId,
                                date: DataPatient.date,
                                timeTypePatient: DataPatient.timeTypePatient,
                                timeType: DataPatient.timeType
                            })}
                        >
                            Gửi
                        </button>

                        <button
                            className='btn-close'
                            onClick={() => this.handleCloseModal()}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
