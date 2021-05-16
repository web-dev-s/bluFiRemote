import React, { useRef, useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { View, Text, PanResponder, } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { screenWidth, color, fontSize, font, isIOS } from '../../helper/themeHelper';
import imgAsset from '../../assets/images';

const ratings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const digits2 = [imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate'], imgAsset['emptyPicTemplate']]

const paddingY = wp(3);
const paddingX = wp(2);

const getCurrentArrayIndex = (length, widthRange) => (positionX) => {
    const realWidth = widthRange - (2 * paddingX);
    const currentIndex = Math.floor(positionX / (realWidth / length));
    return currentIndex;
}
const getValueInRange = (min, max) => (value) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}
const getCurrentPosition = (length, index) => (widthRange) => {
    const realWidth = widthRange - (2 * paddingX);
    return Math.floor(index * (realWidth / length) + 1)
}
const HorizontalSliderComponent = props => {
    const { theme } = props;
    const CIRCLE_DIAMETER = props.CIRCLE_DIAMETER || wp(20);
    const ratingValues = ratings.slice(0).reverse();
    //---------------------------------------------
    const [isInitial, setIsInitial] = useState(true);
    const [slideXPos, setSlideXPos] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    const getIndexFromPosition = useCallback(getCurrentArrayIndex(ratingValues.length, barWidth), [barWidth]); // reactive completion alocate first 2 parameters
    const getSliderXPos = useCallback(getValueInRange((CIRCLE_DIAMETER / 2 - paddingY), barWidth - (paddingY)), [barWidth]);// reactive completion alocate first 2 parameters
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
        }), [getSliderXPos, barWidth, props.onRatingChanged, slideXPos, getIndexFromPosition]);
    const settingSlideXPos = () => setSlideXPos(getPositionFromIndex(barWidth));
    const settinfStateIsInitial = data => setIsInitial(data);
    useEffect(() => { settingSlideXPos() }, [props.initialValue])
    useEffect(() => { if (barWidth > 0 && isInitial) { settingSlideXPos(); settinfStateIsInitial(false); } }, [barWidth, isInitial]);
    const handlePanResponderGrant = useCallback((e, gestureState) => {
        const locationX = e.nativeEvent.locationX;
        setSlideXPos(getSliderXPos(locationX));

    }, [getSliderXPos]);

    const handlePanResponderMove = useCallback((e, gestureState) => {
        setSlideXPos(c => {
            const newSliderXPos = c + gestureState.dx;
            if (newSliderXPos > 0 && newSliderXPos < barWidth - (CIRCLE_DIAMETER / 2)) { return c + gestureState.dx }
            else { return c }
        })
    }, [barWidth]);

    const handlePanResponderRelease = useCallback((e, gestureState) => {

        if (props.onRatingChanged) { props.onRatingChanged(ratingValues[getIndexFromPosition(slideXPos)]); }
    }, [props.onRatingChanged, slideXPos, getIndexFromPosition])
    const onBarLayout = useCallback((event) => {
        const { width } = event.nativeEvent.layout;
        setBarWidth(width);
    }, []);

    return (<View style={[{
        position: 'relative', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.TRANSPARENT,
        zIndex: props.zIndex || 0, height: CIRCLE_DIAMETER + paddingX,
    }, props.containerStyle && props.containerStyle]}>

        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1999 }}
            {...panResponder.panHandlers}
        >
        </View>
    </View >
    );
}
const mapStateToProps = (store) => {
    const { TOKEN } = store.userReducer;
    const { theme, } = store.appReducer;
    return { TOKEN, theme };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetail: (gender) => dispatch(updateUserDetail(gender)),
    }
};
const HorizontalSlider = connect(mapStateToProps, mapDispatchToProps)(HorizontalSliderComponent);
export { HorizontalSlider };