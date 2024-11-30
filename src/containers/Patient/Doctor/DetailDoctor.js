import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader"
import DoctorSchedule from "./DoctorSchedule"
import DoctorExtraInfor from "./DoctorExtraInfor"

class DetailDoctor extends Component {

    state = {
        detailDoctor: [],
        detailDoctorId: -1,
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                detailDoctorId: this.props.match.params.id
            })
            this.props.fetchDetailDoctor(this.props.match.params.id)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            })
        }



    }


    render() {
        let { detailDoctor } = this.state
        // console.log('DetailDoctor', detailDoctor)
        return (
            <>
                <div className='detail-doctor-container'>
                    <div className='home-header'>
                        <HomeHeader />
                    </div>
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
                                <div className='detail-right-down'>
                                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description ?
                                        <span dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.description }} /> : ''
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='Schedule-doctor'>
                            <div className='content-left'>
                                <DoctorSchedule doctorId={this.state.detailDoctorId} />.
                            </div>
                            <div className='content-right'>
                                <DoctorExtraInfor
                                    doctorId={this.state.detailDoctorId}
                                />
                            </div>

                        </div>

                        <div className='detail-bottom'>
                            <div>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML ?
                                    <span dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }} /> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
