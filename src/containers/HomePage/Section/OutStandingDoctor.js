import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router-dom';


class OutStandingDoctor extends Component {

    state = {
        listDoctor: []
    }

    async componentDidMount() {
        this.props.fetchTopDoctorRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
            this.setState({
                listDoctor: this.props.listDoctorRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)  //history là thuộc tính của withRouter
    }

    render() {
        let { listDoctor } = this.state

        return (
            <div className='section-share section-outstanding-doctor'  >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listDoctor && listDoctor.length > 0 &&
                                listDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer(item.image, 'base64').toString('binary'); // chuyển đổi hình ảnh mã hóa từ base64 sang binary
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    {/* <div className='bg-image section-outstanding-doctor' /> */}
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{`${item.positionData.valueVi} ${item.firstName} ${item.lastName} `}</div>
                                                    {/* <div>giao sư A</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        listDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    let limit = 10;
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
