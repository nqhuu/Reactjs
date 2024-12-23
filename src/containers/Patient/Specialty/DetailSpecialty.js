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
        selectProvice: { label: 'Toàn Quốc', value: 'ALL' },
        arrId: ''
    }

    async componentDidMount() {
        await this.props.fetchAllDoctorRedux();

        let inforSpecialty = await getAllSpecialtyById(this.props.match.params.id, this.state.location)
        if (inforSpecialty && inforSpecialty.errCode === 0) {
            let doctorInSpecialty = inforSpecialty.data.doctorInSpecialty;
            let arrId = doctorInSpecialty.map((item, id) => item.doctorId)
            this.setState({
                inforSpecialty: inforSpecialty.data.specialty,
                arrId: arrId
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
            list.unshift({ label: 'Toàn Quốc', value: 'ALL' })
            this.setState({
                listProvince: list
            })

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState.location !== this.state.location) {
            let inforSpecialty = await getAllSpecialtyById(this.props.match.params.id, this.state.location)
            if (inforSpecialty && inforSpecialty.errCode === 0) {
                let doctorInSpecialty = inforSpecialty.data.doctorInSpecialty;
                let arrId = doctorInSpecialty.map((item, id) => item.doctorId)
                this.setState({
                    inforSpecialty: inforSpecialty.data.specialty,
                    arrId: arrId
                })
            }
        }
    }


    handleChangeSelectProvice = (selectProvice) => {
        this.setState({
            selectProvice: selectProvice,
            location: selectProvice.value
        })
    }


    render() {
        let { inforSpecialty, listProvince, selectProvice, arrId } = this.state;
        console.log(this.state)
        return (
            <>
                < HomeHeader />
                <div className='detail-container'>
                    <div className='detail-specialty-top'>
                        {inforSpecialty && inforSpecialty.descriptionHTML ?
                            <span dangerouslySetInnerHTML={{ __html: inforSpecialty.descriptionHTML }} /> : ''
                        }
                    </div>
                    <Select
                        className='provice-select'
                        value={selectProvice}
                        onChange={this.handleChangeSelectProvice}
                        options={listProvince}>

                    </Select>
                    <div className='detail-specialty-bottom'>
                        {arrId && arrId.length > 0 ?
                            arrId.map((item, index) => {
                                return (
                                    <div className='dt-specialty-container' key={index}>
                                        <div className='dt-specialty-left'>
                                            <ProfileDoctor
                                                showInfor={true}
                                                showViewMore={true}
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
                            :
                            <div className='dt-specialty-container no-doctor' >Hiện tại chưa có bác sĩ tại khu vực này !</div>
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
        allDoctor: state.admin.allDoctor, // gọi đến state của redux store , allDoctor thuộc adminReducer được combineReducers và đặt lại tên thành admin

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
        // fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()), // fire 1 action đến redux

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
