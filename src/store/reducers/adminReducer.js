import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    gender: [],
    role: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log('fire fetch gender start', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('fire fetch gender SUCCESS', action)
            // let arr = ['gender', 'role', 'positions'];
            let copyState = { ...state };
            // for (let item of arr) {
            //     if (item === action.data.type) {
            //         copyState[item] = action.data
            //     }
            // }
            copyState.gender = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;