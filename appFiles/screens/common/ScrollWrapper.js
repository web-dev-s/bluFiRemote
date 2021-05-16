import React, { useState, useRef, useCallback, useEffect, } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Animated, } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { color, } from '../../helper/themeHelper';


const hSWWidth = wp('46%');
const pSWWidth = wp('100%') - 30;
const ScrollWrapper = ({ route, ...props }) => {
    const pSWRef = useRef();
    const scrollX2 = new Animated.Value(0);
    const { theme, screens, selectedIndexChanged, nextScreen,
        contentContainerStyle, scrollMarksContainer } = props;
    const [selectedScreen, setSelectedScreen] = useState(0);
    const selectedIndex = useRef(0); //used for not trigger unnecessary renders 

    useEffect(() => { if (+selectedScreen > -1) { selectedIndexChanged(selectedScreen) } }, [selectedScreen]);
    useEffect(() => { goToIndex(+nextScreen.next); }, [nextScreen]);
    const goToIndex = (elementIndex) => {
        if (pSWRef.current) { pSWRef.current.scrollTo({ x: elementIndex * pSWWidth, y: 0, animated: true }); setSelectedScreen(elementIndex); }
    }
    const onScroll = useCallback((e, emitter) => {
        let x = e.nativeEvent.contentOffset.x;
        if (x == 0) return;
        let cardIndex = 0;
        switch (emitter) {
            case 'page': { cardIndex = Math.abs(Math.round(x / pSWWidth)); } break;
            default: break;
        }
        selectedIndex.current = cardIndex;
    }, [selectedIndex]);
    const onScrollEnd = e => { goToIndex(selectedIndex.current) }


    const { wrapperStyle, } = styles(theme);
    const SelectedBullsEye = (props) => (<>
        <View style={{ marginLeft: wp(3), width: wp(8), height: wp(8), borderColor: theme.MAIN, borderWidth: wp(1.5), borderRadius: wp(4), backgroundColor: theme.TRANSPARENT, justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ width: wp(3.25), height: wp(3.25), borderRadius: wp(1.62), backgroundColor: theme.MAIN }} />
        </View>
        {props.index < screens.length - 1 && <View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ position: 'absolute', marginLeft: wp(3), width: ((props.index + 1) * wp(10) / screens.length), height: wp(1), borderColor: theme.MAIN, borderWidth: wp(1), borderRadius: wp(2), backgroundColor: color.white, justifyContent: 'center', alignItems: 'center' }} />
            <View style={{ marginLeft: wp(3), width: wp(10), height: wp(0.5), borderColor: theme.MAIN, borderWidth: wp(0.5), borderRadius: wp(2), backgroundColor: color.white, justifyContent: 'center', alignItems: 'center' }} />
        </View>}
    </>)
    const UnselectedBullsEye = (props) => <TouchableOpacity onPress={useCallback(() => { goToIndex(props.index) }, [props.index])} style={{ width: wp(8), height: wp(8), borderColor: theme.MAIN_LIGHT, borderWidth: wp(1.5), borderRadius: wp(4), backgroundColor: color.transparent, justifyContent: 'center', alignItems: 'center', marginLeft: wp(3) }} />
    return (
        <View style={wrapperStyle}>
            <Animated.ScrollView
                horizontal
                // pagingEnabled
                nestedScrollEnabled={true}
                directionalLockEnabled={true}
                // removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
                scrollsToTop={false}
                scrollEventThrottle={16}
                bounces={false}
                paginated
                style={{ flex: 1, }}
                contentContainerStyle={[{ alignItems: 'center', justifyContent: 'center', marginVertical: 0, paddingVertical: 0 }, contentContainerStyle && contentContainerStyle]}
                ref={pSWRef}
                onScroll={e => Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
                    { listener: onScroll(e, 'page'), useNativeDriver: true },          // Optional async listener
                )}
                onScrollEndDrag={(e) => onScrollEnd(e)}
            >
                {/*  <View style={{ flex: 1, height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}> */}
                {screens.map((item, index) => {
                    return <View key={index}
                        style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    >{item}
                    </View>
                })}
                {/*     </View> */}

            </Animated.ScrollView>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }, scrollMarksContainer && scrollMarksContainer]}>
                {screens.map((item, index) => {
                    if (index == selectedScreen) {
                        return <SelectedBullsEye key={index} index={index} />
                    }
                    else return <UnselectedBullsEye key={index} index={index} />
                })}
            </View>
        </View>
    );
}
const styles = StyleSheet.create((theme) => ({
    wrapperStyle: { backgroundColor: theme.TRANSPARENT, flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
}));

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;

    return { theme, };
};
const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ScrollWrapper);