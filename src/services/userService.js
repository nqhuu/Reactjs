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

// export default handleLoginApi;
export { handleLoginApi, getAllUsers };