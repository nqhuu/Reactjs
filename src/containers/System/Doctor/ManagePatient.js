import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
// import moment from "moment";
import _ from 'lodash';
import { toast } from "react-toastify";
// import { dateFormat } from "../../../utils";


class ManagePatient extends Component {

    state = {
        // selectedOption: '',
        allPatient: [],
        currentDate: new Date(),
        rangeTime: [],
        selectPatient: '',
        doctorId: ''

    };

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {

        }
    }

    handleChange = (data) => {
        this.setState({
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
        console.log(this.props)
        let { rangeTime, selectPatient } = this.state
        // console.log('rangeTime', rangeTime)
        // console.log('state', this.state)
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
                            // onChange={this.handleChange}
                            // options={options}
                            options={this.state.allPatient}
                        />
                    </div>
                </div>
                <div className="table-patient">
                    <table>
                        <thead>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </thead>
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
                    </table>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // bulkCreateSchedule: (data) => dispatch(actions.bulkCreateSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
