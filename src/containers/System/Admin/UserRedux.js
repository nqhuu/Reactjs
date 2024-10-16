import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // thực hiện chuyển đổi ngôn ngữ ứng dụng
import { connect } from 'react-redux';
// import { getAllCodeService } from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox'; // thư viện giúp phóng to ảnh được input
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManagerUser from './TableManagerUser'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

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
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            }, () => console.log('gender', this.state.gender))

        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            }, () => console.log('role', this.state.role))
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                // gender: '',
                // position: '',
                // role: '',
                avatar: '',
            })
        }
    }


    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
            console.log('check file', objectUrl)
        }
    }


    openPreviewImage = () => {
        if (!this.state.previewImgURL) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.role,
            phonenumber: this.state.phoneNumber,
            positionId: this.state.position,
        })

        // fire redux action
    }

    onChangeInput = (event, id) => {
        // let copyState = { ...this.state }
        // copyState[id] = event.target.value
        this.setState({
            [id]: event.target.value
            // ...copyState
        }, () => {
            console.log('check input onchange', this.state)
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password',
            'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Bạn cần nhập: ' + arrCheck[i]) //  trong hàm alert để nối chuỗ phải dùng dấu cộng
                break;
            }
        }
        return isValid
    }

    render() {
        // console.log('actions', actions)
        let { genderArr, roleArr, positionArr,
            gender, role, position, email, password,
            firstName, lastName, phoneNumber, address } = this.state;
        // let gender = this.state.gender;
        // let role = this.state.role;
        // let position = this.state.gender;
        // console.log('check state', this.state)
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender; // hiển thị lên thông báo khi đang trong quá trình lấy dữ liệu từ phía server
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    USERS REDUX HOI DAN IT
                </div>
                <div className='user-redux-body'>
                    <div className="container" >
                        <div className='row'>
                            <div className='col-12 mb-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-12'>{isLoadingGender === true ? 'Loading ...' : ''}</div> {/* nếu isLoadingGender lấy từ redux về bằng true tuwcsc là quá trình lấy dữ liệu đang thực hiện và chưa xong, khi đó sẽ hiển thị lên thông báo Loading...*/}
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positionArr && positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roleArr && roleArr.length > 0 &&
                                        roleArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' hidden type='file'
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    {/* <a href='file:///C:\Users\Admin\Downloads\anh.png'>test mở bằng ứng dụng máy tính</a> */}
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                                {/* <input className='form-control' type='text' /> */}
                            </div>
                            <div className='col-12 my-3'>
                                <button type='button' className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id='manage-user.save' />
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManagerUser />
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
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
        genderRedux: state.admin.gender,
        positionRedux: state.admin.position,
        roleRedux: state.admin.role,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    });
};

const mapDispatchToProps = dispatch => { // key dispatch là bắt buộc
    return {
        // thực hiện phát đi các action đến redux thông qua dispatch
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
