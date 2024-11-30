import actionTypes from '../actions/actionTypes';

// const initContentOfConfirmModal = {
//     isOpen: false,
//     messageId: "",
//     handleFunc: null,
//     dataFunc: null
// }

const initialState = {
    isLoadingGender: false,
    gender: [],
    role: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    detailDoctor: [],
    allScheduleTime: [],
    schelduleDoctor: [],
    listPriceProvincePayment: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: // case này sử dụng để chuyển thông báo đến react giúp react biết được dữ liệu đang được lấy và chưa xong để đưa thông báo lên màn hình
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('fire fetch gender start', action)

            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('action', action)
            state.gender = action.data
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.gender = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.role = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            if (action.users) {
                state.users = action.users.reverse(); //.reverse()
            }
            // console.log('action.users', action.users)
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILDED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.users
            // console.log('action.users', action.users)
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.users
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
            // console.log('FETCH_DETAIL_DOCTOR_SUCCESS adminReducer', action.detail)
            state.detailDoctor = action.detail
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_FAILDED:
            state.detailDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
            state.schelduleDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILDED:
            state.schelduleDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_SUCCESS:
            state.listPriceProvincePayment = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_FAILDED:
            state.listPriceProvincePayment = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;