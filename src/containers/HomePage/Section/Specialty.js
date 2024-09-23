import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import './Specialty.scss';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>cơ xương khớp 6</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
