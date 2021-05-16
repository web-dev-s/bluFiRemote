import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated, PanResponder, ScrollView, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, screenHeight, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalTutorial_III_Close, } from "../../../reduxStore/actions/modalAction";
import { setShowTutorial } from '../../../reduxStore/actions/appAction';
import imgAsset from '../../../assets/images';


const Tutorial_III_ModalComponent = (props) => {
    const { modalTutorial_III_Close, theme, onClose } = props;
    const { options, isOpen, } = props || {};

    const modalClosing = () => {
        onClose && onClose();
        if (isOpen && modalTutorial_III_Close) { modalTutorial_III_Close(); }
    };
    return (
        <Modal
            style={{ flex: 1 }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            //transparent={true}
            isVisible={isOpen || false}
            backdropColor={theme.BLUR}
            onBackdropPress={modalClosing}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), }}
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
        >
            <View style={{ flex: 1, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, justifyContent: 'space-between', backgroundColor: theme.BLUR }}>
                <View style={{ position: 'absolute', top: hp(4), left: -wp(4), width: wp(20), height: wp(20), borderRadius: wp(10), backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.PRIMARY_TEXT_COLOR_DARK, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK, marginRight: wp(4) }}
                    >{'3/3'}</Text>
                </View>
                <View style={{ flex: 1.5, marginVertical: hp(4), marginHorizontal: wp(4), borderWidth: wp(1), borderRadius: wp(5), borderColor: theme.PRIMARY_BACKGROUND_COLOR, borderStyle: 'dashed' }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('5%'), marginTop: wp('5%') }}
                        onPress={() => { modalClosing(); }}
                    >
                        <Text style={{ fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE }}>{'END TUTORIAL'}</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: hp('25%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={imgAsset['fingerLeftRight']} style={{ width: wp(15), height: wp(15), tintColor: theme.PRIMARY_BACKGROUND_COLOR, marginVertical: hp(3) }} resizeMode={'contain'} tintColor={theme.PRIMARY_BACKGROUND_COLOR} />
                        <Text style={{ textAlign: 'center', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                        >{'SWIPE LEFT/RIGHT'}</Text>
                        <Text style={{ textAlign: 'center', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                        >{'On the person to check\nhis/her\'s other pictures.'}</Text>
                    </View>
                </View>
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
    const { tutorial_III_Modal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalTutorial_III_Close: () => dispatch(modalTutorial_III_Close()),
        onTutorialEnded: () => dispatch(setShowTutorial(false)),
    }
};
const Tutorial_III_Modal = connect(mapStateToProps, mapDispatchToProps)(Tutorial_III_ModalComponent)
export { Tutorial_III_Modal };
