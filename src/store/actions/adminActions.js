import actionTypes from './actionTypes';
import { getAllCodeService } from "../../services/userService"


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
            // let arr = ['gender', 'role', 'position']
            // for (let item of arr) {
            //     let res = await getAllCodeService(item)
            //     console.log('res adminActions', res.data, 'errCode', res.errCode)
            //     if (res && res.errCode === 0) {
            //         dispatch(fetchGenderSuccess(res.data))
            //     }
            //     else {
            //         dispatch(fetchGenderFailed())
            //     }
            // }
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
    type: actionTypes.FETCH_GENDER_FAIDED,
})
