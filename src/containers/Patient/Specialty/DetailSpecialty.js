import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader"
import _, { times } from 'lodash';
import { toast } from "react-toastify";
require('dotenv').config();





class DetailSpecialty extends Component {

    state = {
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {

        }
    }


    render() {

        return (
            <>
                < HomeHeader />
                <div> Thông tin chuyên khoa </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
