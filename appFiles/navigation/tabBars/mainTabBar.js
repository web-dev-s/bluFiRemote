import React, { useState, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, Linking, View, Text, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { logJson, hasNotch, font, fontSize, isIOS, shadowStyle } from "../../helper/themeHelper";
import { hp, wp } from '../../helper/responsiveScreen';
import imgAsset from '../../assets/images';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { connect } from 'react-redux';
import LoadingModal from '../../screens/common/modalComponents/LoadingModal';
import LinearGradient from 'react-native-linear-gradient';


const MainTabBar = ({ state, descriptors, navigation, ...props }) => {
    const images = [imgAsset['controls'], imgAsset['settings'], imgAsset['statistics'], imgAsset['system']]

    const { theme, pendingMessages } = props;
    const whiteEntries = [/* 'HubScreen', */ 'ChatScreen', 'MenuScreen'];
    const [backgroundColor, setBackgroundColor] = useState(theme.BLUR);
    const [selected, setSelected] = useState('');
    const efC = (type, value) => {
        switch (type) {
            case 'setBackgroundColor': return setBackgroundColor(value);

            default: return;
        }
    }
    useEffect(() => {
        efC('setBackgroundColor', whiteEntries.indexOf(selected) > -1 ? theme.WHITE : isIOS ? theme.DISABLED : theme.BLUR)
    }, [selected]);

    return (

        <LinearGradient
            start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
            colors={['#302335', '#4e283f', '#732c4f', '#8d3156']}

            style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, flex: 0, width: wp('100%'),
                paddingBottom: hasNotch ? 25 : 0, height: hasNotch ? 73 : 48,
                flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
        /*   borderTopWidth: wp(0.1), borderTopColor: theme.MAIN,  */ backgroundColor: backgroundColor, blurRadius: 90,
                elevation: whiteEntries.indexOf(selected) > -1 ? 28 : 0.1, shadowColor: theme.LIGHTER_DELIMITER,
                shadowOffset: { width: 3, height: 8 }, shadowOpacity: 0.5, shadowRadius: 5,
            }} blurRadius={5}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                if (!options.tabBarLabel) { return }
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true, });
                    if (!isFocused && !event.defaultPrevented) { navigation.navigate(route.name); setSelected(route.name) }
                };
                const onLongPress = () => { navigation.emit({ type: 'tabLongPress', target: route.key, }); };
                return (
                    <TouchableOpacity key={index} accessibilityRole="button" accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: theme.TRANSPARENT, marginHorizontal: wp(2), borderRadius: wp(2), padding: wp(2) }}
                    >
                        <View style={{ width: 20, height: 20, opacity: isFocused ? 1 : 0.5, justifyContent: 'center', alignItems: 'center', }}                        >
                            <Image source={images[index]}
                                style={{
                                    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                                    // tintColor: isFocused
                                    //     ? (backgroundColor == theme.WHITE ? theme.MAIN : theme.WHITE)
                                    //     : (backgroundColor == theme.WHITE ? theme.PARAGRAPH_HEADERS_ICONS : theme.WHITE),
                                    width: 20, height: 20, opacity: isFocused ? 1 : 0.5,
                                    justifyContent: 'center', alignItems: 'center', resizeMode: 'stretch'
                                }}
                                resizeMode={'stretch'}
                            // tintColor={isFocused
                            //     ? (backgroundColor == theme.WHITE ? theme.MAIN : theme.WHITE)
                            //     : (backgroundColor == theme.WHITE ? theme.PARAGRAPH_HEADERS_ICONS : theme.WHITE)
                            // }
                            ></Image >
                        </View>

                        {isFocused && <Text style={{
                            color: (backgroundColor == theme.WHITE ? theme.MAIN : theme.WHITE),
                            textAlign: 'center', fontSize: fontSize.N12,
                            fontFamily: font.nunitoBold, fontWeight: '900', marginVertical: wp(0)
                        }}>
                            {label}
                        </Text>}
                    </TouchableOpacity>
                );
            })}
            <LoadingModal />
        </LinearGradient>


    );
}

const mapStateToProps = (store) => {
    const { theme } = store.appReducer;
    return { theme, };
};
const mapDispatchToProps = (dispatch) => {
    return {


    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainTabBar);

