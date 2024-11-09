import { result } from 'lodash';
import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password }); //cách viết ngắn gọn theo kiểu Object Shorthand Notation , nơi JavaScript tự động hiểu rằng email và password trong đối tượng là các biến đã có với cùng tên.
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const editUser = (inputId) => {
    return axios.put('/api/put-user', { inputId })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const updateUserService = (editUser) => {
    // console.log(editUser)
    return axios.put('/api/edit-user', { editUser })
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allCode?type=${inputType}`)
}

const fetchAllTopDoctor = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const fetchAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}

const createInforDoctorService = (data) => {
    // console.log('createInforDoctorService', data)
    return axios.post('/api/save-infor-doctor', data)
}

const DetailDoctorService = (id) => {
    // console.log('DetailDoctorService', id)
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

// export default handleLoginApi;
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, updateUserService, getAllCodeService, fetchAllDoctor, fetchAllTopDoctor, createInforDoctorService, DetailDoctorService };