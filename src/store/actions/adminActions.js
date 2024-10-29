import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, updateUserService, fetchAllDoctor } from "../../services/userService";
import { toast, ToastContainer } from 'react-toastify';


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



export const fetchTopDoctorfetchAllUserStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            // let limit = 10
            let res = await fetchAllDoctor(limit)
            console.log('fetchAllDoctor data', res)
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