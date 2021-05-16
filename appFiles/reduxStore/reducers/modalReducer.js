import {
    LOADING_MODAL_OPEN, LOADING_MODAL_CLOSE,
    MODAL_CLOSE, MODAL_OPEN, SCORED_FLASHING_MODAL_OPEN, SCORED_FLASHING_MODAL_CLOSE, USER_INFO_MODAL_OPEN, USER_INFO_MODAL_CLOSE,
    GET_PREMIUM_MODAL_OPEN, GET_PREMIUM_MODAL_CLOSE, MATCHING_MODAL_OPEN, MATCHING_MODAL_CLOSE,
    SHOW_PICTURE_MODAL_OPEN, SHOW_PICTURE_MODAL_CLOSE, SHOW_VIDEO_MODAL_OPEN, SHOW_VIDEO_MODAL_CLOSE,
    TUTORIAL_I_MODAL_OPEN, TUTORIAL_I_MODAL_CLOSE, TUTORIAL_II_MODAL_OPEN, TUTORIAL_II_MODAL_CLOSE, TUTORIAL_III_MODAL_OPEN, TUTORIAL_III_MODAL_CLOSE,
    SHOW_ACCESS_NOT_PERMITTED_MODAL_OPEN, SHOW_ACCESS_NOT_PERMITTED_MODAL_CLOSE,
    SEARCHING_MATCHES_MODAL_OPEN, SEARCHING_MATCHES_MODAL_CLOSE, NO_MATCHES_MODAL_OPEN, NO_MATCHES_MODAL_CLOSE,
    NO_SCORES_MODAL_OPEN, NO_SCORES_MODAL_CLOSE,
    BLOCK_CONTACT_MODAL_OPEN, BLOCK_CONTACT_MODAL_CLOSE,
    TERMS_MODAL_OPEN, TERMS_MODAL_CLOSE
} from '../actions/types';
import { appDefaultReducer } from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.modalReducer;
const acknowledgeCall = (actionType) => console.log(`::::::::::::modalReducer-> ${actionType}::::::::::::`);
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case MODAL_CLOSE: { 
             acknowledgeCall(action.type);
            return { ...state, isOpen: action.payload.isOpen, options: action.payload.options };
        }
        case MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, isOpen: action.payload.isOpen, options: action.payload.options };
        }

        case SCORED_FLASHING_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, scoredFlashingModal: { ...state.scoredFlashingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case SCORED_FLASHING_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, scoredFlashingModal: { ...state.scoredFlashingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case USER_INFO_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, userInfoModal: { ...state.userInfoModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case USER_INFO_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, userInfoModal: { ...state.userInfoModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case GET_PREMIUM_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, getPremiumModal: { ...state.getPremiumModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case GET_PREMIUM_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, getPremiumModal: { ...state.getPremiumModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case MATCHING_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, matchingModal: { ...state.matchingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case MATCHING_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, matchingModal: { ...state.matchingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case TUTORIAL_I_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_I_Modal: { ...state.tutorial_I_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case TUTORIAL_I_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_I_Modal: { ...state.tutorial_I_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case TUTORIAL_II_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_II_Modal: { ...state.tutorial_II_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case TUTORIAL_II_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_II_Modal: { ...state.tutorial_II_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }


        case TUTORIAL_III_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_III_Modal: { ...state.tutorial_III_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case TUTORIAL_III_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, tutorial_III_Modal: { ...state.tutorial_III_Modal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case SHOW_PICTURE_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, showPictureModal: { ...state.showPictureModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case SHOW_PICTURE_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, showPictureModal: { ...state.showPictureModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case LOADING_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, loadingModal: { ...state.loadingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case LOADING_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, loadingModal: { ...state.loadingModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case SHOW_VIDEO_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, showVideoModal: { ...state.showVideoModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case SHOW_VIDEO_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, showVideoModal: { ...state.showVideoModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case SHOW_ACCESS_NOT_PERMITTED_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, accesNotPermittedModal: { ...state.accesNotPermittedModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case SHOW_ACCESS_NOT_PERMITTED_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, accesNotPermittedModal: { ...state.accesNotPermittedModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case SEARCHING_MATCHES_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, searchingMatchesModal: { ...state.searchingMatchesModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case SEARCHING_MATCHES_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, searchingMatchesModal: { ...state.searchingMatchesModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case NO_MATCHES_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, noMatchesModal: { ...state.noMatchesModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case NO_MATCHES_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, noMatchesModal: { ...state.noMatchesModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case BLOCK_CONTACT_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, blockContactModal: { ...state.blockContactModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case BLOCK_CONTACT_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, blockContactModal: { ...state.blockContactModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case NO_SCORES_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, noScoresModal: { ...state.noScoresModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case NO_SCORES_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, noScoresModal: { ...state.noScoresModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        case TERMS_MODAL_OPEN: {
             acknowledgeCall(action.type);
            return { ...state, termsModal: { ...state.termsModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }
        case TERMS_MODAL_CLOSE: {
             acknowledgeCall(action.type);
            return { ...state, termsModal: { ...state.termsModal, isOpen: action.payload.isOpen, options: action.payload.options } };
        }

        default: return state;
    }
}
