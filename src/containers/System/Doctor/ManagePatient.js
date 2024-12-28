import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
// import moment from "moment";
import _ from 'lodash';
import { toast } from "react-toastify";
import { getListPatientForDoctor, getAllPatient } from "../../../services/userService"
import moment from 'moment';



class ManagePatient extends Component {

    state = {
        // selectedOption: '',
        allPatientSelect: [],
        allPatient: [],
        currentDate: new Date(),
        selectPatient: '',
        doctorId: ''
    };

    async componentDidMount() {
        let { currentDate, selectPatient } = this.state;
        let doctorId = this.props.user.id;
        // convert to timestamp 
        let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
        let formatDate = new Date(timeStem).getTime();

        await this.getAllPatientForDoctor(doctorId, formatDate, selectPatient.value)
        // await this.getPatientForDoctor(doctorId, formatDate, selectPatient.value)

    }

    getAllPatientForDoctor = async (doctorId, formatDate,) => {

        let response = await getAllPatient(doctorId, formatDate)
        if (response && response.errCode === 0) {
            let patientData = response.data
            let allPatient = patientData.map((item, index) => {
                let patient = {};
                patient.value = item.patientId;
                patient.label = item.bookingData.firstName;
                return patient
            })

            allPatient.unshift({
                label: 'Tất cả',
                value: null
            })

            if (this.state.selectPatient) {
                let allPatientCopy = [...this.state.allPatient];
                let allPatientIs = allPatientCopy.filter((item, index) => item.patientId === this.state.selectPatient.value)
                this.setState({
                    allPatient: allPatientIs,
                })
            } else {
                this.setState({
                    allPatientSelect: allPatient,
                    allPatient: patientData
                })
            }

        }
    }

    // getPatientForDoctor = async (doctorId, formatDate, patientId) => {
    //     let response = await getListPatientForDoctor(doctorId, formatDate, patientId)
    //     if (response && response.errCode === 0) {
    //         let patientData = response.data
    //         this.setState({
    //             allPatient: patientData
    //         })
    //     }
    // }

    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component

        if (prevState.selectPatient !== this.state.selectPatient) {
            let { currentDate, selectPatient } = this.state;
            let doctorId = this.props.user.id;
            // convert to timestamp 
            let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
            let formatDate = new Date(timeStem).getTime();

            await this.getAllPatientForDoctor(doctorId, formatDate, selectPatient.value)
        }
        if (prevState.currentDate !== this.state.currentDate) {
            let { currentDate, selectPatient } = this.state;
            let doctorId = this.props.user.id;
            // convert to timestamp 
            let timeStem = currentDate.setHours(0, 0, 0, 0) //cho giờ về 0000
            let formatDate = new Date(timeStem).getTime();

            await this.getAllPatientForDoctor(doctorId, formatDate, selectPatient.value)
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
        let { selectPatient, allPatientSelect, allPatient } = this.state
        console.log(selectPatient)
        console.log(this.state)
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
                        <tbody>
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                        </tbody>
                    </table>
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
