import React, { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, fullScreenHeight, color, fontSize, font, isIOS, hasNotch, shadowStyle } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalMatchingClose, } from "../../../reduxStore/actions/modalAction";
import imgAsset from '../../../assets/images';
import AppButton from '../AppButton';
import { noUrlOnAvatar } from '../../../helper/appHelper';
//import {SlideImages} from '../common'

const MatchingModalComponent = (props) => {
    const { theme, navigation, userName, userAge, image, rate, email, onClose, modalMatchingClose } = props;
    const { options, isOpen, user } = props || {};

    const modalClosing = useCallback(() => {
        if (onClose) { onClose() }
        if (isOpen && modalMatchingClose) { modalMatchingClose(); }
    });

    const onStartChatting = () => {
        //   const user = { name: userName, avatar: image, rate: rate, email: email };
        // navigation.navigate('ChatRoom', { screen: 'ChatDialogScreens', profile: user, params: { screen: 'ChatRoom', }, });
        onClose();
        modalMatchingClose();
        console.log('sending to chat room the user: ', user);
        navigation.navigate('ChatDialogScreens', { screen: 'ChatRoom', params: { fromMatch: true, profile: { ...user } } });
    }

    return (
        <Modal
            style={{ flex: 1 }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            //transparent={true}
            isVisible={isOpen || false}
            backdropColor={theme.TRANSPARENT}
            onBackdropPress={modalClosing}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), }}

            deviceWidth={screenWidth}
            deviceHeight={fullScreenHeight}
        >
            <ImageBackground source={image ? image : imgAsset['defaultbkd']} style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, width: screenWidth, height: fullScreenHeight, flex: 1, resizeMode: "stretch", backgroundColor: theme.TRANSPARENT }]} resizeMode={'stretch'}>
                <View style={{ flex: 1, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, justifyContent: 'space-between', backgroundColor: theme.TRANSPARENT }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: hp(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                            {/* <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.1 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.2 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.4 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 1 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.4 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.2 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            />
                            <Image source={imgAsset['whiteHearth']}
                                style={{ height: wp(10), width: wp(10), alignSelf: 'center', tintColor: theme.WHITE, opacity: 0.1 }}
                                resizeMode={'contain'}
                                tintColor={theme.WHITE}
                            /> */}
                        </View>
                        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: fontSize.N56, fontFamily: font.nunitoBlack, color: theme.WHITE, opacity: 1 }}>{'Perfect match!'}</Text>
                            </View>
                            <View style={{ position: 'absolute', top: hp(4), flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: fontSize.N50, fontFamily: font.nunitoBlack, color: theme.WHITE, opacity: 0.3 }}>{'Perfect match!'}</Text>
                            </View>
                            <View style={{ position: 'absolute', top: hp(8), flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: fontSize.N42, fontFamily: font.nunitoBlack, color: theme.WHITE, opacity: 0.1 }}>{'Perfect match!'}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View>
                        <FloatingHeart />
                    </View> */}
                    <View style={{ flex: 1, marginHorizontal: 15, flexDirection: 'column', alignContent: 'flex-start' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 0, marginBottom: 40, }}>
                            <Text style={{ fontSize: fontSize.N48, fontFamily: font.nunitoBlack, color: theme.WHITE,/*  textDecorationLine: 'underline', */ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: theme.MAIN }}>{userName}{' '}
                                {/*  <Text style={{ paddingLeft: wp(6), fontSize: fontSize.N16, fontFamily: font.normal, color:theme.MAIN, textAlignVertical: 'center', }}>{userAge}</Text> */}
                            </Text>
                        </View>
                        <View style={{ flex: 1, marginBottom: hasNotch ? 53 : 28, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-end' }}>
                            <AppButton standard containerStyle={{ marginBottom: 16, alignSelf: 'center', backgroundColor: theme.MAIN, borderColor: theme.MAIN }}
                                textContainerStyle={{ flex: 1 }}
                                textStyle={[{ color: theme.PRIMARY_BACKGROUND_COLOR, }]}
                                title={'Say "Hello!"'}
                                onPress={() => { onStartChatting() }}
                            />
                            <TouchableOpacity style={[{ marginHorizontal: wp('10%'), backgroundColor: theme.TRANSPARENT, justifyContent: 'center', alignItems: 'center', }]}
                                onPress={modalClosing}>
                                <Text style={[{ paddingHorizontal: wp(6), paddingVertical: wp(0.5), fontFamily: font.josefinSansBold, fontSize: fontSize.N18, fontWeight: '400', color: theme.WHITE, textDecorationLine: 'underline', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: theme.PRIMARY_BACKGROUND_COLOR }]}
                                >{'Back to Matching'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, paddingHorizontal: wp(6), backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, justifyContent: 'space-between' }}>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { matchingModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};
const mapDispatchToProps = (dispatch) => {
    return {
        modalMatchingClose: () => dispatch(modalMatchingClose())
    }
};
const MatchingModal = connect(mapStateToProps, mapDispatchToProps)(MatchingModalComponent)
export { MatchingModal };
