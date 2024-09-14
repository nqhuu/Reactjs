import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {

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
                                <div><b>Chuyên khoa</b></div>
                                <div>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở ý tế</b></div>
                                <div>chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div>chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div>khám sức khỏe tổng quát</div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle">Hỗ trợ</i>
                            </div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-microscope"></i></div>
                                <div className='text-child'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-head-side-medical"></i></div>
                                <div className='text-child'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child' >
                                <div className='icon-child'><i className="fas fa-tooth"></i></div>
                                <div className='text-child'>Khám nha khoa</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
