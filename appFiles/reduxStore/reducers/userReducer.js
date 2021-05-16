import {
    SET_USER_DETAILS, SET_USER_DETAILS_DATA, RESET_USER_DETAILS_DATA, SET_USER_DETAILS_DATA_MEDIA, SET_USER_DETAILS_DATA_SETTINGS,
    CREDENTIALS, SET_CHAT_PUSHER_STATUS, SET_ACTIVE_SCREEN, SET_BLOCKED_PROFILE_IDS, RESET_STATE
} from '../actions/types';
import { appDefaultReducer } from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.userReducer;
const acknowledgeCall = (actionType) => console.log(`::::::::::::userReducer-> ${actionType}::::::::::::`);

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_USER_DETAILS: { acknowledgeCall(action.type); return { ...state, userDetail: { ...state.userDetail, ...action.payload, }, }; }
        case SET_USER_DETAILS_DATA: {
            acknowledgeCall(action.type);
            return {
                ...state, userDetail: {
                    ...state.userDetail, data: {
                        ...state.userDetail.data,
                        settings: state.userDetail.data.settings,
                        ...action.payload
                    },
                },
            };
        }
        case SET_USER_DETAILS_DATA_MEDIA: {
            acknowledgeCall(action.type);
            return {
                ...state, userDetail: {
                    ...state.userDetail, data: {
                        ...state.userDetail.data,
                        settings: state.userDetail.data.settings,
                        media: [...action.payload]
                    },
                },
            };
        }
        case RESET_USER_DETAILS_DATA: { acknowledgeCall(action.type); return { ...state, userDetail: INITIAL_STATE.userDetail, }; }
        case SET_USER_DETAILS_DATA_SETTINGS: {
            acknowledgeCall(action.type);
            return {
                ...state,
                userDetail:
                {
                    ...state.userDetail,
                    data: {
                        ...state.userDetail.data,
                        settings: {
                            ...state.userDetail.data.settings,
                            ...action.payload
                        },
                    },
                }
            }
        }
        case CREDENTIALS: { acknowledgeCall(action.type); return { ...state, credentials: { ...state.credentials, ...action.payload } } }
        case SET_CHAT_PUSHER_STATUS: { acknowledgeCall(action.type); return { ...state, chatPusherEnabled: action.payload } }
        case SET_ACTIVE_SCREEN: { acknowledgeCall(action.type); return { ...state, activeScreen: action.payload } }
        case SET_BLOCKED_PROFILE_IDS: { acknowledgeCall(action.type); return { ...state, blockedProfileIds: action.payload } }
        case RESET_STATE: {
            acknowledgeCall(action.type);
            return INITIAL_STATE;
        }
        default: return state;
    }

}
