

import React, { useState, memo, useMemo, useEffect } from 'react';
import { connect } from "react-redux";
import { Image, StyleSheet, View, Text, AppRegistry, Switch } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { fontSize, font, } from '../../helper/themeHelper';
import { SwitcherClassic, Switcher } from '../common/Switcher';
import { ShadowCard } from '../common/ShadowedCard';
import Slider from "react-native-slider";

const HorizontalSliderComp = memo((props) => {
    const { theme, initialVal, minVal, maxVal, width, intervalHide, onSlidingComplete } = props
    const [value, setValue] = useState(initialVal ?? minVal ?? 0)
    return <View style={{ /* flex: 3, */ position: 'relative',/*  alignItems: 'center', */ width: width }}>
        <View style={{ position: 'absolute', top: 12, left: 0, width: 16, height: 16, borderRadius: 8, backgroundColor: theme.MAIN }} />
        <View style={{ position: 'absolute', top: 16, right: 0, width: 8, height: 8, borderRadius: 8, backgroundColor: theme.DISABLED }} />
        <Slider
            value={value}
            onValueChange={value => { setValue(value) }}
            onSlidingComplete={value => { onSlidingComplete(value) }}
            minimumValue={minVal}
            maximumValue={maxVal}
            minimumTrackTintColor={theme.MAIN}
            maximumTrackTintColor={theme.DISABLED}
            step={1}
            style={{ width: '100%', }}
            trackStyle={{ height: 2, width: '100%' }}
            thumbStyle={{ width: 24, height: 24, borderRadius: 12, borderWidth: 6, borderColor: theme.MAIN, backgroundColor: theme.WHITE }}
            animateTransitions={true}
        />
        <View style={{ position: 'relative', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ paddingLeft: 4, fontFamily: font.nunitoBold, fontSize: fontSize.N16, color: theme.MAIN }}
                >{+(value - minVal) > intervalHide ? minVal : ''}</Text>
                <Text style={{ fontFamily: font.nunitoBold, fontSize: fontSize.N16, color: theme.DISABLED }}
                >{+value < maxVal - intervalHide ? maxVal : ''}</Text>
            </View>
            <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    marginLeft: value < maxVal / 2
                        ? (value - minVal) * ((width - 24) / maxVal)
                        : (value) * ((width - 24) / maxVal)
                        || 0,
                    marginRight: -15, fontFamily: font.nunitoBold, fontSize: fontSize.N16, color: theme.MAIN
                }}
                >{+value >= 1 ? value <= maxVal ? value : '' : ''}</Text>
            </View>
        </View>
    </View>
}, (prevProps, nextProps) => prevProps?.items === nextProps?.items)
const mapStateToProps0 = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const HorizontalSlider = connect(mapStateToProps0, null)(HorizontalSliderComp);
const RenderSliderOptionComp = memo(props => {
    const { theme, title, description, minVal, maxVal, initialVal, radiusValue, intervalHide, sliderWidth, onSlideEnd } = props;
    return (< View
        style={{
            flex: 1, marginHorizontal: '2%', justifyContent: 'center',
            alignItems: 'stretch', marginVertical: 2
        }
        }>
        <Text style={{ fontSize: fontSize.N18, color: theme.MAIN, fontFamily: font.nunitoBold }}>{title}</Text>
        <View style={[{
            flexDirection: 'column',
            flex: 0, position: 'relative', marginTop: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center',
            paddingRight: 0,
        }]}>
            <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ alignSelf: 'flex-start', color: theme.LIGHT_DELIMITER || theme.MAIN, fontSize: fontSize.N12, }}
                    numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{description}</Text>

            </View>
            <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                <HorizontalSlider
                    width={sliderWidth ?? wp('90%')}
                    minVal={minVal}
                    maxVal={maxVal}
                    initialVal={initialVal}
                    intervalHide={intervalHide}
                    radiusValue={radiusValue}
                    onSlidingComplete={onSlideEnd} />
            </View>
        </View>
    </View >)
}, (prevProps, nextProps) => prevProps?.items === nextProps?.items)
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const RenderSliderOption = connect(mapStateToProps, null)(RenderSliderOptionComp);

const CardSliderOptionComp = memo(props => {
    const { theme, title, description, minVal, maxVal, initialVal, radiusValue, intervalHide, sliderWidth, onSlideEnd } = props;
    return (<ShadowCard style={{ padding: 10, margin: 10 }}>
        <View
            style={{
                flex: 1, marginHorizontal: '2%', justifyContent: 'center',
                alignItems: 'stretch', marginVertical: 2
            }
            }>
            <Text style={{ fontSize: fontSize.N18, color: theme.MAIN, fontFamily: font.nunitoBold }}>{title}</Text>
            <View style={[{
                flexDirection: 'column',
                flex: 0, position: 'relative', marginTop: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                paddingRight: 0,
            }]}>
                <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'flex-start', color: theme.LIGHT_DELIMITER || theme.MAIN, fontSize: fontSize.N12, }}
                        numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{description}</Text>

                </View>
                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <HorizontalSlider
                        width={sliderWidth ?? wp('90%')}
                        minVal={minVal}
                        maxVal={maxVal}
                        initialVal={initialVal}
                        intervalHide={intervalHide}
                        radiusValue={radiusValue}
                        onSlidingComplete={onSlideEnd} />
                </View>
            </View>
        </View >
    </ShadowCard>)
}, (prevProps, nextProps) => prevProps?.items === nextProps?.items)
const mapStateToProps1 = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const CardSliderOption = connect(mapStateToProps1, null)(CardSliderOptionComp);
export { CardSliderOption, RenderSliderOption }