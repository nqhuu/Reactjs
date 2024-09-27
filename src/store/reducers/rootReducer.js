import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
// import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};


const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user', // tên để chỉ định nơi lưu trữ dữ liệu của Redux store trong Redux Persist.
    whitelist: ['isLoggedIn', 'userInfo'] // các giữ liệu state được lưu
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}


export default (history) => combineReducers({
    router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(userPersistConfig, userReducer),
    //sử dụng persistReducer lưu vào local store 
    //lưu các giá trị của state userReducer với giá trị trong whitelist của userPersistConfig(cấu hình)
    app: persistReducer(appPersistConfig, appReducer)
})