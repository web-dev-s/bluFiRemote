import { isIOS } from '../../../helper/themeHelper';
import { wp, hp } from '../../../helper/responsiveScreen';
export const appDefault = {
        safeArea: {
                top: isIOS ? hp(3.5) : 0,
                bottom: 0,
                left: 0,
                right: 0,
                bottomTabHeight: 0
        },
        bottomTab: 2,
        theme: {
                GRADIENT_DARK: '#302335',
                GR_INTERMED_I: '#4a273d',
                GRADIEND_MEDIUM: '#5d2b44',
                GR_INTERMED_II: '#692b48',
                GRADIENT_LIGHT: '#8d3156',


                PRIMARY_BACKGROUND_COLOR: '#ffffff', // app background white or white nuances on light theme
                PRIMARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7', // ligther shade of white
                PRIMARY_BACKGROUND_COLOR_DISABLED: '#acaeb0', // ligther shade of white
                PRIMARY_BACKGROUND_COLOR_LIGHT: '#ffffff28', // ligther shade of white

                MAIN: '#8d3156',
                ACCENT: '#5d2b44',
                MAIN_LIGHT: '#FDEFED',
                PARAGRAPH_HEADERS_ICONS: '#353D46',
                DARK_GRAY: '#9B9B9B',
                LIGHT_GRAY: '#EBEBEB',
                PRIMARY_TEXT_COLOR: '#3d3d3d',
                PRIMARY_TEXT_COLOR_LIGHT: '#ffffff', //white
                PRIMARY_TEXT_COLOR_DARK: '#40495C', //black

                SECONDARY_TEXT_COLOR: '#4a4a4a', //dark color washed black or dark gray  
                SECONDARY_TEXT_COLOR_LIGHT: '#9B9B9B', //gray and shades of gray
                SECONDARY_TEXT_COLOR_LIGHTER: '#d2d2d2', //gray and shades of gray 


                WHITE: '#ffffff',
                BLACK: '#40495C',
                EXTRA_BLACK: '#000000',
                GREEN: '#018577',
                TOMATO: 'tomato',

                DISABLED: '#CDCDCD',
                DISABLED_VARIANT: '#ADADAD',
                ERROR: '#dc3117',
                WARNING: '#FB5607',
                MESSAGE: '#002586',
                SUCCESS: '#40D100',
                TRANSPARENT: 'transparent',
                BLUR: '#75747452',

        },
        controlsScreen: {
                lastStartedProgram: 0,
                activeProgram: 0
        },
        settingsScreen: {
                mode: 2,
                oscilationSpeed: 0,
                sleepTime: 0,
                stopMovementBeforeWakeUp: 0,
                timeOn: 0,
                timeOff: 0,
                stopMovementAfterAsleep: 10,
        }

};