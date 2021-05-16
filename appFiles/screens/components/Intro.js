import React, { useState, useLayoutEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { userSocialLoginRtv, updateUserDetail } from '../../reduxStore/actions/userActions';
import { modalTermsOpen, modalTermsClose } from '../../reduxStore/actions/modalAction';
import { wp, hp } from '../../helper/responsiveScreen';
import { hasNotch, fontSize, font, isIOS } from '../../helper/themeHelper';
import { AppButton, } from '../common'
import imgAsset from '../../assets/images';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import { useNetInfo } from "@react-native-community/netinfo";
import { NetworkUtils } from '../../helper/appHelper';
const Intro = ({ route, ...props }) => {
    const netInfo = useNetInfo();
    const isFocused = useIsFocused();
    const [mesage, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [viewedTermsModal, setViewedTermsModal] = useState(false);
    const { theme, navigation, onModalTermsOpen } = props;

    useLayoutEffect(() => {
        if (isFocused) {
            setViewedTermsModal(false);
            console.log('netInfo: ', netInfo);
            NetworkUtils().then(res => {
                console.log(res)
                if (res.isInternetReachable == false) {
                    return Alert.alert('Conectivity error on ' + netInfo.type,
                        'Your device can not acces SeraDating server. Check network connection and try again',
                        [{ text: 'Ok', onPress: () => { } }])
                }
            }
            );
        }
    }, [isFocused]);

    const styles = StyleSheet.create({
        wrapperStyle: { flex: 1, alignItems: 'center', justifyContent: 'space-between', margin: 0, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, color: theme.MAIN },
        imgBkgTopLeft: { alignSelf: 'flex-start', width: 132, height: 97, margin: 0, position: 'absolute', top: hasNotch ? 35 : -19, left: -4, },
        imgBkgTopRight: { width: wp('50%'), height: wp('50%'), position: 'absolute', top: hasNotch ? 35 : 0, right: -wp(3.75), resizeMode: 'contain', },
        containerStyle: { flex: 1, width: '100%', justifyContent: 'space-between', paddingTop: isIOS ? 10 : 100 },
        logoStyle: { zIndex: 888, alignSelf: 'center', marginTop: isIOS ? '30%' : 40.68, marginBottom: 24, width: 71, height: 80, },
        buttonsContainer: { margin: 0, marginTop: 10, padding: 0, marginHorizontal: 15, justifyContent: 'center', alignItems: 'center' },
        btnStandardContainer: { height: 56, borderWidth: 0, justifyContent: 'flex-start', alignItems: 'center', },
        buttonLeftImageContainer: { backgroundColor: theme.ACCENT, marginLeft: 0 },
        buttonRightImageContainer: { backgroundColor: theme.TRANSPARENT, marginRight: 0 },
        buttonLeftImage: { marginLeft: 0, width: 18, height: 19 },
        buttonTextContainer: { marginRight: wp('15%') },
        buttonTextStyle: { paddingLeft: 2, fontWeight: '700', fontSize: fontSize.N16, fontFamily: font.josefinSansBold, },
        bottomTextsContainer: { alignSelf: 'flex-start', marginTop: 39, justifyContent: 'flex-start', alignItems: 'flex-start', },

        underlined: { textDecorationLine: 'underline', color: theme.PARAGRAPH_HEADERS_ICONS, fontSize: fontSize.N18, },
        lightTextStyle: { color: theme.DARK_GRAY, fontSize: fontSize.N15, }
    });
    const { wrapperStyle, imgBkgTopLeft, imgBkgTopRight, containerStyle, logoStyle, buttonsContainer, btnStandardContainer,
        buttonLeftImageContainer, buttonLeftImage, buttonTextStyle, bottomTextsContainer, buttonRightImageContainer, underlined, lightTextStyle, } = styles;

    return (<>
        <View style={[wrapperStyle]}>
            <View style={[containerStyle]}>
                <ScrollView vertical showsVerticalScrollIndicator={false} nestedScrollEnabled={false} >
                    <Image source={imgAsset['logo']} style={[logoStyle]} resizeMode={'cover'} />
                    <View style={buttonsContainer}>
                        <AppButton standard
                            containerStyle={[btnStandardContainer,
                                { marginTop: 8, backgroundColor: theme.MAIN, borderColor: theme.MAIN }]}
                            leftImageContainer={{ backgroundColor: theme.MAIN }}
                            leftImage={imgAsset['logo']}
                            leftImageStyle={buttonLeftImage}
                            textContainerStyle={{ marginRight: 20 }}
                            textStyle={[buttonTextStyle]}
                            title={'Enter'}
                            rightImageContainer={buttonRightImageContainer}
                            onPress={() => { navigation.navigate('UserTabbedScreens'); }}
                        />


                    </View>
                </ScrollView>
            </View>

        </View >
        {loading && <View style={{ zIndex: 1, flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <Progress.Circle size={90} indeterminate={true} borderWidth={10} borderColor={theme.MAIN} endAngle={0.70}
                thickness={5} strokeCap={'round'} fill={theme.TRANSPARENT}
            />

        </View>}
    </>
    );
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { userDetail } = store.userReducer;
    return { theme, userDetail, };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetail: (email) => dispatch(updateUserDetail(email)),
        onUserSocialLogin: (socialCredentials) => dispatch(userSocialLoginRtv(socialCredentials)),

        onModalTermsOpen: (options) => dispatch(modalTermsOpen({ isOpen: true, options: options })),
        onModalTermsClose: () => dispatch(modalTermsClose()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Intro);