import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import _ from 'lodash';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import Lightbox from 'react-image-lightbox'; // thư viện giúp phóng to ảnh được input
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';




const mdParser = new MarkdownIt(/* Markdown-it options */);





class ManageSpecialty extends Component {

    state = {
        nameSpecialty: '',
        descriptionMarkdown: '',
        descriptionHTML: '',
        imageBase64: '',
        previewImgURL: '',
        isOpen: false,
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file); // trả ra dữ liệu kiểu base64
            // console.log('base64', base64)
            let objectUrl = URL.createObjectURL(file) //trả về kiểu đường dẫn Blob kiểu :   blob:http://localhost:3000/d5b498a1-3121-473c-b4eb-31b37fb38049
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let data = {};
        data.nameSpecialty = this.state.nameSpecialty;
        data.descriptionMarkdown = this.state.descriptionMarkdown;
        data.descriptionHTML = this.state.descriptionHTML;
        data.imageBase64 = this.state.imageBase64;
        let res = await createNewSpecialty(data)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success('Tạo chuyên khoa thành công')
            this.setState({
                nameSpecialty: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                imageBase64: '',
                previewImgURL: '',
                // file: null,
            })
        } else {
            toast.error('Tạo không thành công')
        }
    }

    render() {
        let { nameSpecialty, descriptionMarkdown, descriptionHTML, imageBase64, previewImgURL } = this.state
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên Chuyên khoa</label>
                        <input
                            className='form-control'
                            value={nameSpecialty}
                            onChange={(event) => this.handleOnchangeInput(event, 'nameSpecialty')}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh Chuyên khoa</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    {/* markdown editer lite */}
                    <div>Nhập mô tả (*)</div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className=''>
                    <button
                        className='btn-save-specialty'
                        onClick={() => this.handleSaveNewSpecialty()}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        patientBookAppointment: (data) => dispatch(actions.patientBookAppointment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
