import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, updateUserService,
    fetchAllTopDoctor, fetchAllDoctor, createInforDoctorService,
    DetailDoctorService, bulkCreateScheduleSevice, fetchScheduleDoctorService, patientBookAppointmentService, fetchSpecialtyService
} from "../../services/userService";
import { toast } from 'react-toastify';

// import Time from 'react-datepicker/dist/time';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })


/**Gender */
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START }) // để phát đi 1 action báo hiệu quá trình lấy dữ liệu bắt đầu
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED,
})




/**Position  */
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionSuccess())
            }
        } catch (e) {
            dispatch(fetchPositionSuccess())
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
})



/**Role */
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
})


// CREATE_NEW_USER
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log(res)

            if (res && res.errCode === 0) {
                toast.success('Tạo người dùng thành công')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})


// EDIT_A_USER
export const EditAUser = (data) => {
    console.log('adminAction', data)
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data);
            // console.log('check res adminAction Edit', res, data)

            if (res && res.errCode === 0) {
                toast.success(`Sửa thành công người dùng có email ${data.email}`)
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            }
            if (res && res.errCode === 1) {
                toast.warning(`Bạn chưa sửa thông tin nào của người dùng có email ${data.email}`)
                // dispatch(editUserSuccess())
                // dispatch(fetchAllUserStart())
            }
            if (res && res.errCode === 2) {
                dispatch(editUserFailed())
                toast.warning(`Không thể chỉnh sửa thông tin của người dùng có email ${data.email}`)
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

// FETCH_ALL_USERS_SUCCESS

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            // console.log('getAllUsers', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users))
            }
            else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
})


// DELETE_USERS_SUCCESS


export const handeleDeleteUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(user.id)
            // console.log(res, user)
            if (res && res.errCode === 0) {
                toast.warning(`Xóa thành công tài khoản ${user.email}`)
                dispatch(DeleteUserSuccess())
                dispatch(fetchAllUserStart())
            }
        } catch (e) {
            dispatch(DeleteUserFailed())
        }
    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
})

export const DeleteUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS
})



export const fetchTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            // console.log('fetchAllDoctor data', limit)

            // let limit = 10
            let res = await fetchAllTopDoctor(limit)
            // console.log('fetchAllDoctor data', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllTopDoctorSuccess(res.data))
            }
            else {
                dispatch(fetchAllTopDoctorFailed())
            }
        } catch (e) {
            dispatch(fetchAllTopDoctorFailed())
            console.log('fetchTopDoctor error', e)
        }
    }
}

export const fetchAllTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    users: data
})

export const fetchAllTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
})


// Danh sách specialty
export const fetchSpecialty = (limit) => {
    return async (dispatch, getState) => {
        try {
            // let limit = 50
            let res = await fetchSpecialtyService(limit)
            // console.log('fetchSpecialty data', res)
            if (res && res.errCode === 0) {
                dispatch(fetchSpecialtySuccess(res.data))
            }
            else {
                dispatch(fetchSpecialtyFailed())
            }
        } catch (e) {
            dispatch(fetchSpecialtyFailed())
            console.log('fetchTopDoctor error', e)
        }
    }
}

export const fetchSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_All_SPECIALTY_SUCCESS,
    data: data
})

export const fetchSpecialtyFailed = () => ({
    type: actionTypes.FETCH_All_SPECIALTY_FAILDED,
})



export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchAllDoctor()
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data))
            }
            else {
                dispatch(fetchAllDoctorFailed())
            }
        } catch (e) {
            dispatch(fetchAllDoctorFailed())
            console.log('fetchAllDoctor error', e)
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    users: data
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
})


//CREATE INFOR DOCTOR

