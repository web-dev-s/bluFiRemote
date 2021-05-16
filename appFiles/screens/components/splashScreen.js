import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, } from 'react-native';
import { connect } from "react-redux";
import { wp, hp } from '../../helper/responsiveScreen';
import { fontSize, font } from '../../helper/themeHelper';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const SplashScreen = ({ route, ...props }) => {
    const isFocused = useIsFocused();
    const { theme, navigation } = props;
    useEffect(() => { if (isFocused) { setTimeout(() => navigation.navigate('Intro'), 3000) } }, [isFocused]);

    const { wrapperStyle, textStyle } = styles(theme);
    const DisplayHorizontal = (props) => {
        const [transform, setTransform] = useState({ transform: [{ rotate: `${-360}deg` }] });
        const [transformValue, setTransformValue] = useState(0)


        useEffect(() => { setTimeout(() => setTransformValue(c => c < 0 ? c + 1 : -360), 100) }, [transform]);
        useEffect(() => {
            setTransform({ transform: [{ rotate: `${transformValue}deg` }] })
        }, [transformValue]);



        return (<View name={'transparent Container'}
            style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center',
                width: wp('98%'), height: wp('99%'),
                borderRadius: wp('99%'),
                borderWidth: wp('1%'), borderColor: 'white',
                position: 'relative',
                backgroundColor: 'transparent',
                ...transform
            }}>
            <View name={'whiteCircle'} style={{
                alignSelf: 'center',
                justifyContent: 'center', alignItems: 'center',
                width: wp('48%'), height: wp('49%'),
                borderRadius: wp('48%'),
                backgroundColor: 'white',
                marginLeft: wp('1%'),
                zIndex: 1,
                transform: [{ rotate: `${-45}deg` }],
                // borderWidth: wp('1%'), borderColor: 'white',
            }} >
                <Text style={{ ...textStyle, transform: [{ rotate: `${45}deg` }] }}>SLEEP</Text>
            </View>

            {/* <View name={'gradientCircle'}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center',
                    width: wp('48.5%'), height: wp('49%'),
                    borderRadius: wp('49%'),
                    marginRight: wp('1%'),
                    backgroundColor: theme.GR_INTERMED_II,
                    zIndex: 2,
                }}>
                <Text style={styles.textStyle}>WELL</Text>
            </View> */}
            <View name={'whiteFirstHalf'} style={{
                borderTopLeftRadius: wp('99%'),
                borderTopRightRadius: wp('99%'),
                width: wp('98%'), height: wp('48%'),
                justifyContent: 'center', alignItems: 'center',
                position: 'absolute', top: -wp('1%'),
                backgroundColor: 'white', zIndex: -1
            }} />


            <LinearGradient name={'gradientBkground'}
                start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }}
                colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GRADIEND_MEDIUM,
                theme.GR_INTERMED_II]}
                style={{
                    borderBottomLeftRadius: wp('99%'),
                    borderBottomRightRadius: wp('99%'),
                    width: wp('98%'), height: wp('49%'),
                    justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', bottom: -wp('1%'),
                    borderWidth: wp('1%'), borderColor: 'white',

                }} />
            <LinearGradient name={'gradientCircle'}
                start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }}
                colors={[theme.GRADIEND_MEDIUM, theme.GRADIEND_MEDIUM,
                theme.GR_INTERMED_II,]}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center',
                    width: wp('48%'), height: wp('48%'),
                    borderRadius: wp('48%'),
                    marginRight: wp('1%'),
                    // borderWidth: wp('1%'), borderColor: 'white',
                    transform: [{ rotate: `${-45}deg` }],
                    zIndex: 1,
                }}>
                <Text style={{ ...textStyle, transform: [{ rotate: `${45}deg` }] }}>WELL</Text>
            </LinearGradient>
        </View >
        )
    }
    return (<LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
        colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GR_INTERMED_II, theme.GRADIENT_LIGHT]}
        style={[wrapperStyle, {}]}>

        <DisplayHorizontal />

    </LinearGradient>
    );
}

const styles = StyleSheet.create((theme) => ({
    wrapperStyle: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    textStyle: {
        fontSize: fontSize.N32, fontFamily: font.nunitoBlack, color: theme.BLACK, fontWeight: '900',
        textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, //textShadowColor: theme.PARAGRAPH_HEADERS_ICONS,

    }

}));
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { userDetail } = store.userReducer;
    return { theme, userDetail, };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetail: (email) => dispatch(updateUserDetail(email)),
        onUserSocialLogin: (socialCredentials) => dispatch(userSocialLoginRtv(socialCredentials)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);