import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import BookingModal from "../Doctor/Modal/BookingModal"
import { fetchScheduleDoctorService } from '../../../services/userService'
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)

class DoctorSchedule extends Component {

    state = {
        allDays: [],
        schelduleDoctor: [],
        isOpenModal: false,
        scheduleDoctorSelect: [],
        // doctorId: -1;
    }

    // viết chữ hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    async componentDidMount() {
        await this.setArrDays(() => {
            if (this.props.doctorId && this.state.allDays[0].value) {
                this.callApiScheduleDoctor(this.props.doctorId, this.state.allDays[0].value)
            }
        })

    }

    // if (this.props.doctorId && this.state.allDays[0].value) {


    callApiScheduleDoctor = async (doctorId, value) => {
        if (doctorId && value) {
            let scheduleDoctorDb = await fetchScheduleDoctorService(value, doctorId)
            // console.log('callApiScheduleDoctor', scheduleDoctorDb)
            if (scheduleDoctorDb && scheduleDoctorDb.errCode === 0) {
                this.setState({
                    schelduleDoctor: scheduleDoctorDb.data ? scheduleDoctorDb.data : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorId !== this.props.doctorId) {
            // this.props.fetchScheduleDoctor(this.state.allDays[0].value, this.props.doctorId)
            // let scheduleDoctorDb = await fetchScheduleDoctorService(this.state.allDays[0].value, this.props.doctorId)
            // if (scheduleDoctorDb && scheduleDoctorDb.errCode === 0) {
            //     this.setState({
            //         schelduleDoctor: scheduleDoctorDb.data
            //     })
            // }
            this.callApiScheduleDoctor(this.props.doctorId, this.state.allDays[0].value)
        }
    }

    setArrDays = (callback) => {
        let allDays = [];

        // tạo mảng chứa các option cho select ngày (lấy từ ngày hiện tại tới 6 ngày tiếp theo)
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddmm = moment(new Date()).add(i, 'days').format('DD/MM');
                let today = 'Hôm nay' + ' - ' + ddmm
                object.label = today;
            } else {
                let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(lableVi);
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        }, callback)
        // return;
    }


    handleIsOpenModal = (item) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            scheduleDoctorSelect: item
        })
    }





    handleOnchangeSelectScheduke = async (event) => {
        let date = event.target.value
        let doctorId = this.props.doctorId
        if (doctorId && doctorId !== -1) {
            // this.props.fetchScheduleDoctor(date, doctorId)
            let scheduleDoctorDb = await fetchScheduleDoctorService(date, doctorId)
            if (scheduleDoctorDb && scheduleDoctorDb.errCode === 0) {
                this.setState({
                    schelduleDoctor: scheduleDoctorDb.data
                })
            }

        }

    }

    render() {
        // console.log('props', this.props.doctorId)
        let { allDays, schelduleDoctor, isOpenModal, scheduleDoctorSelect } = this.state
        return (
            <>
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
                                                <button
                                                    key={index}
                                                    onClick={() => this.handleIsOpenModal(item)}
                                                >
                                                    {item.timeTypeData.valueEn}
                                                </button>
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
                <BookingModal
                    isOpenModal={this.state.isOpenModal}
                    toggle={this.handleIsOpenModal}
                    schelduleDoctorSelect={this.state.scheduleDoctorSelect}
                // dataTime={scheduleDoctorSelect}
                />


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        detailDoctor: state.admin.detailDoctor,
        // schelduleDoctor: state.admin.schelduleDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchScheduleDoctor: (date, doctorId) => dispatch(actions.fetchScheduleDoctor(date, doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
