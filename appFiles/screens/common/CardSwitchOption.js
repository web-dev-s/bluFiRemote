import React, { useState, memo, useMemo, useEffect } from 'react';
import { connect } from "react-redux";
import { Image, StyleSheet, View, Text, AppRegistry, Switch } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { fontSize, font, } from '../../helper/themeHelper';
import { SwitcherClassic, Switcher } from '../common/Switcher';
import { ShadowCard } from '../common/ShadowedCard';

const CardSwitchOptionComp = props => {
    const { theme, title, description, initialValue, onSwitching } = props;

    return (<ShadowCard style={{ padding: 10, margin: 10 }}>
        < View
            style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'stretch', marginVertical: 2 }}>
            <Text style={{ fontSize: fontSize.N18, color: theme.MAIN, fontFamily: font.nunitoBold }}>{title}</Text>
            <View style={[{
                flexDirection: 'row',
                flex: 0, position: 'relative', marginTop: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                paddingRight: 0,
            }]}>
                <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'flex-start', color: theme.LIGHT_DELIMITER || theme.MAIN, fontSize: fontSize.N12, }}
                        numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{description}</Text>

                </View>
                <View style={{ flex: 1, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', }}>
                    <SwitcherClassic
                        initialValue={initialValue} height={25} width={50}
                        borderColor={{ onColor: theme.ACCENT, offColor: theme.DISABLED }}
                        //  externalPressed={modificaSetariExt}
                        whenIsOn={() => { if ('switchTouched') { } }}
                        onSwitch={onSwitching} />
                </View>
            </View>
        </View >
    </ShadowCard>)
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const CardSwitchOption = connect(mapStateToProps, null)(CardSwitchOptionComp);
export const RenderSwitchOptionComp = props => {
    const { theme, title, description, initialValue, onSwitching } = props;

    return (<View
        style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'stretch', marginVertical: 2 }}>
        <Text style={{ fontSize: fontSize.N18, color: theme.MAIN, fontFamily: font.nunitoBold }}>{title}</Text>
        <View style={[{
            flexDirection: 'row',
            flex: 0, position: 'relative', marginTop: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center',
            paddingRight: 0,
        }]}>
            <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ alignSelf: 'flex-start', color: theme.LIGHT_DELIMITER || theme.MAIN, fontSize: fontSize.N12, }}
                    numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{description}</Text>

            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', }}>
                <SwitcherClassic initialValue={initialValue} height={25} width={50} borderColor={{ onColor: theme.ACCENT, offColor: theme.DISABLED }}
                    //  externalPressed={modificaSetariExt}
                    whenIsOn={() => { if ('switchTouched') { } }}
                    onSwitch={onSwitching} />
            </View>
        </View>
    </View>
    )
}
const mapStateToProps1 = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const RenderSwitchOption = connect(mapStateToProps1, null)(RenderSwitchOptionComp);
const RenderSwitchOptionModComp = props => {
    const { theme, title, description, initialValue, onSwitching } = props;
    return (< View
        style={{
            flex: 1, marginHorizontal: '2%', justifyContent: 'center',
            alignItems: 'stretch', marginVertical: 2,
            padding: 0
        }

        }>
        <Text style={{ fontSize: fontSize.N18, color: theme.MAIN, fontFamily: font.nunitoBold }}>{title}</Text>
        <View style={[{
            flexDirection: 'row',
            flex: 0, position: 'relative',
            marginTop: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center',
            paddingRight: 0,
        }]}>
            <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ alignSelf: 'flex-start', color: theme.LIGHT_DELIMITER || theme.MAIN, fontSize: fontSize.N12, }}
                    numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{description}</Text>

            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', }}>
                <Switcher initialValue={initialValue}
                    height={25} width={50} borderColor={{ onColor: theme.ACCENT, offColor: theme.DISABLED }}

                    //  externalPressed={modificaSetariExt}
                    whenIsOn={() => { if ('switchTouched') { } }}
                    onSwitch={onSwitching} />

            </View>
        </View>
    </View >)
}
const mapStateToProps2 = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const RenderSwitchOptionMod = connect(mapStateToProps2, null)(RenderSwitchOptionModComp);
export { CardSwitchOption, RenderSwitchOption, RenderSwitchOptionMod }