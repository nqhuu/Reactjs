import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        // fire redux event (actions)

        this.props.changeLanguageAppRedux(language)
        // gọi đến key changeLanguageAppRedux của đối tượng props 
        // trả về value là function (language) => dispatch(changeLanguageApp(language))
        // language là tham số được truyền vào cho value
    }

    render() {

        let language = this.props.lang

        return (
            // <Redirect to={linkToRedirect} />
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                {/* <FormattedMessage /> giúp ta có thể thực hiện chuyển đổi nhiều ngôn ngữ trên phần mềm với dữ liệu được lưu trong file thường là json
                                    FormattedMessage : đây là thw viện quốc tế hóa (i18n) trong react-intl 
                                    Thẻ FormattedMessage được dùng để hiển thị các chuỗi văn bản dựa trên ngôn ngữ của người dùng
                                    id : chỉ định khóa chuỗi văn bản trong file dịch. 
                                */}
                                <div><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div><FormattedMessage id="home-header.check-health" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"><span><FormattedMessage id="home-header.support" /></span></i>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-medkit"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
