
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { wp, hp } from ' ../../../helper/responsiveScreen';
import { color, fontSize, font } from ' ../../../helper/themeHelper';
import imgAsset from '../../assets/images/index';
import { useIsFocused } from '@react-navigation/native';
const SquareSwitcher = (props) => {
    const isFocused = useIsFocused();
    const height = props.height || wp(10);
    const width = props.width || '100%'
    const { userDetail } = props;
    const [firstChoice, setFirstChoice] = useState(userDetail?.data?.settings?.unit_of_measure == 'mi' ? true : false);


    const settingFirstChoice = (choice) => setFirstChoice(choice);
    useEffect(() => { if (isFocused) { settingFirstChoice(userDetail?.data?.settings?.unit_of_measure == 'mi' ? true : false) } }, [isFocused]);
    useEffect(() => { settingFirstChoice(userDetail?.data?.settings?.unit_of_measure == 'mi' ? true : false) }, [userDetail?.data?.settings?.unit_of_measure]);

    const { theme, borderColor: { onColor, offColor }, value1, value2, } = props
    useEffect(() => { if (props.OnSwith) { props.OnSwith(firstChoice) } }, [firstChoice]);
    return (<TouchableWithoutFeedback onPress={() => { setFirstChoice(c => !c) }}/*  style={{ position: 'relative',   height: height, width: width,}} */>
        <View style={{
            backgroundColor:/*  on ? onColor : */ theme.TRANSPARENT,
            height: height, width: width, borderColor: theme.LIGHT_GRAY,
            borderWidth: wp(0.5), borderRadius: 4,
            justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
        }}>
            <View style={{
                width: width / 2, borderRadius: 4,
                backgroundColor: theme.MAIN,
                alignSelf: firstChoice ? 'flex-start' : 'flex-end',
                position: 'absolute', top: 0, bottom: 0, left: firstChoice ? 0 : width / 2 - 4
            }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize.N16, fontFamily: font.nunitoBold, fontWeight: '900', color: theme.PARAGRAPH_HEADERS_ICONS }}>{value1}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize.N16, fontFamily: font.nunitoBold, fontWeight: '900', color: theme.PARAGRAPH_HEADERS_ICONS }}>{value2}</Text>
            </View>
        </View>
        {/* 
            <View style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                backgroundColor: on ? onColor : theme.TRANSPARENT,
                height: height, width: width, borderColor: theme.LIGHT_GRAY,
                borderWidth: wp(0.5), borderRadius: 4,
                justifyContent: 'center', alignItems: 'stretch'
            }}>
                <View style={{ height: height - wp(2), width: height - wp(2), borderRadius: 4, backgroundColor: theme.TRANSPARENT, alignSelf: 'flex-end', marginHorizontal: wp(0.5) }} >
                    <Text style={{ fontSize: fontSize.N16, fontFamily: font.nunitoBold, fontWeight: '900', color: theme.PARAGRAPH_HEADERS_ICONS }}>{value1}</Text>
                </View>
                <View style={{ height: height - wp(2), width: height - wp(2), borderRadius: 4, backgroundColor: offColor, alignSelf: 'flex-start', marginHorizontal: wp(0.5) }}  >
                    <Text style={{ fontSize: fontSize.N16, fontFamily: font.nunitoBold, fontWeight: '900', color: theme.PARAGRAPH_HEADERS_ICONS }}>{value2}</Text>
                </View>
            </View> */}
    </TouchableWithoutFeedback>)
}
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { userDetail, } = store.userReducer;
    return {
        theme, userDetail

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //  modalUserInfoOpen: (options) => dispatch(modalUserInfoOpen({ isOpen: true, options: options })),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareSwitcher)
