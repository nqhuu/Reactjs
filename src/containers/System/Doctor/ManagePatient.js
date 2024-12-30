import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
// import moment from "moment";
import _ from 'lodash';
import { toast } from "react-toastify";
import { getListPatientForDoctor } from "../../../services/userService"
import moment from 'moment';



class ManagePatient extends Component {

    state = {
        // selectedOption: '',
        allPatientSelect: [],
        allPatient: [],
        currentDate: new Date(),
        selectPatient: {
            value: null,
            label: 'Tất cả',
        },
        doctorId: ''
    };

    async componentDidMount() {
        let { currentDate } = this.state;
        let doctorId = this.props.user.id;
        // convert to timestamp 
        let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
        let formatDate = new Date(timeStem).getTime();

        await this.getAllPatientForDoctor(doctorId, formatDate)

    }

    getAllPatientForDoctor = async (doctorId, formatDate,) => {
        let { selectPatient } = this.state
        let response = await getListPatientForDoctor(doctorId, formatDate)
        if (response && response.errCode === 0) {
            let patientData = response.data;
            let allPatient = patientData.map((item, index) => {
                let patient = {};
                patient.value = item.patientId;
                patient.label = item.bookingData.firstName;
                return patient
            })

            allPatient.unshift({
                value: null,
                label: 'Tất cả',
            })
            this.setState({
                allPatientSelect: allPatient
            })
            let allPatientCopy = [...patientData];
            allPatientCopy.sort()
            if (selectPatient.value) {
                let allPatientSl = allPatientCopy.filter((item, index) => item.patientId === selectPatient.value)
                this.setState({
                    allPatient: allPatientSl,
                })
            } else {
                this.setState({
                    allPatient: patientData
                })
            }

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component

        if (prevState.selectPatient !== this.state.selectPatient) {
            let { currentDate } = this.state;
            let doctorId = this.props.user.id;

            // convert to timestamp 
            let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
            let formatDate = new Date(timeStem).getTime();

            await this.getAllPatientForDoctor(doctorId, formatDate)
        }

        if (prevState.currentDate !== this.state.currentDate) {
            let { currentDate } = this.state;
            let doctorId = this.props.user.id;

            // convert to timestamp 
            let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
            let formatDate = new Date(timeStem).getTime();

            await this.getAllPatientForDoctor(doctorId, formatDate)
        }
    }

    handleChange = (data) => {
        this.setState({
            selectPatient: data
        })
    }


    handleOnchangeDatePicker = (date) => {
        // console.log(typeof date, date)
        if (date && Array.isArray(date)) {
            this.setState({
                currentDate: date[0]
            })
        }
    }


    render() {
        let { selectPatient, allPatientSelect, allPatient } = this.state;
        console.log('allPatient', allPatient)

        return (
            <div className="manage-patient-container" >
                <div className="m-s-title">
                    Quản lý lịch khám bệnh
                </div>
                <div className="row">
                    <div className="col-3 form-group">
                        <label>Chọn ngày</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        // minDate={new Date().setHours(0, 0, 0, 0)} // cho phép nhận minDate là ngày hiện tại
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>Chọn bệnh nhân</label>
                        <Select
                            value={selectPatient}
                            // className="form-control"
                            onChange={this.handleChange}
                            options={allPatientSelect}
                        />
                    </div>
                </div>
                <div className="table-patient">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th className="column-time">Thời gian hẹn</th>
                                <th className="column-name">Họ Tên</th>
                                <th className="column-gender">Giới tính</th>
                                <th className="column-email">Email</th>
                                <th className="column-phoneNumber">Số điện thoại</th>
                                <th className="column-address">Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPatient && allPatient.length > 0 &&
                                allPatient.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td className="column-time">{item.timeTypePatient.valueVi}</td>
                                            <td className="column-name">{item.bookingData.firstName}</td>
                                            <td className="column-gender">{item.bookingData.genderData.valueVi}</td>
                                            <td className="column-email">{item.bookingData.email}</td>
                                            <td className="column-phoneNumber">{item.bookingData.phonenumber}</td>
                                            <td className="column-address">{item.bookingData.address}</td>
                                            <td className="btn-action">
                                                {
                                                    <div className="action">
                                                        <div className="btn-complete"><i class="fa fa-check" aria-hidden="true"></i></div>
                                                        <div className="btn-send-email-invoice"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                                        <div className="btn-print-invoice"><i className="fa fa-print" aria-hidden="true"></i></div>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {!allPatient || allPatient.length === 0 &&
                        <div className="notification">Hiện tại không có lịch khám nào vào ngày này</div>
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // bulkCreateSchedule: (data) => dispatch(actions.bulkCreateSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
