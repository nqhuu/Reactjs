import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorSchedule.scss";
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
// import Select from 'react-select';
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)

class DoctorSchedule extends Component {

    state = {
        allDays: [],
        schelduleDoctor: [],
        // doctorId: -1;
    }

    // viết chữ hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    async componentDidMount() {

        let allDays = this.getArrDays()
        // let doctorId = this.props.doctorId
        this.setState({
            allDays: allDays,
            // doctorId: doctorId,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.schelduleDoctor !== this.props.schelduleDoctor) {
            this.setState({
                schelduleDoctor: this.props.schelduleDoctor
            })
        }

        if (prevProps.doctorId !== this.props.doctorId) {
            this.props.fetchScheduleDoctor(this.state.allDays[0].value, this.props.doctorId)
        }
    }

    getArrDays = () => {
        let allDays = [];

        // tạo mảng chứa các option cho select ngày (lấy từ ngày hiện tại tới 6 ngày tiếp theo)
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddmm = moment(new Date()).add(i, 'days').format('DD/MM');
                let today = 'Hôm nay' + '-' + ddmm
                object.label = today;
            } else {
                let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(lableVi);
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;

    }




    handleOnchangeSelectScheduke = (event) => {
        // console.log('handleOnchangeSelectScheduke', event.target.value)
        // console.log('handleOnchangeSelectScheduke id', this.props.doctorId)
        let date = event.target.value
        let doctorId = this.props.doctorId
        if (doctorId && doctorId !== -1) {
            this.props.fetchScheduleDoctor(date, doctorId)
        }

    }

    render() {
        let { allDays, schelduleDoctor } = this.state
        // console.log('schelduleDoctor', schelduleDoctor)
        return (

            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelectScheduke(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'><i className="fas fa-calendar-alt"><span>Lịch khám</span></i></div>
                    <div className='time-content'>
                        {schelduleDoctor && schelduleDoctor.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {schelduleDoctor.map((item, index) => {
                                        return (
                                            <button key={index}>{item.timeTypeData.valueEn}</button>
                                            // console.log(item)
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'> Chọn <i className="fas fa-hand-point-up"></i> và đặt lịch (miễn phí)</div>
                            </>
                            : 'Bác sĩ không làm việc vào ngày này, vui lòng chọn ngày khác'
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        detailDoctor: state.admin.detailDoctor,
        schelduleDoctor: state.admin.schelduleDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchScheduleDoctor: (date, doctorId) => dispatch(actions.fetchScheduleDoctor(date, doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
