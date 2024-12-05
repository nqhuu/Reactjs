import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ProfileDoctor.scss";
import NumericFormat from 'react-number-format';
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)
import _ from 'lodash';

class ProfileDoctor extends Component {

    state = {
        schelduleDoctorSelect: []
    }


    async componentDidMount() {
        this.setState({
            schelduleDoctorSelect: this.props.schelduleDoctorSelect
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {

        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    renderTimeBooking = (schelduleDoctorSelect, detailDoctor) => {
        if (schelduleDoctorSelect && !_.isEmpty(schelduleDoctorSelect.timeTypeData) && !_.isEmpty(detailDoctor.doctorData)) {
            let date = +schelduleDoctorSelect.date
            return (
                <>
                    <div className='detail-right-schedule'>
                        <div className='icon-date-time'><i className="fa fa-calendar" aria-hidden="true"></i></div>
                        {schelduleDoctorSelect && schelduleDoctorSelect.timeTypeData &&
                            <div className='date-time'>
                                <span>{schelduleDoctorSelect.timeTypeData.valueVi}</span>
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
        // let detailDoctor = '';
        // let schelduleDoctorSelect = '';
        // detailDoctor = this.props.detailDoctor ? this.props.detailDoctor : {}
        // schelduleDoctorSelect = this.props.schelduleDoctorSelect && this.props.schelduleDoctorSelect.id && !_.isEmpty(this.props.schelduleDoctorSelect.timeTypeData) ? this.props.schelduleDoctorSelect : {}
        // console.log('detailDoctor', detailDoctor)
        // console.log('schelduleDoctorSelect', schelduleDoctorSelect)

        let { schelduleDoctorSelect, detailDoctor } = this.props
        console.log('detailDoctor', detailDoctor)
        console.log('schelduleDoctorSelect', schelduleDoctorSelect)


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
                                    {this.renderTimeBooking(schelduleDoctorSelect, detailDoctor)}
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
        detailDoctor: state.admin.detailDoctor,
        schelduleDoctor: state.admin.schelduleDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
