import {
    SET_SAFE_AREA, SET_BOTTOM_TAB, SET_THEME, SET_COLORS,
    SET_IN_CONTROLS_SCREEN, RESET_CONTROLS_SCREEN,
    SET_IN_SETTINGS_SCREEN, RESET_SETTINGS_SCREEN,
    RESET_STATE
} from '../actions/types';
import * as allImports from '../actions/types';
import { appDefaultReducer } from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.appReducer;
const imported = [];
Object.entries(allImports).forEach(([key, value]) => { imported.push(key); })
const acknowledgeCall = (actionType) => console.log(`::::::::::::appReducer-> ${actionType}::::::::::::`);

const otherActions = (actionType) => {
    if (imported.indexOf(actionType) > -1) return null;
    else return console.log(`::::::::::::REDUX : ${actionType}::::::::::::`);
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SAFE_AREA: {
            acknowledgeCall(action.type);
            return { ...state, safeArea: action.payload, };
        }
        case SET_BOTTOM_TAB: {
            acknowledgeCall(action.type);
            return { ...state, bottomTab: action.payload, };
        }
        case SET_THEME: {
            acknowledgeCall(action.type);
            return { ...state, theme: action.payload, };
        }
        case SET_IN_CONTROLS_SCREEN: {
            acknowledgeCall(action.type);
            return { ...state, controlsScreen: { ...state.controlsScreen, ...action.payload } }
        }
        case RESET_CONTROLS_SCREEN: {
            acknowledgeCall(action.type);
            return { ...state, controlsScreen: { lastStartedProgram: 0, activeProgram: 0 } }
        }
        case SET_IN_SETTINGS_SCREEN: {
            acknowledgeCall(action.type);
            return { ...state, settingsScreen: { ...state.settingsScreen, ...action.payload } }
        }
        case RESET_SETTINGS_SCREEN: {
            acknowledgeCall(action.type);
            return {
                ...state, settingsScreen: {
                    mode: 0,
                    oscilationSpeed: 0,
                    sleepTime: 0,
                    stopMovementBeforeWakeUp: 0,
                    timeOn: 0,
                    timeOff: 0,
                    stopMovementAfterAsleep: 0,
                }
            }
        }

        case RESET_STATE: {
            acknowledgeCall(action.type);
            return INITIAL_STATE
        }

        default: return state;
    }
}


