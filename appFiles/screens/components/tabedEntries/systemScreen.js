import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Image, StyleSheet, View, Pressable, Text, TouchableOpacity, ImageBackground, Animated, PanResponder, ScrollView, AppRegistry, Keyboard } from 'react-native';
import { connect } from "react-redux";
import {
    modalScoredFlashingOpen, modalLoadingOpen, modalLoadingClose, modalUserInfoOpen,
    modalNoScoresOpen, modalNoScoresClose
} from '../../../reduxStore/actions/modalAction';
import { getScoreSuggestionsRtv } from '../../../reduxStore/actions/userActions';
import { wp, hp } from '../../../helper/responsiveScreen';
import { fullScreenHeight, screenHeight, screenWidth, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { ShadowCard } from '../../common'
import * as Progress from 'react-native-progress';
import imgAsset from '../../../assets/images';
import { AppButton, SlideImages, RatingSlider, /* NoScoresModal, */ ScoredFlashingModal, UserInfoModal, UserDescription } from '../../common';
import { useIsFocused } from '@react-navigation/native';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Modal from 'react-native-modal';
import timezones from 'compact-timezone-list';
// or
//import { minimalTimezoneSet } from 'compact-timezone-list';
const SystemScreen = ({ route, scrollX, ...props }) => {
    const isFocused = useIsFocused();
    const { theme, userDetail, navigation, } = props;
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [showList, setShowList] = useState(false);
    const { wrapperStyle, buttonsContainer, btnStandardContainer, buttonLeftImage, buttonRightImageContainer, buttonTextStyle } = styles(theme);

    return (
        <View style={[wrapperStyle]}>
            <View style={buttonsContainer}>
                <AppButton standard
                    containerStyle={[btnStandardContainer,]}
                    leftImageContainer={{ backgroundColor: theme.MAIN }}
                    leftImage={imgAsset['logo']}
                    leftImageStyle={buttonLeftImage}
                    textContainerStyle={{ marginRight: 20 }}
                    textStyle={[buttonTextStyle]}
                    title={'System Calibrate'}
                    rightImageContainer={buttonRightImageContainer}
                    onPress={() => { alert('Feature not implemented'); }}
                />
                <AppButton standard
                    containerStyle={[btnStandardContainer,]}
                    leftImageContainer={{ backgroundColor: theme.MAIN }}
                    leftImage={imgAsset['logo']}
                    leftImageStyle={buttonLeftImage}
                    textContainerStyle={{ marginRight: 20 }}
                    textStyle={[buttonTextStyle]}
                    title={'System Reset'}
                    rightImageContainer={buttonRightImageContainer}
                    onPress={() => { alert('Feature not implemented'); }}
                />
            </View>
            <View style={[buttonsContainer, { flex: 1 }]}>

                <AppButton standard
                    containerStyle={[btnStandardContainer,]}
                    leftImageContainer={{ backgroundColor: theme.MAIN }}
                    leftImage={imgAsset['logo']}
                    leftImageStyle={buttonLeftImage}
                    textContainerStyle={{ marginRight: 20 }}
                    textStyle={[buttonTextStyle]}
                    title={`Timezone: ${timezone}`}
                    rightImageContainer={buttonRightImageContainer}
                    onPress={() => { setShowList(true) }}
                />
                <ScrollView style={{ marginTop: 10, }} containerStyle={{ flexGrow: 1, flexSchrink: 1, flex: 1 }} vertical showsVerticalScrollIndicator={false} nestedScrollEnabled={false} >

                    {showList && timezones?.map((i, idx) => {
                        return <Pressable onPress={() => { setTimezone(i.tzCode ?? i.label); setShowList(false); }}
                            key={idx}
                            style={{ padding: 5 }}
                        >
                            <ShadowCard>
                                <Text style={{ paddingLeft: 3 }}>{i?.label}->({i.tzCode})</Text>
                            </ShadowCard>

                        </Pressable>
                    })}
                </ScrollView>

            </View>
        </View >
    );
}

const styles = StyleSheet.create(theme => ({
    wrapperStyle: { flex: 1, backgroundColor: color.appBackground, alignItems: 'stretch', justifyContent: 'space-around', backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, color: theme.PRIMARY_TEXT_COLOR },
    buttonsContainer: { flex: 1, margin: 0, marginTop: 10, padding: 0, marginHorizontal: 15, justifyContent: 'center', alignItems: 'center' },
    btnStandardContainer: { height: 56, borderWidth: 0, justifyContent: 'flex-start', alignItems: 'center', marginTop: 8, backgroundColor: theme.MAIN, borderColor: theme.MAIN },
    buttonLeftImageContainer: { backgroundColor: theme.ACCENT, marginLeft: 0 },
    buttonRightImageContainer: { backgroundColor: theme.TRANSPARENT, marginRight: 0 },
    buttonLeftImage: { marginLeft: 0, width: 18, height: 19 },
    buttonTextContainer: { marginRight: wp('15%') },
    buttonTextStyle: { paddingLeft: 2, fontWeight: '700', fontSize: fontSize.N16, fontFamily: font.josefinSansBold, },
    bottomTextsContainer: { alignSelf: 'flex-start', marginTop: 39, justifyContent: 'flex-start', alignItems: 'flex-start', },

}));
const mapStateToProps = (store) => {
    const { userDetail } = store.userReducer;
    const { theme, } = store.appReducer;
    return {
        theme, userDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};
AppRegistry.registerComponent('SystemScreen', () => SystemScreen);
export default connect(mapStateToProps, mapDispatchToProps)(SystemScreen);