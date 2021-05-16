import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, screenHeight, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { setShowTutorial_MatchScreen } from '../../../reduxStore/actions/appAction';
import { modalTutorial_I_Close, modalTutorial_II_Open } from "../../../reduxStore/actions/modalAction";
import imgAsset from '../../../assets/images';

const Tutorial_I_ModalComponent = (props) => {
    const { modalTutorial_I_Close, theme, onClose, onTutorialMatchScreenPresented } = props;
    const { options, isOpen, } = props || {};

    const modalClosing = () => {
        onClose && onClose();
        setShowCase(1);
        onTutorialMatchScreenPresented();
        if (isOpen && modalTutorial_I_Close) { modalTutorial_I_Close(); }
    };
    const [showCase, setShowCase] = useState(1);
    return (
        <Modal
            style={{ flex: 1, zIndex: 999, }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            //transparent={true}
            isVisible={isOpen || false}
            // backdropColor={theme.BLUR}
            backdropColor={theme.EXTRA_BLACK}
            onBackdropPress={modalClosing}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), opacity: 0.5 }}
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
        >
            {
                showCase == 1 &&
                <View style={{ flex: 1, backgroundColor: theme.WHITE, justifyContent: 'space-between', backgroundColor: theme.BLUR }}>
                    <View style={{ position: 'absolute', top: hp(4), left: -wp(4), width: wp(20), height: wp(20), borderRadius: wp(10), backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.PRIMARY_TEXT_COLOR_DARK, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK, marginRight: wp(4) }}
                        >{'1/3'}</Text>
                    </View>
                    <View style={{ flex: 1.5, marginTop: hp(4), marginHorizontal: wp(4), borderWidth: wp(1.2), borderRadius: wp(5), borderColor: theme.WHITE, borderStyle: 'dashed' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('5%'), marginTop: wp('5%') }}
                            onPress={() => { setShowCase(2); }}
                        >
                            <Text style={{ fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE }}>{'NEXT'}</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('10%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgAsset['fingerUp']} style={{ width: wp(15), height: wp(15), tintColor: theme.WHITE, marginVertical: hp(3) }} resizeMode={'contain'} tintColor={theme.WHITE} />
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'SWIPE UP'}</Text>
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'In this area to match\nwith this person.'}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: hp(2), marginBottom: hp(4), marginHorizontal: wp(4), flex: 1, borderWidth: wp(1.2), borderRadius: wp(5), borderColor: theme.WHITE, borderStyle: 'dashed' }}>
                        <View style={{ marginBottom: hp('5%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgAsset['fingerDown']} style={{ width: wp(15), height: wp(15), tintColor: theme.WHITE, marginVertical: hp(3) }} resizeMode={'contain'} tintColor={theme.WHITE} />
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'SWIPE DOWN'}</Text>
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'In this area to dodge\n this person.'}</Text>
                        </View>

                    </View>
                </View>
            }
            {
                showCase == 2 &&
                <View style={{ flex: 1, backgroundColor: theme.WHITE, justifyContent: 'space-between', backgroundColor: theme.BLUR }}>
                    <View style={{ position: 'absolute', top: hp(4), left: -wp(4), width: wp(20), height: wp(20), borderRadius: wp(10), backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.PRIMARY_TEXT_COLOR_DARK, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK, marginRight: wp(4) }}
                        >{'2/3'}</Text>
                    </View>
                    <View style={{ flex: 1.5, marginVertical: hp(4), marginHorizontal: wp(4), borderWidth: wp(1.2), borderRadius: wp(5), borderColor: theme.WHITE, borderStyle: 'dashed' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('5%'), marginTop: wp('5%') }}
                            onPress={() => { setShowCase(3); }}
                        >
                            <Text style={{ fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE }}>{'NEXT'}</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('28%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgAsset['fingerTap']} style={{ width: wp(15), height: wp(15), tintColor: theme.WHITE, marginVertical: hp(3) }} resizeMode={'contain'} tintColor={theme.WHITE} />
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'TAP'}</Text>
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'On the person\nto check his/her profile.'}</Text>
                        </View>
                    </View>
                </View>
            }
            {
                showCase === 3 &&
                <View style={{ flex: 1, backgroundColor: theme.WHITE, justifyContent: 'space-between', backgroundColor: theme.BLUR }}>
                    <View style={{ position: 'absolute', top: hp(4), left: -wp(4), width: wp(20), height: wp(20), borderRadius: wp(10), backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.PRIMARY_TEXT_COLOR_DARK, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK, marginRight: wp(4) }}
                        >{'3/3'}</Text>
                    </View>
                    <View style={{ flex: 1.5, marginVertical: hp(4), marginHorizontal: wp(4), borderWidth: wp(1), borderRadius: wp(5), borderColor: theme.WHITE, borderStyle: 'dashed' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('5%'), marginTop: wp('5%') }}
                            onPress={() => { modalClosing(); }}
                        >
                            <Text style={{ fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE }}>{'END TUTORIAL'}</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('25%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgAsset['fingerLeftRight']} style={{ width: wp(15), height: wp(15), tintColor: theme.WHITE, marginVertical: hp(3) }} resizeMode={'contain'} tintColor={theme.WHITE} />
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'SWIPE LEFT/RIGHT'}</Text>
                            <Text style={{ textAlign: 'center', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                            >{'On the person to check\nhis/her\'s other pictures.'}</Text>
                        </View>
                    </View>
                </View>
            }
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
    const { tutorial_I_Modal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalTutorial_I_Close: () => dispatch(modalTutorial_I_Close()),
        onTutorialMatchScreenPresented: () => dispatch(setShowTutorial_MatchScreen(false)),
        onModalTutorial_II_Open: (options) => dispatch(modalTutorial_II_Open({ isOpen: true, options: options })),
    }
};
const Tutorial_I_Modal = connect(mapStateToProps, mapDispatchToProps)(Tutorial_I_ModalComponent)
export { Tutorial_I_Modal };
