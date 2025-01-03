// import { result } from 'lodash';
import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password }); //cách viết ngắn gọn theo kiểu Object Shorthand Notation , nơi JavaScript tự động hiểu rằng email và password trong đối tượng là các biến đã có với cùng tên.
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

// const editUser = (inputId) => {
//     return axios.put('/api/put-user', { inputId })
// }

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
    return axios.post('/api/save-infor-doctor', data)
}

const DetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const bulkCreateScheduleSevice = data => {
    return axios.post('/api/bulk-create-schedule', data)

}

const fetchScheduleDoctorService = (date, doctorId) => {
    return axios.get(`/api/get-schedule-doctor-by-id?doctorId=${doctorId}&date=${date}`)
}

// const getExtraInforDoctorByIdService = (doctorId) => {
//     console.log('getExtraInforDoctorByIdService', { doctorId })
//     return axios.get('/api/get-extra-infor-doctor-by-id', { doctorId })
// }
const getProfileDoctorById = (doctorId) => {
    // console.log('getProfileDoctorById', doctorId)
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const patientBookAppointmentService = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointmentService = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const fetchSpecialtyService = (limit) => {
    return axios.get(`/api/get-all-specialty?limit=${limit}`)
}

const getAllSpecialtyById = (id, location) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${id}&location=${location}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const fetchClinicService = (limit) => {
    return axios.get(`/api/get-all-clinic?limit=${limit}`)
}

const getAllclinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const getListPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`)
}

const sendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)

}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    updateUserService, getAllCodeService,
    fetchAllDoctor, fetchAllTopDoctor,
    createInforDoctorService, DetailDoctorService,
    bulkCreateScheduleSevice, fetchScheduleDoctorService,
    patientBookAppointmentService,
    postVerifyBookAppointmentService, createNewSpecialty, fetchSpecialtyService,
    getProfileDoctorById, getAllSpecialtyById, createNewClinic,
    fetchClinicService, getAllclinicById, getListPatientForDoctor, sendRemedy
};