import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import './MedicalFacility.scss';
import Slider from "react-slick";
import * as actions from "../../../store/actions";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


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

    render() {
        let { listDoctor } = this.state

        // console.log('listDoctor OutStandingDoctor ', listDoctor)
        return (
            <div className='section-share section-outstanding-doctor' >
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
                                        <div className='section-customize' key={index}>
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
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctorfetchAllUserStart(limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
