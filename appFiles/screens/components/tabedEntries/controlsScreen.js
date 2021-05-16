import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Pressable, Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Animated, PanResponder, ScrollView, AppRegistry, Keyboard } from 'react-native';
import { connect } from "react-redux";
import {
    modalScoredFlashingOpen, modalLoadingOpen, modalLoadingClose, modalUserInfoOpen,
    modalNoScoresOpen, modalNoScoresClose
} from '../../../reduxStore/actions/modalAction';
import { setInControlsScreen } from '../../../reduxStore/actions/appAction';
import { wp, hp } from '../../../helper/responsiveScreen';
import { fullScreenHeight, screenHeight, screenWidth, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { LoadingModal } from '../../common'
import * as Progress from 'react-native-progress';
import imgAsset from '../../../assets/images';
import { RoundPressable } from '../../common';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const ControlsScreen = ({ route, scrollX, ...props }) => {
    const isFocused = useIsFocused();
    const { theme, navigation, lastStartedProgram, activeProgram, onSetInControlsScreen, } = props;

    const [loading, setLoading] = useState(true);
    const { wrapperStyle, triangle, square } = styles(theme);
    const [dim, setDim] = useState({});
    const rightAngledPositionOnCircle = (angleDegrees, patternDiameter, eRCompensation) => {
        const angleRadians = angleDegrees * (Math.PI / 180);
        let cx = patternDiameter / 2 + eRCompensation; // center of x(in a circle)
        let cy = patternDiameter / 2 + eRCompensation; // center of y(in a circle)
        let r = patternDiameter / 2; // r
        console.log('leftAngledPositionOnCircle:', {
            cx: cx,
            cy: cy,
            left: cx + (r * Math.cos(angleRadians)),
            top: cy + (r * Math.sin(angleRadians)),
            angleRadians: angleRadians
        });
        return ({ position: 'absolute', left: cx + (r * Math.cos(angleRadians)), top: cy + (r * Math.sin(angleRadians)) })

    }
    const leftAngledPositionOnCircle = (angleDegrees, patternDiameter, eRCompensation) => {

        const angleRadians = angleDegrees * (Math.PI / 180);
        let cx = patternDiameter / 2 + eRCompensation; // center of x(in a circle)
        let cy = patternDiameter / 2 + eRCompensation; // center of y(in a circle)
        let r = patternDiameter / 2; // r
        console.log('rightAngledPositionOnCircle:\n\n', {
            cx: cx,
            cy: cy,
            left: cx + (r * Math.cos(angleRadians)),
            top: cy + (r * Math.sin(angleRadians)),
            angleRadians: angleRadians
        })

        return ({ position: 'absolute', left: cx + (r * Math.cos(angleRadians)), top: cy + (r * Math.sin(angleRadians)) })

    }
    const findPointOnCircle = (numberOfElements, sizeOfDispPattern, elementRadius) => {
        //  let number = 6; // how many number to be placed
        //   let sizeOfDispPattern = wp('60%'); // size of circle i.e. w = h = 260
        let cx = sizeOfDispPattern / 2 + elementRadius; // center of x(in a circle)
        let cy = sizeOfDispPattern / 2 + elementRadius; // center of y(in a circle)
        let r = sizeOfDispPattern / 2; // radius of a circle
        const results = []
        for (let i = 1; i <= numberOfElements; i++) {
            let ang = i * (Math.PI / (numberOfElements / 2));
            let left = cx + (r * Math.cos(ang));
            let top = cy + (r * Math.sin(ang));
            results.push({ top: top, left: left });
        }
        ;
        return results
    }
    const res = findPointOnCircle(6, wp('65%'), 0);
    const positioning = (index) => ({ position: 'absolute', top: res[index].top, left: res[index].left })
    const DisplayVertical = (props) => {

        return (<View name={'transparentContainer'}
            style={{
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                width: wp('98%'), height: wp('99%'),
                borderRadius: wp('98%'),
                borderWidth: wp('1%'), borderColor: 'white',
                position: 'relative',
                backgroundColor: 'transparent'
            }}>
            <View name={'whiteFirstHalf'} style={{
                borderTopLeftRadius: wp('99%'),
                borderBottomLeftRadius: wp('99%'),
                width: wp('49%'), height: wp('99%'),
                justifyContent: 'center', alignItems: 'center',
                position: 'absolute', left: -wp('1%'),
                backgroundColor: 'white',
            }} />
            <View name={'whiteCircle'} style={{
                alignSelf: 'center',
                justifyContent: 'center', alignItems: 'center',
                width: wp('49%'), height: wp('49%'),
                borderRadius: wp('49%'),
                backgroundColor: 'white'
            }} />
            <LinearGradient name={'gradientCircle'}
                start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
                colors={['#602b46', '#752e4e']}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center',
                    width: wp('49%'), height: wp('49%'),
                    borderRadius: wp('49%'),
                    marginBottom: wp('1%')
                }} />
            {props.children}
        </View >

        )
    }

    const rememberStartedProgram = (number) => onSetInControlsScreen({ activeProgram: number, lastStartedProgram: number })

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
            colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GR_INTERMED_II, theme.GRADIENT_LIGHT]}
            style={[wrapperStyle, {}]}>
            {loading
                ? <DisplayVertical >
                    <View name={'buttonsWrapper'} style={{
                        alignSelf: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center',
                        flex: 1,
                        borderRadius: wp('100%'),
                        width: '100%', height: '100%',
                        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                        transform: [{ rotate: '0deg' }],
                        // backgroundColor: 'green'

                    }} onLayout={(event) => {
                        var { x, y, width, height } = event.nativeEvent.layout;
                        //  setDim({ x: x, y: y, width: width, height: height })
                        console.log({ x: x, y: y, width: width, height: height })
                    }}>
                        <RoundPressable label={'P1'}
                            isActive={activeProgram == 1}
                            onPress={() => { rememberStartedProgram(1); }}
                            style={{ ...leftAngledPositionOnCircle(90, (wp('100%')) * 0.70, -wp(8)) }} />
                        <RoundPressable label={'P2'}
                            isActive={activeProgram == 2}
                            onPress={() => { rememberStartedProgram(2) }}
                            style={{ ...leftAngledPositionOnCircle(45, (wp('100%')) * 0.75, -wp(8)) }} />
                        <RoundPressable label={'P3'}
                            isActive={activeProgram == 3}
                            onPress={() => { rememberStartedProgram(3) }}
                            style={{ ...leftAngledPositionOnCircle(0, (wp('100%')) * 0.75, -wp(6)) }} />

                        <RoundPressable label={'P1'} color={theme.GR_INTERMED_I} textStyle={{ color: theme.EXTRA_BLACK }}
                            isActive={activeProgram == 4}
                            onPress={() => { rememberStartedProgram(4) }}
                            style={{ ...rightAngledPositionOnCircle(270, (wp('100%')) * 0.65, wp(8)) }}
                        />
                        <RoundPressable label={'P2'} color={theme.GRADIEND_MEDIUM} textStyle={{ color: theme.EXTRA_BLACK }}
                            isActive={activeProgram == 5}
                            onPress={() => { rememberStartedProgram(5) }}
                            style={{ ...rightAngledPositionOnCircle(223, (wp('100%')) * 0.77, wp(2)) }} />
                        <RoundPressable label={'P3'} color={theme.GR_INTERMED_II} textStyle={{ color: theme.EXTRA_BLACK }}
                            isActive={activeProgram == 6}
                            onPress={() => { rememberStartedProgram(6) }}
                            style={{ ...rightAngledPositionOnCircle(170, (wp('100%')) * 0.70, wp(2)) }} />


                        {/* <RoundPressable label={'P1'} style={{ ...positioning(0) }} />
                        <RoundPressable label={'P2'} style={{ ...positioning(1) }} />
                        <RoundPressable label={'P3'} style={{ ...positioning(2) }} />

                        <RoundPressable label={'P4'} style={{ ...positioning(3) }} />
                        <RoundPressable label={'P5'} style={{ ...positioning(4) }} />
                        <RoundPressable label={'P6'} style={{ ...positioning(5) }} /> */}

                    </View>
                </DisplayVertical>
                : <DisplayHorizontal />}

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 10,
                position: 'absolute', bottom: hp('6%'), left: 20, right: 0
            }}>
                {activeProgram == 0
                    ? <RoundPressable label={' '}
                        isActive={activeProgram == 1}
                        onPress={() => { onSetInControlsScreen({ activeProgram: lastStartedProgram == 0 ? 1 : lastStartedProgram }) }}
                        style={triangle} />
                    : <RoundPressable label={' '}
                        isActive={activeProgram == 1}
                        color={theme.TOMATO}
                        onPress={() => { onSetInControlsScreen({ activeProgram: 0, }); }}
                        style={square} />}
            </View>

        </LinearGradient >
    );
}

const styles = StyleSheet.create((theme) => ({
    wrapperStyle: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    triangle: {
        width: 80,
        height: 80,
        borderLeftWidth: 80,
        borderBottomWidth: 40,
        borderTopWidth: 40,

        borderLeftColor: theme.GREEN,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',


        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderRadius: 2,
        // transform: [{rotate: '90deg' }]
    },
    square: {
        width: 60,
        height: 60,
        backgroundColor: theme.TOMATO,
        borderRadius: 2,
    },

}));
const mapStateToProps = (store) => {
    const { controlsScreen: { lastStartedProgram, activeProgram } } = store.appReducer;
    const { theme, } = store.appReducer;
    return {
        theme, lastStartedProgram, activeProgram
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetInControlsScreen: (options) => dispatch(setInControlsScreen(options))
    }
};
AppRegistry.registerComponent('ScoreScreen', () => ControlsScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ControlsScreen);