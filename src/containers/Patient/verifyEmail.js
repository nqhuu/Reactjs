import React, { Component } from 'react';
import { connect } from 'react-redux';
import './verifyEmail.scss';
// import actionTypes from '../../../store/actions/actionTypes';
import actionTypes from '../../store/actions/actionTypes';
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import {
    postVerifyBookAppointmentService
} from "../../services/userService";


class verifyEmail extends Component {

    state = {
        isLoading: false,
        errCode: 0,
        errMessage: ''
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointmentService({
                token,
                doctorId
            })
            console.log(res)
            if (res)
                this.setState({
                    isLoading: true,
                    errCode: res.errCode,
                    errMessage: res.errMessage
                })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
        }
    }


    render() {

        let { isLoading, errCode, errMessage } = this.state

        return (
            <>
                <div className=''>
                    <HomeHeader />
                </div>
                <div className='verify-email-container'>
                    {!isLoading ?
                        <div className='loading-booking'>Loading data ...</div>
                        :
                        <div>{errCode === 0 ?
                            <div className='result-booking'>{errMessage}</div>
                            :
                            <div className='result-booking'>{errMessage}</div>}
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
