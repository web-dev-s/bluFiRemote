import {
    SET_SAFE_AREA, SET_BOTTOM_TAB, SET_THEME,
    SET_IN_CONTROLS_SCREEN, RESET_CONTROLS_SCREEN,
    SET_IN_SETTINGS_SCREEN, RESET_SETTINGS_SCREEN,
    RESET_STORE
} from './types';
export const setSafeArea = (safeArea) => {
    return (dispatch, getState) => {
        dispatch({ type: SET_SAFE_AREA, payload: safeArea, });
        return Promise.resolve(true);
    };
};

export const setBottomTab = (safeArea) => {
    return (dispatch, getState) => {
        dispatch({ type: SET_BOTTOM_TAB, payload: safeArea, });
        return Promise.resolve(true);
    };
};
export const clearStore = () => {
    return (dispatch) => {
        dispatch({ type: RESET_STORE });
        return Promise.resolve(true);
        // return true
    }
};

export const setAppTheme = (appTheme) => {
    return (dispatch, getState) => {
        dispatch({ type: SET_THEME, payload: appTheme, });
    };
}
export const setInControlsScreen = (actionData) => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_IN_CONTROLS_SCREEN, payload: actionData, })
    }
}
export const resetControlsScreen = (actionData) => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: RESET_CONTROLS_SCREEN, payload: actionData, });
    };
}
export const setInSettingsScreen = (actionData) => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: SET_IN_SETTINGS_SCREEN, payload: actionData, })
    }
}
export const resetSettingsScreen = (actionData) => {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({ type: RESET_SETTINGS_SCREEN, payload: actionData, });
    };
}
