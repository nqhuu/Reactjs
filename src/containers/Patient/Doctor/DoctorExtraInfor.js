import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import { getExtraInforDoctorByIdService } from "../../../services/userService"
import NumericFormat from 'react-number-format';
import { DetailDoctorService } from '../../../services/userService'

class DoctorExtraInfor extends Component {

    state = {
        hideShow: false,
        detailDoctor: '',
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            let detailDoctorDb = await DetailDoctorService(this.props.doctorId);
            if (detailDoctorDb && detailDoctorDb.errCode === 0) {
                this.setState({
                    detailDoctor: detailDoctorDb.data,
                });
            };
        };
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let detailDoctorDb = await DetailDoctorService(this.props.doctorId);
            if (detailDoctorDb && detailDoctorDb.errCode === 0) {
                this.setState({
                    detailDoctor: detailDoctorDb.data,
                });
            };
        };
    };


    handleHideShowPrice = () => {
        this.setState({
            hideShow: !this.state.hideShow
        });
    };

    render() {
        let { detailDoctor } = this.state;
        // console.log('detailDoctor DoctorExtraInfor', detailDoctor);
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ phòng khám</div>
                    <div className='name-clinic'>
                        {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.nameClinic ? detailDoctor.doctorInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.addressClinic ? detailDoctor.doctorInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {!this.state.hideShow ?
                        <div className='short-infor'>
                            <span className='title-price'>Giá khám:  </span>
                            {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.priceData.valueVi ?
                                <NumericFormat
                                    value={detailDoctor.doctorInfor.priceData.valueVi}
                                    thousandSeparator={true}
                                    displayType='text'
                                    suffix={'vnd'}
                                    className={''}
                                />
                                : ''}
                            <span className='show-hide' onClick={() => this.handleHideShowPrice()} > xem chi tiết</span>
                        </div>
                        :
                        <>
                            <div className='tilte-price'>Giá Khám: </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='lest'>Giá Khám</span>
                                    <span className='right'> {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.priceData.valueVi ?
                                        <NumericFormat
                                            value={detailDoctor.doctorInfor.priceData.valueVi}
                                            thousandSeparator={true}
                                            displayType='text'
                                            suffix={'vnd'}
                                            className={'currency'}
                                        />
                                        : ''}
                                    </span>
                                </div>
                                <div className='note'>
                                    Lưu ý:
                                    <span> {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.note ? detailDoctor.doctorInfor.note : ''}</span>.
                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt hay quẹt thẻ:
                                <span> {detailDoctor && detailDoctor.doctorInfor && detailDoctor.doctorInfor.paymentData ? detailDoctor.doctorInfor.paymentData.valueVi : ''}</span>
                            </div>
                            <div className='hide-price' ><span onClick={() => this.handleHideShowPrice()}>Ẩn bảng giá.</span></div>
                        </>
                    }
                </div>

            </div>
        );
    };

};

const mapStateToProps = state => {
    return {
        detailDoctor: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
