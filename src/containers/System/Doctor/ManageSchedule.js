import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import _ from 'lodash';
import { toast } from "react-toastify";
import { dateFormat } from "../../../utils";


class ManageSchedule extends Component {

    state = {
        // selectedOption: '',
        allDoctor: [],
        currentDate: '',
        rangeTime: [],
        selectDoctor: {},
    };

    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetAllScheduleTime()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let rangeTime = this.props.allScheduleTime;
            if (rangeTime && rangeTime.length > 0) {
                rangeTime = rangeTime.map(item => ({ ...item, isSelected: false })) // thêm thuộc tính isSelected cho rangeTime
            }
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleChange = (data) => {
        this.setState({
            selectDoctor: data
        })
    }

    buildDataInputSelect = (inputData) => {
        let options = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let objectOptions = {};
                objectOptions.label = `${item.firstName} ${item.lastName}`;
                objectOptions.value = item.id;
                options.push(objectOptions);
            })
        }
        return options
    }

    handleOnchangeDatePicker = (date) => {
        console.log(typeof date, date)
        if (date && Array.isArray(date)) {
            this.setState({
                currentDate: date[0]
            })
        }
    }


    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected // đổi giá trị của thuộc tính raneTime
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { currentDate, rangeTime, selectDoctor } = this.state
        let saveSchedule = [];
        let formatDate = new Date(currentDate).getTime();
        if (selectDoctor && _.isEmpty(selectDoctor)) {
            toast.error('Chọn Doctor');
            return;
        }
        if (!currentDate) {
            toast.error('Chọn Ngày');
            return;
        }
        if (rangeTime && rangeTime.length > 0) {
            let rangeTimeIsSelect = rangeTime.filter((item, index) => item.isSelected === true)
            rangeTimeIsSelect.forEach((item, index) => {
                let objectSave = {}
                // objectSave.date = moment(currentDate).format(dateFormat.SEND_TO_SERVER); // sử dụng thư viện moment để format date
                objectSave.date = formatDate; // sử dụng new Date để format date sang timestamp do kiểu dữ liệu trên server đang để là datetime
                objectSave.doctorId = selectDoctor.value;
                objectSave.timeType = item.keyMap;
                saveSchedule.push(objectSave);
            })
        } else {
            toast.error('Chọn thời gian')
            return;
        }
        await this.props.bulkCreateSchedule({
            saveSchedule: saveSchedule,
            formatDate: formatDate,
            doctorId: selectDoctor.value,
        });
    }

    render() {
        let { allDoctor, selectDoctor, rangeTime } = this.state
        // console.log('rangeTime', rangeTime)
        // console.log('state', this.state)
        return (
            <div className="manage-schedule-container" >
                <div className="m-s-title">
                    Quản lý kế hoạch khám bệnh của bác sĩ
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={selectDoctor}
                                onChange={this.handleChange}
                                // options={options}
                                options={this.state.allDoctor}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date().setHours(0, 0, 0, 0)} //{new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return <div
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                        className={item.isSelected ? "btn btn-schedule active" : "btn btn-schedule"}
                                    >
                                        {item.valueEn}
                                    </div>
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule" onClick={() => this.handleSaveSchedule()}>Lưu thông tin</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()), // fire 1 action đến redux
        fetAllScheduleTime: () => dispatch(actions.fetAllScheduleTime()),
        bulkCreateSchedule: (data) => dispatch(actions.bulkCreateSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
