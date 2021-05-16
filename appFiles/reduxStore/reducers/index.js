import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import AppReducer from './appReducer';
import ModalReducer from './modalReducer';
import { RESET_STORE } from '../actions/types';
import { appDefaultReducer } from "./defaultReducer";
import FilesystemStorage from 'redux-persist-filesystem-storage';
import RNFetchBlob from 'rn-fetch-blob';

FilesystemStorage.config({
    storagePath: `${RNFetchBlob.fs.dirs.DocumentDir}/persistStore`
});
export const reducerConfig = {
    timeout: 0, // The code base checks for falsy, so 0 disables
    key: 'root',
    storage: FilesystemStorage,
    blacklist: [/* 'appReducer' */, 'modalReducer', 'userReducer',/* 'chatReducer' */]
};
const appReducer = combineReducers({
    appReducer: AppReducer,
    userReducer: UserReducer,
    modalReducer: ModalReducer,
});

export default RootReducer = (state, action) => {
    var finalState = appReducer(state, action);
    if (action.type === RESET_STORE) {
        finalState = appDefaultReducer;//resetReducer(finalState, action);
    }
    return finalState;
}
