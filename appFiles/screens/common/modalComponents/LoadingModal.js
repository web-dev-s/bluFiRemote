import React from 'react';
import { StyleSheet, View, } from 'react-native';
import Modal from 'react-native-modal';
import { hp, } from '../../../helper/responsiveScreen';
import { fullScreenHeight, screenWidth, fontSize, font, } from '../../../helper/themeHelper';
import { connect } from "react-redux";
import { modalLoadingClose, } from "../../../reduxStore/actions/modalAction";
import * as Progress from 'react-native-progress';
const LoadingModal = (props) => {

    const { theme, options, isOpen, } = props;
    const modalClosing = () => {
        if (isOpen) { props.modalLoadingClose(); }
    };
    return (
        <Modal
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={400}
            propagateSwipe={true}
            //transparent={true}
            isVisible={isOpen}
            backdropColor={theme.BLUR}
            onBackdropPress={() => modalClosing()}
            style={{ flex: 1, margin: 0, marginBottom: 0 }}
            deviceWidth={screenWidth}
            deviceHeight={fullScreenHeight}
        >
            <View style={{ zIndex: 99999, flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Progress.Circle size={90} indeterminate={true} borderWidth={10} borderColor={theme.MAIN} endAngle={0.75}
                    thickness={5} strokeCap={'round'} fill={theme.TRANSPARENT}
                />
            </View>
        </Modal >
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, },
    titleTextStyle: { paddingVertical: hp(1), fontSize: fontSize.N16, fontFamily: font.normal, textAlignVertical: 'center', },
    descriptionTextStyle: { fontSize: fontSize.N16, fontFamily: font.nunitoRegular, textAlignVertical: 'center', }
});
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { loadingModal: { isOpen, options } } = store.modalReducer;
    return { isOpen, options, theme };
};
const mapDispatchToProps = (dispatch) => {
    return {
        modalLoadingClose: () => dispatch(modalLoadingClose())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal);
