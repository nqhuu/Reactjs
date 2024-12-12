import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions";
import _, { times } from 'lodash';
import { toast } from "react-toastify";





class Default extends Component {

    state = {
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {

        }
    }

    render() {

        return ({

        })
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

export default connect(mapStateToProps, mapDispatchToProps)(Default);
