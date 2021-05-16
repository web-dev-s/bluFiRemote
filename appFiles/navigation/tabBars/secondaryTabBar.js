import React, { useState, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, Linking, View, Text, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { hasNotch, font, fontSize, isIOS, shadowStyle } from "../../helper/themeHelper";
import { hp, wp } from '../../helper/responsiveScreen';
import imgAsset from '../../assets/images';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { connect } from 'react-redux';
import { setChatPusherEnabled } from '../../reduxStore/actions/userActions';
import LoadingModal from '../../screens/common/modalComponents/LoadingModal';

const SecondaryTabBarMenu = ({ state, descriptors, navigation, ...props }) => {
    const images = [imgAsset['okHand'], imgAsset['hearts'],/*  imgAsset['videos'], */ imgAsset['chat'], imgAsset['drawer'],]


    const { theme, pendingMessages } = props;
    const entries = [
        { screenName: "ScoreScreen", tabBarLabel: 'Score', },
        { screenName: "MatchScreen", tabBarLabel: 'Match' },
        /*  { screenName: "HubScreen", tabBarLabel: 'hub' }, */
        { screenName: "ChatScreen", tabBarLabel: 'Chat', },
        { screenName: "MenuScreen", tabBarLabel: 'Menu' }];
    const [pendMess, setPendMess] = useState();
    const [selected, setSelected] = useState("MenuScreen");

    return (
        // <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: wp(0.1), borderTopColor: color.mainColor, backgroundColor: color.appBackground }}>
        <ImageBackground source={imgAsset['transparent']} style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, flex: 0, width: wp('100%'), paddingBottom: hasNotch ? 25 : 0, height: hasNotch ? 73 : 48,
            flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
       /*    borderTopWidth: wp(0.1), borderTopColor: theme.MAIN, */ backgroundColor: theme.WHITE, blurRadius: 5,
            elevation: 28, shadowColor: theme.PARAGRAPH_HEADERS_ICONS, shadowOffset: { width: 3, height: 8 }, shadowOpacity: 0.5, shadowRadius: 5,
        }} blurRadius={5}>
            {entries.map((item, index) => {
                if (!item.tabBarLabel) { return }
                const label =
                    item.tabBarLabel !== undefined
                        ? item.tabBarLabel
                        : item.title !== undefined
                            ? item.title
                            : targetKey;

                const isFocused = index === 3;
                const onPress = (screenName) => {
                    navigation.navigate('UserTabbedScreens', { screen: screenName })
                };
                const onLongPress = (screenName) => {
                    navigation.navigate('UserTabbedScreens', { screen: screenName })
                };
                return (
                    <TouchableOpacity key={index} accessibilityRole="button" accessibilityStates={isFocused ? ['selected'] : []}
                        onPress={() => onPress(item.screenName)}
                        onLongPress={onLongPress}
                        style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: theme.TRANSPARENT, marginHorizontal: wp(2), borderRadius: wp(2), padding: wp(2) }}
                    >
                        <View style={{ width: 20, height: 20, opacity: isFocused ? 1 : 0.5, justifyContent: 'center', alignItems: 'center', }}                        >
                            <Image source={images[index]}
                                style={{
                                    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                                    tintColor: isFocused ? theme.MAIN : theme.PARAGRAPH_HEADERS_ICONS,
                                    width: 20, height: 20, opacity: isFocused ? 1 : 0.5,
                                    justifyContent: 'center', alignItems: 'center', resizeMode: 'stretch'
                                }}
                                resizeMode={'stretch'}
                                tintColor={isFocused ? theme.MAIN : theme.PARAGRAPH_HEADERS_ICONS} />
                            {(pendMess?.length) > 0 && label == 'Chat' &&
                                <View style={[{ justifyContent: 'center', alignItems: 'center',/*  position: 'absolute', top: 8, right: 13, */ width: 14, height: 10, borderRadius: 12, borderWidth: 0, backgroundColor: theme.TRANSPARENT, borderColor: theme.PRIMARY_BACKGROUND_COLOR, }]}>
                                    <Text style={[{ fontFamily: font.nunitoBold, fontWeight: '900', fontSize: fontSize.N8, color: theme.PRIMARY_BACKGROUND_COLOR_DISABLED }]}>{pendMess}</Text>
                                </View>
                            }
                        </View>
                        {isFocused && <Text style={{ color: isFocused ? theme.MAIN : theme.PARAGRAPH_HEADERS_ICONS, textAlign: 'center', fontSize: fontSize.N12, fontFamily: font.nunitoBold, fontWeight: '900', marginVertical: wp(0) }}>
                            {label}
                        </Text>}
                    </TouchableOpacity>
                );
            })}
            {/*   <LoadingModal /> */}
        </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(SecondaryTabBarMenu);

