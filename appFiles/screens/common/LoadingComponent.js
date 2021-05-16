import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { wp, hp } from '../../helper/responsiveScreen';
import { fontSize, font, } from '../../helper/themeHelper';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoadingComponent = (props) => {
    const { theme, width, height, borderWidth, bullets, text } = props;
    const [transform, setTransform] = useState({ transform: [{ rotate: `${-360}deg` }] });
    const [transformValue, setTransformValue] = useState(0)
    const wdth = width ?? wp('98%');
    const hght = height ?? wp('98%');
    const bdWdth = borderWidth ?? wp('1%');
    const circleWidth = (wdth / 2) - borderWidth;

    useEffect(() => { setTimeout(() => setTransformValue(c => c < 0 ? c + 1 : -360), 100) }, [transform]);
    useEffect(() => {
        setTransform({ transform: [{ rotate: `${transformValue}deg` }] })
    }, [transformValue]);


    const { textStyle } = styles(theme);
    return (<View name={'transparent Container'}
        style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center',
            width: wdth, height: hght,
            borderRadius: wdth,
            borderWidth: bdWdth, borderColor: 'white',
            position: 'relative',
            backgroundColor: 'transparent',
            ...transform
        }}>
        <View name={'whiteCircle'} style={{
            alignSelf: 'center',
            justifyContent: 'center', alignItems: 'center',
            width: circleWidth, height: circleWidth,
            borderRadius: circleWidth,
            backgroundColor: 'white',
            marginLeft: bdWdth,
            zIndex: 1,
            transform: [{ rotate: `${-45}deg` }],
            // borderWidth: wp('1%'), borderColor: 'white',
        }} >
            {text?.first?.length > 0
                && <Text style={{ ...textStyle, transform: [{ rotate: `${45}deg` }], ...text.style }}
                    adjustsFontSizeToFit allowFontScaling>{text.first}</Text>
            }
            {bullets && <View style={{
                width: wdth / 6, height: wdth / 6, borderRadius: wdth / 6, backgroundColor: theme.GRADIEND_MEDIUM,

            }} />}
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
            borderTopLeftRadius: wdth,
            borderTopRightRadius: wdth,
            width: wdth, height: wdth / 2,
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', top: -wp('1%'),
            backgroundColor: 'white', zIndex: -1
        }} />


        <LinearGradient name={'gradientBkground'}
            start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }}
            colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GRADIEND_MEDIUM,
            theme.GR_INTERMED_II]}
            style={{
                borderBottomLeftRadius: wdth,
                borderBottomRightRadius: wdth,
                width: wdth, height: wdth / 2,
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
                width: circleWidth, height: circleWidth,
                borderRadius: circleWidth,
                marginRight: wp('1%'),
                // borderWidth: wp('1%'), borderColor: 'white',
                transform: [{ rotate: `${-45}deg` }],
                zIndex: 1,
            }}>
            {text?.second?.length > 0
                && <Text style={{ ...textStyle, transform: [{ rotate: `${45}deg` }], ...text.style }}
                    adjustsFontSizeToFit allowFontScaling>{text.second}</Text>
            }
            {bullets && <View style={{
                width: wdth / 6, height: wdth / 6, borderRadius: wdth / 6, backgroundColor: theme.WHITE,
            }} />}
        </LinearGradient>
    </View >
    )
}
const styles = StyleSheet.create((theme) => ({
    textStyle: {
        fontSize: fontSize.N32, fontFamily: font.nunitoBlack, color: theme.BLACK, fontWeight: '900',
        textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, //textShadowColor: theme.PARAGRAPH_HEADERS_ICONS,

    }

}));
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme };
};

export const Loading = connect(mapStateToProps,)(LoadingComponent)
