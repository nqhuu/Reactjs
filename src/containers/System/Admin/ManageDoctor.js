import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss'
import * as actions from "../../../store/actions";
// import ModalConfirm from '../ModalConfirm';
import './ManageDoctor.scss'
// /* markdown editer lite */ 
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { DetailDoctorService } from "../../../services/userService";


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
        contentMarkdown: '',
        contentHtml: '',
        selectedOption: '',
        description: '',
        allDoctor: '',
        hasOldData: false,
        dbData: []

    };

    async componentDidMount() {
        this.props.fetchAllDoctorRedux() // sau khi render lần 1 sẽ chạy vào đây để fire acrtion fetchAllDoctorRedux dưới mapDispatchToProps
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { // sau khi chạy xong componentDidMount thì chạy tới đây và kiểm tra và cập nhật lại state cho component
        if (prevProps.allDoctor !== this.props.allDoctor) {
            this.setState({
                allDoctor: this.props.allDoctor
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        })
    }

    handleSaveContentMarkdown = async () => {
        console.log(this.state)
        if (!this.state.hasOldData && this.state.contentMarkdown && this.state.contentHtml && this.state.description) {
            this.props.creteInforDoctor({
                contentHTML: this.state.contentHtml,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                hasOldData: this.state.hasOldData
            })
        } else if (!this.state.hasOldData && (!this.state.contentMarkdown || !this.state.contentHtml || !this.state.description)) {
            toast.warning('Bạn cần nhập đủ thông tin tất cả các trường có dấu *')
        }

        if (this.state.hasOldData) {
            console.log('this.state.dbData', this.state.dbData)
            let markDown = this.state.dbData
            if (this.state.contentMarkdown === markDown.contentMarkdown && this.state.description === markDown.description) {
                toast.warning('Bạn chưa cập nhật thông tin nào')
            } else if (this.state.contentMarkdown && this.state.contentHtml && this.state.description) {
                this.props.creteInforDoctor({
                    contentHTML: this.state.contentHtml,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedOption.value,
                    hasOldData: this.state.hasOldData
                })
            } else {
                toast.warning('Bạn cần nhập đủ thông tin tất cả các trường có dấu *')
            }
        }
    }



    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        })
        let res = await DetailDoctorService(selectedOption.value);
        if (res && res.errCode === 0 && res.data.Markdown.id) {
            let markDown = res.data.Markdown
            this.setState({
                contentMarkdown: markDown.contentMarkdown,
                contentHtml: markDown.contentHTML,
                description: markDown.description,
                hasOldData: true,
                dbData: markDown
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHtml: '',
                description: '',
                hasOldData: false,
                dbData: ''
            });
        }
    };

    handleOnchangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    buildDataInputSelect = (inputData) => {
        let options = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let objectOptions = {};
                objectOptions.label = `${item.firstName} ${item.lastName}`;
                objectOptions.value = item.id;
                options.push(objectOptions);
            })
        }
        return options
    }

    render() {
        let { selectedOption, allDoctor, hasOldData } = this.state
        return (
            <div className="manager-doctor-container">
                <div className='manage-doctor-title'>
                    TẠO THÔNG TIN DOCTOR
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ (*) </label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            // options={options}
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
                            onChange={(e) => this.handleOnchangeDescription(e)}
                            value={this.state.description}
                        >

                        </textarea>
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
        allDoctor: state.admin.allDoctor // gọi đến state của redux store , allDoctor thuộc adminReducer được combineReducers và đặt lại tên thành admin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()), // fire 1 action đến redux
        creteInforDoctor: (data) => dispatch(actions.creteInforDoctor(data)), // fire 1 action đến redux
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
