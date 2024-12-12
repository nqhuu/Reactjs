import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss'
import * as actions from "../../../store/actions";
// import ModalConfirm from '../ModalConfirm';
import './ManageDoctor.scss'
// /* markdown editer lite */ 
import MarkdownIt from 'markdown-it'; // cung cấp giao diện soạn thảo
import MdEditor from 'react-markdown-editor-lite'; // thực hiện chuyển đổi markdown sang HTML
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { DetailDoctorService } from "../../../services/userService";
import _ from 'lodash';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// const options = [
//     { label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];





class ManageDoctor extends Component {


    state = {

        // data markdown table
        contentMarkdown: '',
        contentHtml: '',
        selectedOption: '',
        description: '',
        allDoctor: '',
        hasOldData: false,
        historyText: '',
        dbData: [],

        // data doctor infor
        listPrice: [],
        listProvince: [],
        listPayment: [],
        selectPrice: '',
        selectProvince: '',
        selectPayment: '',
        nameClinic: '',
        addressClinic: '',
        note: '',
        dbDoctorInfor: []

    };

    async componentDidMount() {
        this.props.fetchAllDoctorRedux() // sau khi render lần 1 sẽ chạy vào đây để fire acrtion fetchAllDoctorRedux dưới mapDispatchToProps
        this.props.getRequiredDoctorInfor()
    }



    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component
        if (prevProps.allDoctor !== this.props.allDoctor) {
            this.setState({
                allDoctor: this.props.allDoctor
            })
        }
        if (prevProps.listPriceProvincePayment !== this.props.listPriceProvincePayment) {
            this.setState({
                listPrice: this.props.listPriceProvincePayment.listPrice,
                listProvince: this.props.listPriceProvincePayment.listProvince,
                listPayment: this.props.listPriceProvincePayment.listPayment,
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        })
    }

    checkIsEmpty = () => {
        let check = false
        const { selectedOption, description, selectPrice, selectPayment, selectProvince, nameClinic, addressClinic, contentMarkdown, contentHtml } = this.state
        const objCheck = {
            selectedOption, description, selectPrice, selectPayment, selectProvince, nameClinic, addressClinic, contentMarkdown, contentHtml
        }

        //check rỗng, nếu tất cả rỗng sẽ trả về isEmpty = true
        let isEmpty = Object.keys(objCheck).find((item) => _.isEmpty(objCheck[item]))
        if (isEmpty) check = true
        return check
    }


