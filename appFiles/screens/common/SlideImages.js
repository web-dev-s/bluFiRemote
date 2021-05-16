import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Modal, Image, StyleSheet, View, ImageBackground, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Animated, PanResponder, ScrollView } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { screenHeight, screenWidth, color, fontSize, font, isIOS } from '../../helper/themeHelper';
import { AutoMove } from './AutoMove';
import { DropZonesMove } from './DropZonesMove';
import imgAsset from '../../assets/images'
import { ThemeProvider } from '@react-navigation/native';


const SlideImages = (props) => {
    const pictures = (props.source && props.source.length > 0 && [...props.source]) || [imgAsset['defaultbkd'], imgAsset['defaultbkd']]
    const scrollX = new Animated.Value(0);
    const picturesScrollView = useRef(null);

    const containerWidth = props.width || screenWidth;
    const [selectedElement, setSelectedElement] = useState(props.initialValue || 0);//used for sending onPressEvent
    useEffect(() => { goToSpecificIndex(props.selActualIdx); }, [props.selActualIdx]);

    const onScrollEnd = useCallback((e) => {
        let x = e.nativeEvent.contentOffset.x;
        const selected = (Math.round(x / containerWidth));
        if (selected < props.selActualIdx) {
            props.onSelectionChanged(props.selActualIdx - 1);
        }
        else if (selected > props.selActualIdx) {
            props.onSelectionChanged(props.selActualIdx + 1);
        }
        else if (selected === props.selActualIdx && !isIOS) {
            if (props.selActualIdx === 0) {
                props.onSelectionChanged(pictures?.length - 1);
            }
            if (props.selActualIdx === pictures?.length - 1) {
                props.onSelectionChanged(0);
            }
        }
    }, [props.selActualIdx]);

    const goToSpecificIndex = useCallback((elementIndex) => {
        if (picturesScrollView?.current) {
            picturesScrollView.current.scrollTo({
                x: elementIndex * containerWidth,
                y: 0, animated: true, useNativeDriver: true,
            });
        }
    }, [picturesScrollView.current]);

    return (<View style={[{ flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,/*  flexDirection: 'row', */ justifyContent: 'center', alignItems: 'stretch' },
    props.containerStyle && props.containerStyle]}>
        <ImageBackground source={imgAsset['defaultbkd']} style={{ flex: 1, margin: 0, justifyContent: 'center', alignItems: 'stretch', }} resizeMode={'stretch'}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollsToTop={false}
                /*   contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginVertical: hp(0), paddingVertical: hp(0), }} */
                ref={picturesScrollView}
                scrollEventThrottle={10}
                scrollEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true },
                )}
                onMomentumScrollEnd={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { listener: onScrollEnd, useNativeDriver: true },
                )}
                useNativeDriver={true}
            >
                {props.simple
                    ? pictures.map((item, index) => (<ImageBackground key={index}
                        style={{
                            margin: wp(0),
                            width: containerWidth,
                            justifyContent: 'center', alignItems: 'stretch', zIndex: 1,
                            height: '100%',
                            // width: '100%',
                            resizeMode: 'cover',
                            //resizeMode: 'stretch'
                        }}
                        resizeMode={'cover'}
                        // resizeMode={'stretch'}
                        source={item}

                    >
                        <TouchableOpacity style={{ flex: 1, backgroundColor: 'transparent' }} onPress={() => { props?.onPress && props?.onPress() }} />
                    </ImageBackground >))
                    : pictures.map((item, index) => (<TouchableOpacity key={index}
                        style={{
                            margin: wp(0),
                            width: containerWidth, height: '100%',
                            justifyContent: 'center', alignItems: 'stretch', zIndex: 1,
                            backgroundColor: ThemeProvider.TRANSPARENT,
                        }}
                        onPress={() => { setSelectedElement(index); props.onPress && props.onPress() }}
                    >
                        <AutoMove image={item} onMatchChanged={(rated) => props.onMatchChanged(rated)} onPress={props.onPress} />
                    </TouchableOpacity>)
                    )}
            </Animated.ScrollView>
        </ImageBackground>
    </View >
    );
};
var styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'stretch', },

    button: { padding: 8, },
    buttonText: { fontSize: 17, color: "#007AFF" },
    subView: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", }
});
export { SlideImages };