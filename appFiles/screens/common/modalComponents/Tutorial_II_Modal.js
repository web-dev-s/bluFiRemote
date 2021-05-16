import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated, PanResponder, ScrollView, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, fullscreenHeight, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalTutorial_II_Close, modalTutorial_III_Open } from "../../../reduxStore/actions/modalAction";
import { setShowTutorial_ChatScreen } from '../../../reduxStore/actions/appAction';
import imgAsset from '../../../assets/images';


const Tutorial_II_ModalComponent = (props) => {
    const { modalTutorial_II_Close, theme, onClose, onTutorialMatchScreenPresented } = props;
    const { options, isOpen, } = props || {};

    const modalClosing = () => {
        onClose && onClose();
        onTutorialMatchScreenPresented();
        if (isOpen && modalTutorial_II_Close) { modalTutorial_II_Close(); }
    };
    return (
        <Modal
            style={{ flex: 1 }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            // transparent={true}
            isVisible={isOpen || false}
            //  backdropColor={theme.DARK_GRAY}
            backdropColor={theme.EXTRA_BLACK}
            onBackdropPress={modalClosing}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), opacity: 0.5 }}
            deviceWidth={screenWidth}
            deviceHeight={fullscreenHeight}
        >
            <View style={{
                position: 'absolute', top: 40, right: 28, width: 65, height: 60, borderRadius: 10,
                backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'center',
            }}>
                <View style={{ alignSelf: 'center', }}>
                    <Image source={imgAsset['profileStar']} style={{ height: wp(8), width: wp(8), alignSelf: 'center', }} resizeMode={'contain'} />
                </View>
            </View>
            <View style={{ position: 'absolute', top: 55, right: 100, justifyContent: 'flex-end' }}>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'right', fontFamily: font.nunitoBlack, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                    >{'SPEED DATING'}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'right', fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900', color: theme.WHITE, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PRIMARY_TEXT_COLOR_DARK }}
                    >{'Tired of swipes? Try some live\nvideo speed dating sessions\nright from your phone!'}</Text>
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
    const { tutorial_II_Modal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalTutorial_II_Close: () => dispatch(modalTutorial_II_Close()),
        onTutorialMatchScreenPresented: () => dispatch(setShowTutorial_ChatScreen(false)),
    }
};
const Tutorial_II_Modal = connect(mapStateToProps, mapDispatchToProps)(Tutorial_II_ModalComponent);
export { Tutorial_II_Modal };
