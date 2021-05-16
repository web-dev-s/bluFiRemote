import { Platform, Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const util = require('util');
const log = (obj) => console.log(util.inspect(obj, { showHidden: true, depth: null, colors: true, compact: false, getters: true }));

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');



// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 375;

export function normalize(size) {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}
export function isIPhoneXrSize(dim) {
    return dim.height == 896 || dim.width == 896;
}

module.exports = {
    tonySpinkDer: {
        PRIMARY_BACKGROUND_COLOR: '#ffffff', // app background white or white nuances on light theme
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_DISABLED: '#acaeb0', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#ffffff28', // ligther shade of white


        MAIN: '#F3A598',
        ACCENT: '#EA6148',
        MAIN_LIGHT: '#FDEFED',
        PARAGRAPH_HEADERS_ICONS: '#353D46',
        DARK_GRAY: '#9B9B9B',
        LIGHT_GRAY: '#EBEBEB',


        SECONDARY_BACKGROUND_COLOR: '#3d3d3d', //
        SECONDARY_BACKGROUND_COLOR_LIGHT: '#797979', //

        PRIMARY_TEXT_COLOR: '#3d3d3d',
        PRIMARY_TEXT_COLOR_LIGHT: '#ffffff', //white
        PRIMARY_TEXT_COLOR_DARK: '#40495C', //black

        SECONDARY_TEXT_COLOR: '#4a4a4a', //dark color washed black or dark gray 
        SECONDARY_TEXT_COLOR_DARK: '#353D46',
        SECONDARY_TEXT_COLOR_LIGHT: '#9B9B9B', //gray and shades of gray
        SECONDARY_TEXT_COLOR_LIGHTER: '#d2d2d2', //gray and shades of gray 

        PRIMARY_TEXT_BACKGROUND_COLOR: '#ffffff',
        SECONDARY_TEXT_BACKGROUND_COLOR: '#ffffff',

        PRIMARY_COLOR_FAINT1: '#F5A596',
        PRIMARY_COLOR_FAINT2: '#f3a4963f',
        PRIMARY_COLOR_FAINT3: '#f3a6981c',
        PRIMARY_COLOR_LIGHT: '#d256407c',
        PRIMARY_COLOR_LIGHTER: '#f3a6981c',
        PRIMARY_COLOR: '#F3A598',
        PRIMARY_COLOR_DARK: '#EA6148',
        PRIMARY_COLOR_BOLD: '#EC6042',
        PRIMARY_FOREGROUND_COLOR: '#f5f5f5',

        MATCH_BUTTONS_BORDER: '#F3A598',
        MATCH_BUTTONS_COLOR: '#F3A598',
        USER_DESCRIPTION_TITLES: '#F7A594',
        USER_DESCRIPTION_TEXT: '#4A4A4A',
        USER_DESCRIPTION_TINT: '#f3a6981c',
        USER_DESCRIPTION_ICON: '#EA6148',
        WHITE: '#ffffff',
        BLACK: '#40495C',


        ERROR: '#dc3117',
        WARNING: '#FB5607',
        MESSAGE: '#002586',
        SUCCESS: '#40D100',
        TRANSPARENT: 'transparent',
        BLUR: '#75747452',
        cFBLogin: '#3B5998',
        cFBLIco: '#344F88',
        cGoogleSignin: '#E94335',
        cGSIIco: '#D13C2F'
    },
    purpleDer: {
        PRIMARY_BACKGROUND_COLOR: '#ffffff', // app background white or white nuances on light theme
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_DISABLED: '#acaeb0', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#ffffff28', // ligther shade of white

        SECONDARY_BACKGROUND_COLOR: '#3d3d3d', //
        SECONDARY_BACKGROUND_COLOR_LIGHT: '#797979', //

        PRIMARY_TEXT_COLOR: '#3d3d3d',
        PRIMARY_TEXT_COLOR_LIGHT: '#ffffff', //white
        PRIMARY_TEXT_COLOR_DARK: '#40495C', //black

        SECONDARY_TEXT_COLOR: '#4a4a4a', //dark color washed black or dark gray 
        SECONDARY_TEXT_COLOR_DARK: '#353D46',
        SECONDARY_TEXT_COLOR_LIGHT: '#9b9b9b', //gray and shades of gray
        SECONDARY_TEXT_COLOR_LIGHTER: '#d2d2d2', //gray and shades of gray 

        PRIMARY_TEXT_BACKGROUND_COLOR: '#ffffff',
        SECONDARY_TEXT_BACKGROUND_COLOR: '#ffffff',

        PRIMARY_COLOR_FAINT1: '#9a5de52a', //using opacity on parent container applies to childrens also...,  therefore must be used transparent colors
        PRIMARY_COLOR_FAINT2: '#9a5de585',
        PRIMARY_COLOR_FAINT3: '#9a5de518',
        PRIMARY_COLOR_LIGHT: '#b98ae5a1',
        PRIMARY_COLOR_LIGHTER: '#b98ae5a1',
        PRIMARY_COLOR: '#B98AE5',
        PRIMARY_COLOR_DARK: '#75267E',
        PRIMARY_COLOR_BOLD: '#75267E',
        PRIMARY_FOREGROUND_COLOR: '',

        MATCH_BUTTONS_BORDER: '#ffffff',
        MATCH_BUTTONS_COLOR: '#75267E',
        USER_DESCRIPTION_TITLES: '#B98AE5',
        USER_DESCRIPTION_TEXT: '#4A4A4A',
        USER_DESCRIPTION_TINT: '#9a5de518',
        USER_DESCRIPTION_ICON: '#B98AE5',

        WHITE: '#ffffff',
        BLACK: '#40495C',
        ERROR: '#dc3117',
        WARNING: '#FB5607',
        MESSAGE: '#002586',
        SUCCESS: '#40D100',
        TRANSPARENT: 'transparent',
        BLUR: '#75747452',
        cFBLogin: '#3B5998',
        cFBLIco: '#344F88',
        cGoogleSignin: '#E94335',
        cGSIIco: '#D13C2F'
    },
    lightBlueDer: {
        PRIMARY_BACKGROUND_COLOR: '#ffffff', // app background white or white nuances on light theme
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_DISABLED: '#acaeb0', // ligther shade of white
        PRIMARY_BACKGROUND_COLOR_LIGHT: '#ffffff28', // ligther shade of white

        SECONDARY_BACKGROUND_COLOR: '#3d3d3d', //
        SECONDARY_BACKGROUND_COLOR_LIGHT: '#797979', //



        PRIMARY_TEXT_COLOR: '#3d3d3d',
        PRIMARY_TEXT_COLOR_LIGHT: '#ffffff', //white
        PRIMARY_TEXT_COLOR_DARK: '#40495C', //black

        SECONDARY_TEXT_COLOR: '#4a4a4a', //dark color washed black or dark gray 
        SECONDARY_TEXT_COLOR_DARK: '#353D46',
        SECONDARY_TEXT_COLOR_LIGHT: '#9b9b9b', //gray and shades of gray
        SECONDARY_TEXT_COLOR_LIGHTER: '#d2d2d2', //gray and shades of gray 

        PRIMARY_TEXT_BACKGROUND_COLOR: '#ffffff',
        SECONDARY_TEXT_BACKGROUND_COLOR: '#ffffff',

        PRIMARY_COLOR_FAINT1: '#01baef79',
        PRIMARY_COLOR_FAINT2: '#01baef42',
        PRIMARY_COLOR_FAINT3: '#01baef21',
        PRIMARY_COLOR_LIGHT: '#01bbefa8',
        PRIMARY_COLOR_LIGHTER: '#01bbef67',
        PRIMARY_COLOR: '#01BAEF',
        PRIMARY_COLOR_DARK: '#02a0cc',
        PRIMARY_COLOR_BOLD: '#01a3cfd5',
        PRIMARY_FOREGROUND_COLOR: '#f5f5f5',



        MATCH_BUTTONS_BORDER: '#0290b8d5',
        MATCH_BUTTONS_COLOR: '#01BAEF',
        USER_DESCRIPTION_TITLES: '#01BAEF',
        USER_DESCRIPTION_TEXT: '#4A4A4A',
        USER_DESCRIPTION_TINT: '#01baef21',
        USER_DESCRIPTION_ICON: '#01BAEF',

        WHITE: '#ffffff',
        BLACK: '#40495C',
        ERROR: '#dc3117',
        WARNING: '#FB5607',
        MESSAGE: '#002586',
        SUCCESS: '#40D100',
        TRANSPARENT: 'transparent',
        BLUR: '#75747452',
        cFBLogin: '#3B5998',
        cFBLIco: '#344F88',
        cGoogleSignin: '#E94335',
        cGSIIco: '#D13C2F'
    },
    color: {
        trasparent: 'transparent',
        // mainColor: '#ea6148',//'#eaa9a0',//
        // mainColorBorder: '#d25740',
        mainColorLight: '#d256407c',
        mainColorLightText: '#f3a598',
        mainColorLighter: '#fdefed',
        mainColorLightTransparent: '#f8c6bf9c',
        pinkTransparent: '#eaa9a02a',
        white: '#ffffff',
        whiteT1: '#ffffffb7',
        whiteT2: '#ffffff88',
        whiteT3: '#ffffff42',

        mainGray: '#4a4a4a',
        mainGrayTransparent: '#4a4a4a83',
        appBackground: '#f5f5f5',//'#eaa9a0', ,//
        appBackgroundTransparent: '#eaa9a08e',//'#f5f5f58e',

        lightGray1: '#9b9b9b',
        lightGray1Transparent: '#9b9b9b8e',
        lightGray2: '#d2d2d2',
        lightGray2Transparent: '#d2d2d28e',

        modalDarkBackground: '#142A3D60',



        black: '#000000',
        washedBlack: '#40495C',

        whiteTransp: '#ffffff8a',
        blue: '#3771ff',
        imperialBlue: '#002586',
        washedBlue: '#3771ff',
        lightgray: '#D4DFE8',
        darkgray: '#7c8797',
        gray: '#9DB2C5',
        red: '#dc3117',
        viola: '#6a48a0',
        darkRed: '#DF2935',
        lightSky: '#e5f2fe',
        ultraLightSky: "#CFE8FF",
        darkBlue: '#00153d',
        sky: '#dff0ff',
        yellow: '#ffb602',
        green: '#40D100',
        greeny: '#3FD102',
        redOrange: '#FB5607',
        twitterBlue: '#47cdf7',
        header: '#054993',
        placholderGray: '#A7BBCC',
        // text:'#054993',
        // blue:"#054993",
        lightblue: '#0cb6f3',
        facebook: "#3667b8",
        twitter: "#00a3f9",
        instragram: "#e50069",
        textInput: '#0a1d41',
        transparent: 'transparent',
        // modalBackground: 'rgba(6, 73, 147, 0.55)',//'#142A3D60',
        modalBackground: '#142A3D60',//'#142A3D60',

        dropDownBackground: '#EBF5FF',
        darkYellow: '#F6B545',
        // lightGray:'#b5c8dd'
        calendarHighAvailable: '#CFE8FF',
        calendarAvailable: '#DBCD96',
        calendarNotAvailable: '#FF7956',
    },
    font: {
        nunitoBlack: (Platform.OS === 'ios') && 'Nunito-Black' || 'Nunito-Black',
        nunitoExtraBold: 'Nunito-ExtraBold',
        nunitoBold: 'Nunito-Bold',
        nunitoRegular: 'Nunito-Regular',
        nunitoSemiBold: 'Nunito-SemiBold',
        josefinSansBold: 'JosefinSans-Bold',


    },
    style: {
        container: { width: SCREEN_WIDTH * 0.85, alignSelf: 'center' }
    },
    screen: Dimensions.get('window'),
    isIOS: (Platform.OS === 'ios'),
    isANDROID: (Platform.OS === 'android'),
    hasNotch:DeviceInfo.hasNotch(),
    isiPAD: ((SCREEN_HEIGHT / SCREEN_WIDTH) < 1.6),
    isIphoneX: isIPhoneXrSize(Dimensions.get('window')),
    screenHeight: (Platform.OS === 'ios') && SCREEN_HEIGHT || SCREEN_HEIGHT - 24,
    screenWidth: SCREEN_WIDTH,
    fullScreenHeight: SCREEN_HEIGHT,
    logJson: log,
    fontSize: {
        N8: normalize(8),
        N10: normalize(10),
        N11: normalize(11),
        N12: normalize(12),
        N13: normalize(13),
        N14: normalize(14),
        N15: normalize(15),
        N16: normalize(16),

        N17: normalize(17),
        N17_5: normalize(17.5),
        N18: normalize(18),
        N19: normalize(20),
        N20: normalize(20),
        N22: normalize(22),
        N24: normalize(24),
        N26: normalize(26),
        N28: normalize(28),
        N30: normalize(30),
        N32: normalize(32),
        N34: normalize(34),
        N36: normalize(36),
        N38: normalize(38),
        N40: normalize(40),
        N42: normalize(42),
        N44: normalize(44),
        N46: normalize(46),
        N48: normalize(48),
        N50: normalize(50),
        N52: normalize(52),
        N56: normalize(56),
        N58: normalize(58),
        N60: normalize(60),
        N64: normalize(64),
        N68: normalize(68),
        N72: normalize(72),
        N92: normalize(92),
        N108: normalize(108),
        N118: normalize(118),
        N128: normalize(128),
        N138: normalize(138),
        N148: normalize(148),
        N150: normalize(150),
        N152: normalize(152),
        N154: normalize(154),
    },
    //3770ff
    shadowStyle: {
        shadowColor: '#4a4a4a', //'#D0E0F0',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 3,
    }
};
