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
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('fire fetch gender start', action)

            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            state.gender = action.data
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
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
        case actionTypes.FETCH_POSITION_FAIDED:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.role = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;