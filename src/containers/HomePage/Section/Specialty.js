import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import './Specialty.scss';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router-dom';




// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {
    state = {
        listSpecialty: [],
    }

    async componentDidMount() {
        this.props.fetchSpecialty(50);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        }
    }

    handleViewDetailDoctor = (item) => {
        console.log('item', item.id)
        // console.log('this.props.history', this.props.history)
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)  //history là thuộc tính của withRouter
        }
    }

    render() {
        let { listSpecialty } = this.state
        // console.log('listSpecialty react', listSpecialty)

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listSpecialty && listSpecialty.length > 0 &&
                                listSpecialty.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer(item.image, 'base64').toString('binary'); // chuyển đổi hình ảnh mã hóa từ base64 sang binary
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='bg-image section-specialty' style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div>{item.name}</div>
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
        listSpecialty: state.admin.listSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    let limit = 50;
    // let limit = process.env.LIMIT;
    return {
        fetchSpecialty: (limit) => dispatch(actions.fetchSpecialty(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
