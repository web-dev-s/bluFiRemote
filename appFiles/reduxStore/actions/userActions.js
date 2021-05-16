import {
    SET_USER_DETAILS, SET_USER_DETAILS_DATA, RESET_USER_DETAILS_DATA, SET_USER_DETAILS_DATA_MEDIA, SET_USER_DETAILS_DATA_SETTINGS,
    CREDENTIALS, SET_ACTIVE_SCREEN, SET_BLOCKED_PROFILE_IDS, RESET_STATE
} from './types';
import { store } from '../store';
import moment from "moment";
import { logJson } from '../../helper/themeHelper';


//classic promises and functions for local dispatch
export const updateUserDetail = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_USER_DETAILS, payload: actionData, });
    }
}
export const updateUserDetailData = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_USER_DETAILS_DATA, payload: actionData, });
    }

}
export const updateUserDetailDataMedia = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_USER_DETAILS_DATA_MEDIA, payload: actionData, });
    }

}
export const updateUserDetailDataSettings = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_USER_DETAILS_DATA_SETTINGS, payload: actionData, });
    }

}
export const updateCredentials = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: CREDENTIALS, payload: actionData, });

    }
}
export const setBlockedProfileIds = actionData => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_BLOCKED_PROFILE_IDS, payload: actionData, });
    }
}

//used globally in app
export const resetUserReducer = () => {
    return (dispatch, getState) => {
        dispatch({ type: RESET_USER_DETAILS_DATA, payload: {} });

    };

}
export const setActiveScreen = (screenName) => {
    return (dispatch, getState) => {
        dispatch({ type: SET_ACTIVE_SCREEN, payload: screenName });

    };
}