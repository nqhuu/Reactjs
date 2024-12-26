import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { FormattedMessage, injectIntl } from 'react-intl';
import './MedicalFacility.scss';
import Slider from "react-slick";
import { fetchClinicService } from '../../../services/userService'
import { withRouter } from 'react-router-dom';


class MedicalFacility extends Component {


    state = {
        listClinic: [],
    }

    async componentDidMount() {
        let dataClinic = await fetchClinicService(50)
        if (dataClinic && dataClinic.errCode === 0) {
            this.setState({
                listClinic: dataClinic.data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listSpecialty !== this.props.listSpecialty) {
        //     this.setState({
        //         listClinic: this.props.listSpecialty
        //     })
        // }
    }

    handleViewDetailDoctor = (item) => {
        // console.log('this.props.history', this.props.history)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)  //history là thuộc tính của withRouter
        }
    }

    render() {
        let { listClinic } = this.state
        // console.log('listClinic', listClinic)
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở ý tế nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listClinic && listClinic.length > 0 &&
                                listClinic.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer(item.image, 'base64').toString('binary'); // chuyển đổi hình ảnh mã hóa từ base64 sang binary
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='bg-image section-facility' style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className='section-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
