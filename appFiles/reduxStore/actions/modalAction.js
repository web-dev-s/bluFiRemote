import {
    LOADING_MODAL_OPEN, LOADING_MODAL_CLOSE,
    MODAL_CLOSE, MODAL_OPEN, SCORED_FLASHING_MODAL_OPEN, SCORED_FLASHING_MODAL_CLOSE,
    USER_INFO_MODAL_OPEN, USER_INFO_MODAL_CLOSE, GET_PREMIUM_MODAL_OPEN, GET_PREMIUM_MODAL_CLOSE,
    MATCHING_MODAL_OPEN, MATCHING_MODAL_CLOSE, SHOW_PICTURE_MODAL_OPEN, SHOW_PICTURE_MODAL_CLOSE, SHOW_VIDEO_MODAL_OPEN, SHOW_VIDEO_MODAL_CLOSE,
    TUTORIAL_I_MODAL_OPEN, TUTORIAL_I_MODAL_CLOSE, TUTORIAL_II_MODAL_OPEN, TUTORIAL_II_MODAL_CLOSE, TUTORIAL_III_MODAL_OPEN, TUTORIAL_III_MODAL_CLOSE,
    SHOW_ACCESS_NOT_PERMITTED_MODAL_OPEN, SHOW_ACCESS_NOT_PERMITTED_MODAL_CLOSE,
    SEARCHING_MATCHES_MODAL_OPEN, SEARCHING_MATCHES_MODAL_CLOSE, NO_MATCHES_MODAL_OPEN, NO_MATCHES_MODAL_CLOSE,
    NO_SCORES_MODAL_OPEN, NO_SCORES_MODAL_CLOSE,
    BLOCK_CONTACT_MODAL_OPEN, BLOCK_CONTACT_MODAL_CLOSE,
    TERMS_MODAL_OPEN, TERMS_MODAL_CLOSE

} from './types';


export const modalOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalScoredFlashingOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SCORED_FLASHING_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalScoredFlashingClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: SCORED_FLASHING_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalUserInfoOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_INFO_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalUserInfoClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_INFO_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalGetPremimOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: GET_PREMIUM_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalGetPremimClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: GET_PREMIUM_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalMatchingOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: MATCHING_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalMatchingClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: MATCHING_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalTutorial_I_Open = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_I_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalTutorial_I_Close = () => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_I_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalTutorial_II_Open = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_II_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalTutorial_II_Close = () => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_II_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalTutorial_III_Open = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_III_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalTutorial_III_Close = () => {
    return (dispatch, getState) => {
        dispatch({ type: TUTORIAL_III_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalShowPictureOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_PICTURE_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalShowPictureClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: SHOW_PICTURE_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalLoadingOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: LOADING_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalLoadingClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: LOADING_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalShowVideoOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_VIDEO_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalShowVideoClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: SHOW_VIDEO_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalAccesNotPermittedOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_ACCESS_NOT_PERMITTED_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalAccesNotPermittedClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: SHOW_ACCESS_NOT_PERMITTED_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalSearchingMatchesOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SEARCHING_MATCHES_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalSearchingMatchesClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: SEARCHING_MATCHES_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalNoMatchesOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: NO_MATCHES_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalNoMatchesClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: NO_MATCHES_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalBlockContactOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: BLOCK_CONTACT_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalBlockContactClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: BLOCK_CONTACT_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalNoScoresOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: NO_SCORES_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalNoScoresClose = () => {

    return (dispatch, getState) => {
        dispatch({ type: NO_SCORES_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};

export const modalTermsOpen = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: TERMS_MODAL_OPEN, payload: { isOpen: data.isOpen, options: data.options } });
    };
};
export const modalTermsClose = () => {
    return (dispatch, getState) => {
        dispatch({ type: TERMS_MODAL_CLOSE, payload: { isOpen: false, options: {} } });
    };
};
