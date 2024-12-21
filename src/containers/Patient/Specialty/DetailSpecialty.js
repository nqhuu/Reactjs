import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader"
import _, { times } from 'lodash';
import { toast } from "react-toastify";
import './DetailSpecialty.scss'
import Select from 'react-select';
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor"
import ProfileDoctor from "../Doctor/ProfileDoctor"
import { getAllSpecialtyById, getAllCodeService } from "../../../services/userService"

require('dotenv').config();





class DetailSpecialty extends Component {

    state = {
        location: 'ALL',
        speciatyId: '',
        inforSpecialty: {},
        listProvince: [],
        selectProvice: ''
    }

    async componentDidMount() {
        let inforSpecialty = await getAllSpecialtyById(this.props.match.params.id, this.state.location)
        if (inforSpecialty && inforSpecialty.errCode === 0) {
            this.setState({
                inforSpecialty: inforSpecialty
            })
        }

        let res = await getAllCodeService('PROVINCE')
        if (res && res.errCode === 0) {
            let response = res.data
            let list = []
            if (response && response.length > 0) {
                response.map((item, index) => {
                    let result = {}
                    result.label = item.valueVi;
                    result.value = item.keyMap
                    list.push(result)
                })
            }
            this.setState({
                listProvince: list
            })

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.speciatyId !== this.props.match.params.id) {
        //    
        // }
    }


    render() {
        console.log('listProvince', this.state.listProvince)
        let { inforSpecialty, listProvince, selectProvice } = this.state;
        let arrId = [75, 76, 77]
        return (
            <>
                < HomeHeader />
                <div className='detail-container'>
                    <div className='detail-specialty-top'>
                        {inforSpecialty && inforSpecialty.data && inforSpecialty.data.descriptionHTML ?
                            <span dangerouslySetInnerHTML={{ __html: inforSpecialty.data.descriptionHTML }} /> : ''
                        }
                    </div>
                    <Select
                        className='provice-select'
                        value={selectProvice}
                        // onChange={this.handleChange}
                        // options={options}
                        options={listProvince}>

                    </Select>
                    <div className='detail-specialty-bottom'>
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
