import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService"
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: [],
            role: [],
            positions: []
        }
    }

    async componentDidMount() {

        this.props.getGenderStart()


        // try { // gọi trực tiếp đến api 
        //     let arr = ['gender', 'role', 'position']
        //     for (let item of arr) {
        //         let res = await getAllCodeService(item);
        //         if (res && res.errCode === 0) {
        //             this.setState({
        //                 [item]: res.data
        //             })
        //         }
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại (this) và quá khứ (prev)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                gender: this.props.genderRedux
            })
        }
    }

    render() {
        // console.log('actions', actions)
        let { gender, role, position } = this.state
        // let gender = this.state.gender;
        console.log('check state', this.state)
        let language = this.props.language
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    USERS REDUX HOI DAN IT
                </div>
                <div className='user-redux-body'>
                    <div className="container" >
                        <div className='row'>
                            <div className='col-12 mb-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control">
                                    {gender && gender.length > 0 &&
                                        gender.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control">
                                    {position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className="form-control">
                                    {role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button type="button" className="btn btn-primary"><FormattedMessage id='manage-user.save' /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    let arr = ['gender', 'role', 'positions'];
    let stateCopy = {};
    // for (let item of arr) {
    //     stateCopy[item] = state.admin[item];
    //     console.log('stateCopy', stateCopy)
    //     return ({
    //         language: state.app.language,
    //         // genderRedux: state.admin.gender
    //         // item: state.admin.gender
    //         ...stateCopy
    //     });
    // };
    return ({
        language: state.app.language,
        genderRedux: state.admin.gender
    });
};

const mapDispatchToProps = dispatch => { // key dispatch là bắt buộc
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
