import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage, injectIntl } from 'react-intl';
// import Slider from "react-slick";



class About extends Component {

    render() {

        return (
            <div className='section-share section-about' >
                <div className='section-about-header'>
                    Sản phẩm nổi bật
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%" height="400"
                            src="https://www.youtube.com/embed/DR8TAv6WMDE"
                            title="Giới thiệu về cơ chế hoạt động của kính chống cháy cách nhiệt Hồng Phúc"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Nội dung text bên phải
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
