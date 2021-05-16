import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../../../helper/responsiveScreen';
import { fullScreenHeight, screenWidth, fontSize, font, } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalSearchingMatchesClose, } from "../../../reduxStore/actions/modalAction";
import imgAsset from '../../../assets/images';
import * as Progress from 'react-native-progress';
import { BlurView, } from "@react-native-community/blur";
const SearchingMatchesComponent = (props) => {

    const { theme, navigation, options, isOpen, } = props;
    const modalClosing = () => {
        if (isOpen && props.modalLoadingClose) { props.onModalSearchingMatchesClose(); }
    };
    return (<Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={400}
        propagateSwipe={true}
        transparent={true}
        isVisible={isOpen || false}
        backdropColor={theme.TRANSPARENT}
        onBackdropPress={modalClosing}
        style={{ flex: 1, margin: 0, marginBottom: 0 }}
        deviceWidth={screenWidth}
        deviceHeight={fullScreenHeight}
    >
        <View style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, top: 0,
            flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
        }}>
            <BlurView style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                width: screenWidth, height: fullScreenHeight,
            }}
                blurType="light"
                blurAmount={80}
                blurRadius={15}
                downsampleFactor={5}
            // overlayColor={'rgba(255, 255, 255, .25)'}
            // reducedTransparencyFallbackColor={theme.BLUR}
            />
            <View style={{
                backgroundColor: theme.WHITE, position: 'absolute', top: hp('25%'),/*  left: 15, right: 15, */
                height: hp('30%'), width: '80%', borderRadius: 16, justifyContent: 'center', alignItems: 'center',
                // elevation: 10, shadowColor: theme.MAIN_LIGHT, shadowOffset: { width: 0, height: 3 },
                // shadowOpacity: 0.5, shadowRadius: 5,
            }}>
                <Text style={{
                    marginVertical: 5, fontSize: fontSize.N24,
                    color: theme.PARAGRAPH_HEADERS_ICONS, fontFamily: font.josefinSansBold
                }}>{'Looking for Matches'}</Text>
                <Image source={imgAsset['snippetLooking']}
                    style={{ width: '100%', height: '70%', resizeMode: 'stretch' }}
                    resizeMode={'stretch'}
                />
                <View style={{
                    justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                    position: 'absolute', top: -wp(5), right: wp(5),
                    width: wp(10), height: wp(10), borderRadius: wp(5),
                }}>
                    <View style={{
                        width: wp(9), height: wp(9), borderRadius: wp(4.5),
                        // elevation: 1, shadowColor: theme.MAIN_LIGHT, shadowOffset: { width: 0, height: 1 },
                        // shadowOpacity: 0.5, shadowRadius: 5,
                    }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('ScoreScreen'), modalClosing() }}
                            style={{
                                flex: 1,
                                backgroundColor: theme.WHITE, width: wp(9), height: wp(9), borderRadius: wp(4.5),
                            }}>
                            <Image source={imgAsset['xTransp']}
                                style={{
                                    width: '100%', height: '100%', borderRadius: wp(5),
                                    tintColor: theme.BLACK, resizeMode: 'stretch'
                                }}
                                resizeMode={'stretch'}
                                tintColor={theme.BLACK}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>);
};
const styles = StyleSheet.create({
    container: { flex: 1, },
    titleTextStyle: { paddingVertical: hp(1), fontSize: fontSize.N16, fontFamily: font.normal, textAlignVertical: 'center', },
    descriptionTextStyle: { fontSize: fontSize.N16, fontFamily: font.nunitoRegular, textAlignVertical: 'center', }
});
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { searchingMatchesModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModalSearchingMatchesClose: () => dispatch(modalSearchingMatchesClose())
    }
};
const SearchingMatchesModal = connect(mapStateToProps, mapDispatchToProps)(SearchingMatchesComponent)
export { SearchingMatchesModal };
