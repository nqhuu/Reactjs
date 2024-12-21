import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ProfileDoctor.scss";
import NumericFormat from 'react-number-format';
import { getProfileDoctorById, DetailDoctorService } from '../../../services/userService'
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)
import _ from 'lodash';

class ProfileDoctor extends Component {

    state = {
        dataTime: [],
        detailDoctor: []
    }


    async componentDidMount() {
        this.setState({
            dataTime: this.props.dataTime
        })
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            detailDoctor: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await DetailDoctorService(id)
            console.log(res)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataTime !== this.props.dataTime) {
            this.setState({
                dataTime: this.props.dataTime
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    renderTimeBooking = (dataTime, detailDoctor) => {
        if (dataTime && !_.isEmpty(dataTime.timeTypeData) && !_.isEmpty(detailDoctor.doctorData)) {
            let date = +dataTime.date
            return (
                <>
                    <div className='detail-right-schedule'>
                        <div className='icon-date-time'><i className="fa fa-calendar" aria-hidden="true"></i></div>
                        {dataTime && dataTime.timeTypeData &&
                            <div className='date-time'>
                                <span>{dataTime.timeTypeData.valueVi}</span>
                                <span> - </span>
                                <span>{this.capitalizeFirstLetter(moment(date).format('dddd - DD/MM/YYYY'))}</span>
                            </div>
                        }

                    </div>
                    <div className='detail-right-address-clinic'>
                        <div className='icon-clinic'>
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </div>
                        <div className='address-clinic'>
                            <div className='clinic'>{detailDoctor.doctorInfor.nameClinic}</div>
                            <div className='address'>{detailDoctor.doctorInfor.addressClinic}</div>
                            <div className='booking-free'>Miễn phí đặt lịch</div>
                        </div>
                    </div>
                </>
            )
        }
        return <></>
    }

    render() {

        let { } = this.props
        let { dataTime, detailDoctor } = this.state
        console.log('props detailDoctor profile', detailDoctor)
        console.log('props dataTime profile', dataTime)

        return (
            <>
                <div className='detail-container'>
                    <div className='detail-top'>
                        <div className='detail-top-left'
                            style={{ backgroundImage: `url(${detailDoctor.image})` }}
                        >

                        </div>

                        <div className='detail-top-right'>
                            <div className='detail-right-up'>
                                {/* đặt điều kiện để tránh việc db chưa trả lên dữ liệu thì sẽ bị lỗi ứng dụng */}
                                {detailDoctor && detailDoctor.doctorData && detailDoctor.doctorData.valueVi ?
                                    `${detailDoctor.doctorData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}` : ''}
                            </div>
                            {this.props.showInfor ?
                                <div className='detail-right-down'>
                                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description ?
                                        <span dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.description }} /> : ''
                                    }
                                </div>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime, detailDoctor)}
                                </>
                            }



                        </div>

                    </div>
                    <div className='price'>Giá khám: <span> {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.priceData.valueVi ?
                        <NumericFormat
                            value={detailDoctor.doctorInfor.priceData.valueVi}
                            thousandSeparator={true}
                            displayType='text'
                            suffix={'vnd'}
                            className={''}
                        />
                        : ''}</span></div>
                </div>
            </>
        );
    }


}

const mapStateToProps = state => {
    return {
        // detailDoctor: state.admin.detailDoctor,
        // schelduleDoctor: state.admin.schelduleDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
