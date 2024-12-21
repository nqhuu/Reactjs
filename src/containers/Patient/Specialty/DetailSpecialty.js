import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader"
import _, { times } from 'lodash';
import { toast } from "react-toastify";
import './DetailSpecialty.scss'
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor"
import ProfileDoctor from "../Doctor/ProfileDoctor"

require('dotenv').config();





class DetailSpecialty extends Component {

    state = {
    }

    async componentDidMount() {
        let detaildoctor = await this.props.fetchDetailDoctor()
        // console.log('detaildoctor', detaildoctor)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {

        }
    }


    render() {
        let arrId = [75, 76, 77]
        return (
            <>
                < HomeHeader />
                <div className='detail-container'>
                    <div className='detail-specialty'></div>

                    {arrId && arrId.length > 0 &&
                        arrId.map((item, index) => {
                            return (
                                <div className='dt-specialty-container' key={index}>
                                    <div className='dt-specialty-left'>
                                        <ProfileDoctor
                                            showInfor={true}
                                            doctorId={item}
                                        />
                                    </div>
                                    <div className='dt-specialty-right'>
                                        <div className='dt-specialty-right-top'>
                                            <DoctorSchedule
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className='dt-specialty-right-bot'>
                                            <DoctorExtraInfor
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        // detailDoctor: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
