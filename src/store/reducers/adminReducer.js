import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    gender: [],
    role: [],
    position: [],
    users: [],
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
            console.log('action', action)
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
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = [];
            return {
                ...state,
            }

        // case actionTypes.DELETE_USER_SUCCESS:
        //     state.users = action.users;
        //     state.users = copyUser.fillter(item => item.id !== action.users.id);
        //     return {
        //         ...state,
        //     }
        // case actionTypes.DELETE_USER_FAILDED:
        //     let copyUser = this.state.users;
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
}

export default adminReducer;