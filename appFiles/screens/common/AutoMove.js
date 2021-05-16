import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Animated, TouchableOpacity, Text, View, StyleSheet, PanResponder, ImageBackground } from 'react-native';
import imgAsset from '../../assets/images';
import { wp, hp } from '../../helper/responsiveScreen';
import { screenHeight, screenWidth, color, fontSize, font, isIOS } from '../../helper/themeHelper';
const Height = '100%';
const Width = screenWidth;
const TriggerVDelta = hp('15%');
const AutoMove = props => {
    const scrollX = new Animated.Value(0);
    const moveAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [transform, setTransform] = useState([]);
    const pan = useRef(new Animated.ValueXY());

    //-----------View gesture handlers------
    const handleResponderStart = useCallback((ev) => { console.log('-----handleResponderStart:', ev.nativeEvent.locationY); });
    const handleResponderMove = useCallback((ev) => {
        // console.log('-----handleResponderMove:', ev.nativeEvent.locationY);
    });
    const handleResponderRelease = useCallback((ev) => {
        console.log('-----handleResponderRelease:', ev.nativeEvent.pageY);        //setMoveEnd(ev.nativeEvent.pageY);
    })
    const onResponderGrant = useCallback((ev) => {
        console.log('-----onResponderGrant:');       // setMoveStart(ev.nativeEvent.pageY)
    })
    //-----------View gesture handlers------

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
            pan.current.setOffset({ x: 0 /* pan.current.x._value, */, y: pan.current.y._value });
            pan.current.setValue({ x: 0, y: 0 });
            if (gestureState.vy < 0) {
                setTransform([{ scale: 0.95 }, { perspective: 650 }, { rotateX: '60deg' }]);
            }
            if (gestureState.vy > 0) {
                setTransform([{ scale: 0.95 }, { perspective: 650 }, { rotateX: '-60deg' }]);
            }
        },
        onPanResponderMove: Animated.event([null, { dx: new Animated.Value(0), dy: pan.current.y }],
            { listener: handleResponderMove }),
        onPanResponderRelease: (e, gesture) => {
            //  setMoveEnd(e.nativeEvent.pageY);
            // Animated.timing(pan.current, {
            //     toValue: { x: 0 /*- pan.current.x._offset */, y: 0 - pan.current.y._offset },
            //     duration: 1,
            // }
            // ).start(() => {

            // });
            // pan.current.flattenOffset()
        },
        onPanResponderTerminate: (e, gestureState) => {
            // console.log('-----onPanResponderTerminate:');
        },
        onPanResponderEnd: (e, gestureState) => {
            //console.log('-----onPanResponderEnd:');
            const resetToInitial = () => {
                pan.current.setValue({ x: 0, y: 0 })
                pan.current.setOffset({ x: 0, y: 0 });
                setTransform([]);
            }
            if (Math.abs(gestureState.dy) < TriggerVDelta) { resetToInitial() }
            else if (gestureState.dy < 0 && gestureState.dy < -TriggerVDelta) {
                //   console.log('SlidedUP toTOP', Math.abs(Math.round(gestureState.dy)));
                setTransform([{ scale: 0.95 }, { perspective: 650 }, { rotateX: '60deg' },/*  { translateY: - screenHeight }, { translateX: -wp(0) } */]);
                Animated.timing(pan.current, { toValue: { x: 0, y: -screenHeight }, duration: 300, })
                    .start(() => { props.onMatchChanged(true); resetToInitial(); })
            }
            else if (gestureState.dy > 0 && gestureState.dy > TriggerVDelta) {
                //  console.log('SlidedDOWN toBOTTOM', Math.abs(Math.round(gestureState.dy)));
                setTransform([{ scale: 0.95 }, { perspective: 650 }, { rotateX: '-60deg' }, /* { translateX: -wp(0) }, { translateY: screenHeight } */]);
                Animated.timing(pan.current, { toValue: { x: 0, y: screenHeight }, duration: 300, })
                    .start(() => { props.onMatchChanged(false); resetToInitial(); })
            }
        },
        // onPanResponderTerminationRequest: (e, gestureState) => { console.log('-----onPanResponderTerminationRequest:'); },
        // onShouldBlockNativeResponder: (e, gestureState) => { console.log('-----onShouldBlockNativeResponder:');return false },
    }), [props.onMatchChanged]);

    const { container, mainContainer, draggableElement } = styles;
    return (
        <View style={[container, mainContainer]} >
            <Animated.View style={[moveAnimation.getLayout(),/*  { transform: transform } */]}                {...panResponder.panHandlers}            >
                <View style={[styles.draggableContainer,/*  { transform: transform } */]}>
                    <Animated.View style={[pan.current.getLayout(), draggableElement,]}                        {...panResponder.panHandlers}                    >
                        <ImageBackground style={{ justifyContent: 'center', alignItems: 'stretch', zIndex: 1, height: '100%', width: '100%', margin: wp(0), resizeMode: 'stretch' }}
                            resizeMode={'stretch'}
                            source={props.image}
                        >
                            <TouchableOpacity style={{ flex: 1, backgroundColor: 'transparent' }} onPress={useCallback(() => { props.onPress() })} />
                        </ImageBackground >
                    </Animated.View>
                </View>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, /* position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, */
        alignSelf: 'center', alignItems: 'center',/*  paddingHorizontal: wp(2) */
    },
    mainContainer: {
        flex: 1,/*  paddingHorizontal: wp(2), */
        width: '100%', height: '100%', position: 'relative', justifyContent: 'space-between',
    },

    draggableElement: {
        backgroundColor: color.mainGrayTransparent,
        width: Width,
        height: Height,
        //   borderRadius: Width / 25,
        zIndex: 1
    }

});
export { AutoMove }