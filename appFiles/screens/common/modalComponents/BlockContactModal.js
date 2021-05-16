import React, { useState, } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated, PanResponder, ScrollView, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, fullScreenHeight, color, fontSize, font, hasNotch, isIOS, logJson } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalBlockContactClose, } from "../../../reduxStore/actions/modalAction";
import { userBlockAProfileRtv } from '../../../reduxStore/actions/userActions';
import { resetPendingChatMessages } from '../../../reduxStore/actions/appAction';
import imgAsset from '../../../assets/images';

import AppButton from '../AppButton';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import * as Progress from 'react-native-progress';

const BlockContactModal = (props) => {
    const { modalTutorial_III_Close, theme, onClose, modalBlockContact_Close, onUserBlockAProfile, onResetPendingChatMessages, userDetail } = props;
    const { options, isOpen, } = props || {};
    const [block, setBlock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const modalClosing = () => {
        onClose && onClose();
        if (isOpen && modalBlockContact_Close) { modalBlockContact_Close(); setBlock(false); }
    };
    const onCloseAction = (profile_id) => {
        if (!profile_id) { modalClosing(); }
        else {
            setLoadingButton(true);
        }
    }
    return (
        <Modal
            style={{ flex: 1 }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            transparent={true}
            isVisible={isOpen || false}
            backdropColor={theme.BLUR}
            onBackdropPress={modalClosing}
            style={{ marginHorizontal: wp(0), marginVertical: wp(0), }}
            deviceWidth={screenWidth}
            deviceHeight={fullScreenHeight}
        >
            {block
                ? <TouchableWithoutFeedback style={{
                    backgroundColor: theme.TRANSPARENT,
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                    width: screenWidth, height: fullScreenHeight,
                }}
                    onPress={modalClosing}>
                    <View style={{ flex: 1, backgroundColor: theme.TRANSPARENT, justifyContent: 'space-between', }}>
                        <BlurView style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            width: screenWidth, height: fullScreenHeight,
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',
                        }}
                            blurType="light"
                            blurAmount={80}
                            blurRadius={15}
                            downsampleFactor={5}
                        // overlayColor={'rgba(255, 255, 255, .25)'}
                        // reducedTransparencyFallbackColor={theme.BLUR}
                        />
                        <View style={{
                            alignSelf: 'center', justifyContent: 'space-evenly', alignItems: 'center',
                            backgroundColor: theme.TRANSPARENT,
                            marginTop: 200, marginHorizontal: 16, borderRadius: 16
                        }}>
                            <View style={{
                                height: 268, width: 345, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, borderRadius: wp(3),
                                elevation: 10, shadowColor: theme.MAIN_LIGHT, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontFamily: font.josefinSansBold, fontSize: fontSize.N24, fontWeight: '900',
                                    color: theme.PARAGRAPH_HEADERS_ICONS,
                                    textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PARAGRAPH_HEADERS_ICONS
                                }}
                                >{'Are you sure you want to block '}{props.userName}</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    fontFamily: font.nunitoRegular, fontSize: fontSize.N16, fontWeight: '900',
                                    color: theme.PARAGRAPH_HEADERS_ICONS,
                                    textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: color.PARAGRAPH_HEADERS_ICONS
                                }}
                                >{'She will not be able to be matched with you in the future and she will be moved to your Blocked List.'}</Text>
                                <AppButton standard
                                    loading={loadingButton}
                                    containerStyle={{ marginTop: 24, height: 56, width: 297, borderWidth: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.MAIN, borderColor: theme.MAIN }}
                                    title={`Block ${props.userName}`}
                                    onPress={() => onCloseAction(props.profile_id)}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                : <TouchableWithoutFeedback style={{
                    backgroundColor: theme.TRANSPARENT,
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                    width: screenWidth, height: fullScreenHeight,
                }}
                    onPress={modalClosing}>
                    <View style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, top: 0,
                        flex: 1
                    }}>
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
                        <View style={{ backgroundColor: theme.WHITE, position: 'absolute', bottom: hasNotch ? 28 : (isIOS ? 0 : 0), left: 15, right: 15, width: 345, height: 72, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                            <View style={{
                                height: isIOS ? 72 : 72, width: wp('90%'), justifyContent: 'space-evenly',
                                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, borderTopLeftRadius: 16, borderTopRightRadius: 16,
                                elevation: 5, shadowColor: theme.MAIN_LIGHT, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,
                            }}>
                                <TouchableOpacity style={{/* marginTop: 24, */ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                                    onPress={() => setBlock(c => !c)}
                                >
                                    <Image source={imgAsset['blockUser1']}
                                        style={{ marginLeft: 25, width: 24, height: 24, resizeMode: 'cover' }}
                                        resizeMode={'cover'}
                                    />
                                    <Text style={{ marginLeft: 25, fontSize: fontSize.N16, color: theme.PARAGRAPH_HEADERS_ICONS, fontFamily: font.nunitoRegular }}
                                    >{'Block Contact'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }
            {
                loading &&
                <View style={{
                    zIndex: 1, flex: 1, justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
                }}>
                    <Progress.Circle size={90} indeterminate={true} borderWidth={10}
                        borderColor={theme.MAIN} endAngle={0.75}
                        thickness={5} strokeCap={'round'} fill={theme.TRANSPARENT}
                    />
                </View>
            }
        </Modal >
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, },
});
const mapStateToProps = (store) => {
    const { userDetail } = store.userReducer;
    const { theme, } = store.appReducer;
    const { blockContactModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme, userDetail };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalBlockContact_Close: () => dispatch(modalBlockContactClose()),
        onUserBlockAProfile: (profile_id) => dispatch(userBlockAProfileRtv(profile_id)),
        onResetPendingChatMessages: profileIds => dispatch(resetPendingChatMessages(profileIds)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockContactModal);
