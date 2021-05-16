import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, fullScreenHeight, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalAccesNotPermittedClose, } from "../../../reduxStore/actions/modalAction";
import imgAsset from '../../../assets/images';
import AppButton from '../AppButton';
import { BlurView, VibrancyView } from "@react-native-community/blur";
//import {SlideImages} from '../common'

const AccesNotPermittedModal = (props) => {
    const { theme, onClose, modalAccesNotPermitted_Close, onCloseAccount } = props;
    const { options, isOpen, } = props || {};

    const modalClosing = () => {
        onClose && onClose();
        if (isOpen && props.modalAccesNotPermitted_Close) { modalAccesNotPermitted_Close(); }
    };
    const onCloseAccountAction = () => {
        if (isOpen && props.modalAccesNotPermitted_Close) {
            modalAccesNotPermitted_Close();
            if (onCloseAccount) { onCloseAccount() };
        }
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
            backdropColor={theme.BLUR}
            onBackdropPress={() => modalClosing()}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), }}
            deviceWidth={screenWidth}
            deviceHeight={fullScreenHeight}
        >
            <View style={{ flex: 1, backgroundColor: theme.TRANSPARENT, justifyContent: 'space-between', backgroundColor: theme.BLUR }}>
                <BlurView style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    width: screenWidth, height: fullScreenHeight, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',
                }}
                    blurType="light"
                    blurAmount={80}
                    blurRadius={15}
                    downsampleFactor={5}
                // overlayColor={'rgba(255, 255, 255, .25)'}
                // reducedTransparencyFallbackColor={theme.BLUR}
                />

                <TouchableOpacity onPress={() => { modalClosing(); }}
                    style={{
                        marginLeft: 20,
                        position: 'absolute', bottom: 0, left: 0, right: 0, top: 0,
                        justifyContent: 'center', width: 32, height: 32, borderRadius: 32, marginTop: isIOS ? 40 : 0,
                        backgroundColor: theme.WHITE
                    }}>
                    <Image source={imgAsset['leftBlackArrow']}
                        style={[{ width: 21, height: 14, marginLeft: 5, marginHorizontal: 0, resizeMode: 'contain', tintColor: theme.PARAGRAPH_HEADERS_ICONS, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },]}
                        resizeMode={'contain'} tintColor={theme.PARAGRAPH_HEADERS_ICONS}
                    />
                </TouchableOpacity>
                <View style={{
                    alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: theme.WHITE,
                    marginTop: fullScreenHeight / 2.5, marginHorizontal: 16, borderRadius: 16
                }}>
                    <View style={{
                        height: 142, width: 345, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, borderRadius: wp(3),
                        elevation: 10, shadowColor: theme.MAIN_LIGHT, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900',
                            color: theme.PARAGRAPH_HEADERS_ICONS,
                            textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PARAGRAPH_HEADERS_ICONS
                        }}
                        >{'This app is for people 18 or older.'}</Text>
                        <AppButton standard
                            containerStyle={{ marginTop: 24, height: 56, width: 297, borderWidth: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.MAIN, borderColor: theme.MAIN }}
                            title={'Close Account'}
                            onPress={() => onCloseAccountAction()}
                        />
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
    const { accesNotPermittedModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalAccesNotPermitted_Close: () => dispatch(modalAccesNotPermittedClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccesNotPermittedModal);