    handleSaveContentMarkdown = async () => {

        let markDown = this.state.dbData
        let doctorInfor = this.state.dbDoctorInfor
        if (this.checkIsEmpty()) {
            toast.warning('Bạn cần nhập đủ thông tin tất cả các trường có dấu *')
            return
        }

        let currentState = [this.state.contentMarkdown, this.state.description, this.state.selectPrice.value, this.state.selectProvince.value, this.state.selectPayment.value,
        this.state.nameClinic, this.state.addressClinic, this.state.note
        ]
        let dbState = [markDown.contentMarkdown, markDown.description, doctorInfor.priceId, doctorInfor.provinceId, doctorInfor.paymentId,
        doctorInfor.nameClinic, doctorInfor.addressClinic, doctorInfor.note]

        // So sánh xem các giá trị của state hiện tại có trùng hêt với giá trị lấy lên từ db thông qua redux hay không
        if (!_.isEqual(currentState, dbState)) {
            this.props.creteInforDoctor({
                contentHTML: this.state.contentHtml,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                hasOldData: this.state.hasOldData,
                selectPrice: this.state.selectPrice.value,
                selectProvince: this.state.selectProvince.value,
                selectPayment: this.state.selectPayment.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,
                historyText: this.state.historyText,
            })
        } else {
            toast.warning('Bạn chưa cập nhật thông tin nào')
        }
    }



    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        })
        let { listPrice, listProvince, listPayment } = this.state
        let selectPrice = '', selectProvince = '', selectPayment = ''

        let res = await DetailDoctorService(selectedOption.value);
        // console.log('handleChange', res)
        if (res && res.errCode === 0) {
            if (res.data.Markdown && res.data.Markdown.id) {
                let markDown = res.data.Markdown
                this.setState({
                    contentMarkdown: markDown.contentMarkdown,
                    contentHtml: markDown.contentHTML,
                    description: markDown.description,
                    dbData: markDown,
                    hasOldData: true,
                })
            } else {
                this.setState({
                    contentMarkdown: '',
                    contentHtml: '',
                    description: '',
                    hasOldData: false,
                    dbData: '',
                });
            }
            if (res.data.doctorInfor && res.data.doctorInfor.priceData.id && res.data.doctorInfor.provinceData.id && res.data.doctorInfor.paymentData.id) {
                // console.log(res.data.doctorInfor)
                let priceData = res.data.doctorInfor.priceData;
                let provinceData = res.data.doctorInfor.provinceData;
                let paymentData = res.data.doctorInfor.paymentData;
                selectPrice = listPrice.find(item => item.id === priceData.id)
                let selectPriceCopy = {
                    label: selectPrice.valueVi,
                    value: selectPrice.keyMap
                }
                selectProvince = listProvince.find(item => item.id === provinceData.id)
                let selectProvinceCopy = {
                    label: selectProvince.valueVi,
                    value: selectProvince.keyMap
                }
                selectPayment = listPayment.find(item => item.id === paymentData.id)
                let selectPaymentCopy = {
                    label: selectPayment.valueVi,
                    value: selectPayment.keyMap
                }
                let doctorInfor = res.data.doctorInfor
                this.setState({
                    dbDoctorInfor: doctorInfor,
                    selectPrice: selectPriceCopy,
                    selectProvince: selectProvinceCopy,
                    selectPayment: selectPaymentCopy,
                    nameClinic: doctorInfor.nameClinic,
                    addressClinic: doctorInfor.addressClinic,
                    note: doctorInfor.note,
                });
            } else {
                this.setState({
                    selectPrice: '',
                    selectProvince: '',
                    selectPayment: '',
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    dbDoctorInfor: [],
                });
            }

        }
    };

    handleChangeSelectDoctorInfor = (inputSelect, name) => {
        let nameSelect = name.name
        // console.log(inputSelect)
        this.setState({
            [nameSelect]: inputSelect
        })
    }

    handleOnchangeText = (e, id) => {
        // console.log(id, e.target.value)
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let options = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let objectOptions = {};
                objectOptions.label = type === 'DOCTOR' ? item.valueVi : `${item.firstName} ${item.lastName}`;
                objectOptions.value = type === 'DOCTOR' ? item.keyMap : item.id;
                options.push(objectOptions);
            })
        }
        // console.log('buildDataInputSelect', options)
        return options
    }

    render() {
        let { selectedOption, allDoctor, hasOldData,
            listPrice, listProvince, listPayment } = this.state
        // console.log('render', this.state)
        return (
            <div className="manager-doctor-container">
                <div className='manage-doctor-title'>
                    TẠO THÔNG TIN DOCTOR
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ (*) </label>
                        <Select
                            value={selectedOption} //value chỉ nhận 1 obj có đủ cặp label và value
                            onChange={this.handleChange}
                            options={this.buildDataInputSelect(allDoctor)}
                            placeholder={'chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu (*) :</label>
                        <div className='content-left from-group'></div>
                        <textarea
                            className='form-control'
                            rows='4'
                            placeholder='Nhập nội dung'
                            onChange={(e) => this.handleOnchangeText(e, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá (*)</label>
                        <Select
                            className=''
                            placeholder={'Chọn giá'}
                            options={this.buildDataInputSelect(listPrice, 'DOCTOR')}
                            value={this.state.selectPrice} //value chỉ nhận 1 obj có đủ cặp label và value
                            name='selectPrice'
                            onChange={this.handleChangeSelectDoctorInfor}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán (*)</label>
                        <Select
                            className=''
                            placeholder={'Phương thức thanh toán'}
                            options={this.buildDataInputSelect(listPayment, 'DOCTOR')}
                            value={this.state.selectPayment}
                            name='selectPayment'
                            onChange={this.handleChangeSelectDoctorInfor}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành (*)</label>
                        <Select
                            className=''
                            placeholder={'Tỉnh thành'}
                            options={this.buildDataInputSelect(listProvince, 'DOCTOR')}
                            value={this.state.selectProvince}
                            name='selectProvince'
                            onChange={this.handleChangeSelectDoctorInfor}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám (*)</label>
                        <input
                            className='form-control'
                            placeholder='Tên phòng khám'
                            onChange={(e) => this.handleOnchangeText(e, 'nameClinic')}
                            value={this.state.nameClinic}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám (*)</label>
                        <input
                            className='form-control'
                            placeholder='Địa chỉ phòng khám'
                            onChange={(e) => this.handleOnchangeText(e, 'addressClinic')}
                            value={this.state.addressClinic}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ghi chú</label>
                        <input
                            className='form-control'
                            placeholder='Ghi chú'
                            onChange={(e) => this.handleOnchangeText(e, 'note')}
                            value={this.state.note}

                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    {/* markdown editer lite */}
                    <div>Nhập mô tả bác sĩ (*)</div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? <span>Lưu thay đổi</span> : <span>Tạo thông tin</span>}
                </button >
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor, // gọi đến state của redux store , allDoctor thuộc adminReducer được combineReducers và đặt lại tên thành admin
        listPriceProvincePayment: state.admin.listPriceProvincePayment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()), // fire 1 action đến redux
        creteInforDoctor: (data) => dispatch(actions.creteInforDoctor(data)), // fire 1 action đến redux
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()), // fire 1 action đến redux
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
