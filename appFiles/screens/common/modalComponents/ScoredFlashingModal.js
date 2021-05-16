import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../../helper/responsiveScreen';
import { screenWidth, screenHeight, fontSize, font, } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalScoredFlashingClose, } from "../../../reduxStore/actions/modalAction";
import { userAddScoreToAProfileRtv } from '../../../reduxStore/actions/userActions';
import Modal from 'react-native-modal';
const ScoredFlashingModalComp = (props) => {
    const { container, } = styles;
    const { theme, scoring, options, isOpen, onUserAddScoreToAProfileRtv, scorable_id, timedOutCallback, modalScoredFlashingClose } = props;
    const { selectedScore, timeout, theFontSize } = options || {}
    const [rated, setRated] = useState(null);

    const modalClosing = () => { if (isOpen) { modalScoredFlashingClose(); } };
    useEffect(() => { checkIfIsScorable(); }, [selectedScore]);
    const checkIfIsScorable = useCallback(() => {
        if (isOpen && Number(selectedScore) > 0 && scorable_id?.length > 2 && scoring) {
            console.log('selectedScore: ', selectedScore);
            setRated(selectedScore);
            scoreProfile(scorable_id, selectedScore)
        }
        else { isOpen && modalScoredFlashingClose(); if (!scoring) { setRated(null); } }
    }, [selectedScore, isOpen, scorable_id, scoring])
    const scoreProfile = (scorable_id, score) => {
        const dataSent = {
            score: Number(score),
            scorable_id: scorable_id,
            scorable_type: 'profile'
        }
        const subscription = onUserAddScoreToAProfileRtv(dataSent).subscribe({
            next: (data) => { console.log('onUserAddScoreToAProfileRtv, [data]', data); },
            error: (error) => {
                console.log('onUserAddScoreToAProfileRtv, [error]', error);
                setTimeout(() => { modalScoredFlashingClose(); timedOutCallback && timedOutCallback(); }, 250)
            },
            complete: () => {
                console.log('onUserAddScoreToAProfileRtv delivered sucesfully');
                setTimeout(() => { modalScoredFlashingClose(); timedOutCallback && timedOutCallback(); }, 250)
                setTimeout(() => { if (!scoring) { setRated(null); } }, 300)
            },
        });
    };
    return (
        <Modal
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            //transparent={true}
            isVisible={isOpen || false}
            backdropColor={theme.TRANSPARENT}
            onBackdropPress={modalClosing}
            style={{ flex: 1, margin: 0, marginBottom: -30 }}
            deviceWidth={screenWidth}
            deviceHeight={screenHeight * 1.25}
        >
            <View style={{ flex: 1, backgroundColor: theme.TRANSPARENT }}>
                <TouchableOpacity activeOpacity={1}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                <View style={{
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                    borderWidth: wp(4), borderColor: theme.MAIN, borderRadius: wp(30),
                    width: wp(60), height: wp(60),
                    position: 'absolute', right: '30%', top: '20%', justifyContent: 'center', alignItems: 'center',
                }}  >
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', width: wp(60), height: wp(60), borderRadius: wp(30),
                        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                        borderColor: theme.ACCENT, borderRadius: wp(30), borderWidth: wp(3.5),
                    }} >
                        <Text style={{
                            fontSize: theFontSize ? theFontSize : fontSize.N148, fontFamily: font.nunitoBlack,
                            color: theme.ACCENT, textAlign: 'center', transform: [{ rotate: '-25deg' }]
                        }}
                        >{rated || '✓'}</Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                    justifyContent: 'center', alignItems: 'center', width: wp(100), height: wp(100), borderRadius: wp(80),
                    position: 'absolute', left: '60%', top: '10%', justifyContent: 'center', alignItems: 'center',
                }} />
                <View style={{
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                    justifyContent: 'center', alignItems: 'center', width: wp(60), height: wp(60), borderRadius: wp(30),
                    position: 'absolute', right: 0, top: '20%', justifyContent: 'center', alignItems: 'center',
                }} />
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
    const { scoredFlashingModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalScoredFlashingClose: () => dispatch(modalScoredFlashingClose()),
        onUserAddScoreToAProfileRtv: (profileID) => dispatch(userAddScoreToAProfileRtv(profileID)),
    }
};
const ScoredFlashingModal = connect(mapStateToProps, mapDispatchToProps)(ScoredFlashingModalComp)
export { ScoredFlashingModal };
