import React, { useState, useMemo } from 'react';
import { View, Text, PanResponder, } from 'react-native';
type StateType = {
    barHeight: number | null,
    deltaValue: number,
    value: number
};

const initialValue = 0;
const min = 0;
const max = 100;
const CIRCLE_DIAMETER = 50;

const Slider = props => {
    state = {
        barHeight: null,
        deltaValue: 0,
        value: initialValue
    };
    const [barHeight, setBarHeight] = useState(null);
    const [deltaValue, setDeltaValue] = useState(0);
    const [value, setValue] = useState(initialValue);
    const panResponder = useMemo(() => PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (_, gestureState) => onMove(gestureState),
        onPanResponderRelease: () => onEndMove(),
        onPanResponderTerminate: () => { }
    }), []);
    const onMove = (gestureState) => {
        const newDeltaValue = getValueFromBottomOffset(-gestureState.dy, barHeight, min, max);
        setDeltaValue(newDeltaValue);
    }
    const onEndMove = () => {
        setValue(value + deltaValue);
        setDeltaValue(0);
    }
    const onBarLayout = (event) => {
        const { height: barHeight } = event.nativeEvent.layout;
        setBarHeight(barHeight);
    };
    const capValueWithinRange = (value, range) => {
        if (value < range[0]) return range[0];
        if (value > range[1]) return range[1];
        return value;
    };
    const getValueFromBottomOffset = (offset, barHeight, rangeMin, rangeMax) => {
        if (barHeight === null) return 0;
        return ((rangeMax - rangeMin) * offset) / barHeight;
    };
    const getBottomOffsetFromValue = (value, rangeMin, rangeMax, barHeight) => {
        if (barHeight === null) return 0;
        const valueOffset = value - rangeMin;
        const totalRange = rangeMax - rangeMin;
        const percentage = valueOffset / totalRange;
        return barHeight * percentage;
    };
    const cappedValue = capValueWithinRange(value + deltaValue, [min, max]);
    const bottomOffset = getBottomOffsetFromValue(cappedValue, min, max, barHeight);
    return (
        <View style={{ backgroundColor: 'black', flexGrow: 1, alignSelf: 'stretch', alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ color: 'white' }}>{Math.floor(cappedValue)}</Text>
            <View style={{ flexGrow: 1, alignSelf: 'stretch', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ width: CIRCLE_DIAMETER, alignItems: 'center', paddingVertical: CIRCLE_DIAMETER / 2, marginHorizontal: 20 }}>
                    <View onLayout={onBarLayout} style={{ width: 2, backgroundColor: 'white', flexGrow: 1 }} />
                    <View style={{ zIndex: 3, borderRadius: CIRCLE_DIAMETER / 2, width: CIRCLE_DIAMETER, height: CIRCLE_DIAMETER, backgroundColor: 'white', position: 'absolute', bottom: bottomOffset }}
                        {...panResponder.panHandlers}
                    />
                </View>
            </View>
        </View >
    );
}
export { Slider };