export const creteInforDoctor = (data) => {
    // console.log('creteInforDoctor Data', data)
    return async (dispatch, getState) => {
        try {
            if (data) {
                let res = await createInforDoctorService(data);
                if (res && res.errCode === 0) {
                    toast.success(res.errMessage)
                    dispatch(saveInforSuccess())
                }
                if (res && res.errCode === 1) {
                    toast.success(res.errMessage)
                    dispatch(saveInforSuccess())
                }
                // if (res && res.errCode === -2) {
                //     toast.warning('Thông tin bác sĩ đã được tạo trước đó, bạn cần update nếu muốn chỉnh sửa lại thông tin bác sĩ')
                //     dispatch(saveInforFailed())
                // }
                else {
                    dispatch(saveInforFailed())
                }
            }

        } catch (e) {
            dispatch(saveInforFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveInforSuccess = () => ({
    type: actionTypes.FETCH_CREATE_INFOR_DOCTOR_SUCCESS
})

export const saveInforFailed = () => ({
    type: actionTypes.FETCH_CREATE_INFOR_DOCTOR_FAILDED
})

//VIEW DETAIL DOCTOR

export const fetchDetailDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DetailDoctorService(id);
            if (res && res.errCode === 0) {
                dispatch(detailDoctorSuccess(res.data))
            }
            if (res && res.errCode === 1) {
                dispatch(detailDoctorFailed())
            }
        } catch (e) {
            dispatch(detailDoctorFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const detailDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
    detail: data

})

export const detailDoctorFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILDED
})


export const fetAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetAllScheduleTimeSuccess(res.data))
            }
            if (res && res.errCode === 1) {
                dispatch(fetAllScheduleTimeFaild())
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data: data
})

export const fetAllScheduleTimeFaild = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
})


export const bulkCreateSchedule = (data) => {
    // console.log('bulkCreateSchedule', data)
    return async (dispatch, getState) => {
        try {
            let res = await bulkCreateScheduleSevice(data)
            if (res && res.errCode === 0) {
                toast.success('Tạo lịch thành công')
                dispatch(bulkCreateScheduleSuccess())
            }
            if (res && res.errCode === 1) {
                dispatch(bulkCreateScheduleFaild())
            }
        } catch (e) {
            console.log(e)
            dispatch(bulkCreateScheduleFaild())

        }
    }
}

export const bulkCreateScheduleSuccess = () => ({
    type: actionTypes.FETCH_BULK_CREATE_SCHEDULE_SUCCESS,
})

export const bulkCreateScheduleFaild = () => ({
    type: actionTypes.FETCH_BULK_CREATE_SCHEDULE_FAILDED,
})

export const fetchScheduleDoctor = (date, doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchScheduleDoctorService(date, doctorId)
            // console.log('fetchScheduleDoctorService', res)
            if (res && res.errCode === 0) {
                // toast.success('Tạo lịch thành công')
                dispatch(fetchScheduleDoctorSuccess(res.data))
            }
            if (res && res.errCode === 1) {
                dispatch(fetchScheduleDoctorFaild())
            }
        } catch (e) {
            console.log(e)
            dispatch(fetchScheduleDoctorFaild())
        }
    }
}

export const fetchScheduleDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS,
    data: data
})

export const fetchScheduleDoctorFaild = () => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_FAILDED,
})
///////////////////////////////////////////////////////////////////////////
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_START }) // để phát đi 1 action báo hiệu quá trình lấy dữ liệu bắt đầu
            let listPrice = await getAllCodeService('PRICE')
            let listProvince = await getAllCodeService('PROVINCE')
            let listPayment = await getAllCodeService('PAYMENT')
            // let response = [listPrice, listProvince, listPayment]
            let response = {
                listPrice: listPrice.data,
                listProvince: listProvince.data,
                listPayment: listPayment.data
            }

            if (response && listPayment.errCode === 0 && listPrice.errCode === 0 && listProvince.errCode === 0) { //&& response.errCode === 0
                // console.log(response)
                dispatch(getRequiredDoctorInforSuccess(response))
            }
            else {
                dispatch(getRequiredDoctorInforFailed())
            }
        } catch (e) {
            dispatch(getRequiredDoctorInforFailed())
            console.log('getRequiredDoctorInfor error', e)
        }
    }
}

export const getRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_SUCCESS,
    data: data
})

export const getRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_FAILDED,
})


export const patientBookAppointment = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await patientBookAppointmentService(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(patientBookAppointmentSuccess())
                return res;
            }
            if (res && res.errCode === 1) {
                dispatch(patientBookAppointmentFaild())
                toast.error(res.errMessage)
                return res;
            }
        } catch (e) {
            console.log(e)
            dispatch(patientBookAppointmentFaild())
        }
    }
}

export const patientBookAppointmentSuccess = () => ({
    type: actionTypes.CREATE_BOOKING_SUCCESS,
})
export const patientBookAppointmentFaild = () => ({
    type: actionTypes.CREATE_BOOKING_FAILDED,
})