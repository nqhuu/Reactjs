import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Slider from "react-slick";



class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer' >
                <p> &copy; 2024 Tự học Fullstack. <a target='_blank' href='https://kinhhongphuc.vn/'>More information</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
