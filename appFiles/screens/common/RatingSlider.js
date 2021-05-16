
import React, { useRef, useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { modalClose, modalOpen } from '../../reduxStore/actions/modalAction';
import { View, Text, PanResponder, StyleSheet, Animated } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { screenWidth, color, fontSize, font, isIOS } from '../../helper/themeHelper';
import imgAsset from '../../assets/images';

const ratings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const paddingY = wp(3);
const paddingX = wp(2);

const getCurrentArrayIndex = (length, heightRange) => (positionY) => {
    const realHeight = heightRange - (2 * paddingY);
    const currentIndex = Math.floor(positionY / (realHeight / length));
    return currentIndex;
}
const getValueInRange = (min, max) => (value) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}
const getCurrentPosition = (length, index) => (heightRange) => {
    const realHeight = heightRange - (2 * paddingY);
    return Math.floor(index * (realHeight / length) + 1)
}
const RatingSliderComponent = (props) => {
    const { theme } = props;
    const CIRCLE_DIAMETER = props.CIRCLE_DIAMETER || wp(20);
    const ratingValues = ratings.slice(0).reverse();
    //---------------------------------------------
    const [isInitial, setIsInitial] = useState(true);
    const [slideVisible, setSlideVisible] = useState(false);
    const [slideYPos, setSlideYPos] = useState(0);
    const [barHeight, setBarHeight] = useState(0);

    const getIndexFromPosition = useCallback(getCurrentArrayIndex(ratingValues.length, barHeight), [barHeight]); // reactive completion alocate first 2 parameters
    const getSliderYPos = useCallback(getValueInRange((CIRCLE_DIAMETER / 2 - paddingY), barHeight - (paddingY)), [barHeight]);// reactive completion alocate first 2 parameters
    const getPositionFromIndex = useCallback(getCurrentPosition(ratingValues.length, ratingValues.indexOf(props.initialValue)), [ratingValues, props.initialValue])

    const panResponder = React.useMemo(() =>
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderStart: (evt, gestureState) => handlePanResponderGrant(evt, gestureState),
            onPanResponderGrant: (evt, gestureState) => handlePanResponderGrant(evt, gestureState),
            onPanResponderMove: (evt, gestureState) => handlePanResponderMove(evt, gestureState),
            onPanResponderRelease: (evt, gestureState) => handlePanResponderRelease(evt, gestureState),
        }), [getSliderYPos, barHeight, props.onRatingChanged, slideYPos, getIndexFromPosition]);

    const settingSliderYPosition = () => setSlideYPos(getPositionFromIndex(barHeight));
    const settingIsInitial = (value) => { setIsInitial(value) }
    useEffect(() => { settingSliderYPosition(); }, [props.initialValue])
    useEffect(() => { if (barHeight > 0 && isInitial) { settingSliderYPosition(); settingIsInitial(false); } }, [barHeight, isInitial]);
    const handlePanResponderGrant = useCallback((e, gestureState) => {
        const locationY = e.nativeEvent.locationY;
        setSlideYPos(getSliderYPos(locationY));
        setSlideVisible(true);
    }, [getSliderYPos]);

    const handlePanResponderMove = useCallback((e, gestureState) => {
        setSlideYPos(c => {
            const newSliderYPos = c + gestureState.dy;
            if (newSliderYPos > 0 && newSliderYPos < barHeight - (CIRCLE_DIAMETER / 2)) { return c + gestureState.dy }
            else { return c }
        })
    }, [barHeight]);

    const handlePanResponderRelease = useCallback((e, gestureState) => {
        setSlideVisible(false);
        if (props.onRatingChanged) { props.onRatingChanged(ratingValues[getIndexFromPosition(slideYPos)]); }
    }, [props.onRatingChanged, slideYPos, getIndexFromPosition])
    const onBarLayout = useCallback((event) => {
        const { height } = event.nativeEvent.layout;
        setBarHeight(height);
    }, []);

    return (<View style={[{
        position: 'relative', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.TRANSPARENT,
        zIndex: props.zIndex || 0, width: CIRCLE_DIAMETER + paddingX,
    }, props.containerStyle && props.containerStyle]}>
        <View style={{
            flexGrow: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        }}>
            <View style={{
                justifyContent: 'center', alignItems: 'center', backgroundColor: theme.TRANSPARENT,
                width: CIRCLE_DIAMETER + paddingX,
                paddingVertical: wp(1), zIndex: 1,
            }}>
                <View style={{
                    justifyContent: 'center', alignItems: 'center', backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                    width: (CIRCLE_DIAMETER / 3) + paddingX,
                    borderRadius: (CIRCLE_DIAMETER / 2), flexGrow: 1,
                    paddingVertical: paddingY,

                    /*  elevation: 10,
                     shadowColor: isIOS ? "#000" : 'black',
                     shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.32, shadowRadius: 5, */

                }}
                    onLayout={(event) => onBarLayout(event)}
                >
                    {ratingValues.map((item, index) => {
                        if (getIndexFromPosition(slideYPos) === index) {
                            const borderColor = slideVisible ? theme.TRANSPARENT : theme.ACCENT;
                            const textColor = slideVisible ? theme.TRANSPARENT : theme.WHITE;
                            const backgroundColor = slideVisible ? theme.TRANSPARENT : theme.ACCENT;
                            const diameter = CIRCLE_DIAMETER;
                            return (
                                <View
                                    key={index}
                                    style={{
                                        justifyContent: 'center', alignItems: 'center',
                                        width: diameter,
                                        height: diameter,
                                        borderRadius: diameter / 2,
                                        borderWidth: wp(2.5),
                                        borderColor: slideVisible ? theme.TRANSPARENT : theme.PRIMARY_BACKGROUND_COLOR,
                                    }}>
                                    <View style={{
                                        justifyContent: 'center', alignItems: 'center',
                                        width: diameter - wp(5),
                                        height: diameter - wp(5),
                                        borderRadius: (diameter / 2) - wp(2.5),
                                        borderWidth: wp(1.5),
                                        borderColor: borderColor,
                                        backgroundColor: backgroundColor,
                                    }}>
                                        <Text style={{ fontSize: fontSize.N36, fontFamily: font.nunitoExtraBold, color: textColor, textAlign: 'center' }}
                                        >{item}</Text>
                                        {/*  <Image source={digits[getIndexFromPosition(slideYPos)]}
                                        style={{ height: wp(10), width: wp(10), alignSelf: 'center', }}
                                        resizeMode={'contain'}
                                    /> */}
                                    </View>
                                </View>)
                        }
                        return (<View key={index} style={{
                            width: '100%', paddingVertical: wp(1),

                        }}
                        >
                            <Text style={{ fontSize: fontSize.N22, fontFamily: font.nunitoExtraBold, color: theme.PARAGRAPH_HEADERS_ICONS, textAlign: 'center' }}
                            >{item}</Text>
                            {/* <Image source={digits[getIndexFromPosition(slideYPos)]}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', }}
                                resizeMode={'contain'}
                            /> */}
                        </View>)
                    })}
                </View>
                {slideVisible && <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: theme.MAIN,
                    borderColor: theme.PRIMARY_BACKGROUND_COLOR,
                    width: CIRCLE_DIAMETER,
                    height: CIRCLE_DIAMETER,
                    borderRadius: (CIRCLE_DIAMETER / 2),
                    borderWidth: wp(2.5),
                    zIndex: 2,
                    position: 'absolute',
                    top: getIndexFromPosition(slideYPos) < 6 ? (slideYPos - (CIRCLE_DIAMETER / 2 - (2 * paddingY))) : (slideYPos - (CIRCLE_DIAMETER / 2 - paddingY)),
                }}>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: theme.ACCENT,
                        borderColor: theme.ACCENT,
                        width: CIRCLE_DIAMETER - wp(5),
                        height: CIRCLE_DIAMETER - wp(5),
                        borderRadius: (CIRCLE_DIAMETER / 2) - wp(2.5),
                        borderWidth: wp(1.5),
                    }}>
                        <Text style={{ fontSize: fontSize.N36, fontFamily: font.nunitoExtraBold, color: theme.PRIMARY_BACKGROUND_COLOR, textAlign: 'center' }}
                        >{ratingValues[getIndexFromPosition(slideYPos)]}</Text>
                        {/* <Image source={digits[getIndexFromPosition(slideYPos)]}
                        style={{ height: wp(10), width: wp(10), alignSelf: 'center', }}
                        resizeMode={'contain'}
                    /> */}
                    </View>
                </View>
                }
            </View>
        </View>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1999 }}
            {...panResponder.panHandlers}
        >
        </View>
    </View >
    );
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { isOpen, options } = store.modalReducer;
    return { isOpen, options, theme };
};
const mapDispatchToProps = (dispatch) => {
    return {
        reducerOpenModal: (actionType, navigation) => dispatch(modalOpen({ isOpen: true, options: {} })),
        reducerCloseModal: (actionType, navigation) => dispatch(modalClose())
    }
};
const RatingSlider = connect(mapStateToProps, mapDispatchToProps)(RatingSliderComponent);

export { RatingSlider };