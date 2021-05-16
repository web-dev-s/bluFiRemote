import React, { useRef, useLayoutEffect, useState, useMemo, useCallback, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, PanResponder, Animated, Easing, Alert } from 'react-native';
import { connect } from "react-redux";
import { wp, hp } from '../../helper/responsiveScreen';
import { screenWidth, logJson, fontSize, font, isIOS } from '../../helper/themeHelper';
import { noUrlOnAvatar } from '../../helper/appHelper';
const Height = '100%';
const Width = screenWidth;
const TriggerVDelta = wp('15%');
const FORCE_TO_OPEN_THRESHOLD = screenWidth / 3.5;
const SCROLL_THRESHOLD = screenWidth / 15;
const FORCING_DURATION = 350;
const touchThreshold = 20;

const SwippeableItem = (props) => {
    const { theme, navigation, item, blockedProfileIds } = props;
    const position = useRef(new Animated.ValueXY());
    const [itemIsBlockedUser, setItemIsBlockedUser] = useState(false);
    useEffect(() => { if (blockedProfileIds?.indexOf(item?.user1?.profile_id) > -1) { setItemIsBlockedUser(true) } else { setItemIsBlockedUser(false) } }, [item, blockedProfileIds]);
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (e, gestureState) => {
            const { dx, dy } = gestureState;
            return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
        },
        onStartShouldSetPanResponderCapture: () => { return false },
        //onMoveShouldSetPanResponderCapture: () => false,
        onResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
            //  position.current.setOffset({ x: position.current.x._value, y: 0 });
            position.current.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (event, gesture) => {
            //    position.current.setOffset({ x: position.current.x._value, y: 0 });
            // if (gesture.dx >= SCROLL_THRESHOLD) {
            //     setEnableScrollView(true);
            //     const x = gesture.dx - SCROLL_THRESHOLD;
            //     position.current.setValue({ x: gesture.dx, y: 0 });
            // } else if (gesture.dx <= -SCROLL_THRESHOLD) {
            //     setEnableScrollView(true);
            //     const x = gesture.dx + SCROLL_THRESHOLD;
            //     position.current.setValue({ x: gesture.dx, y: 0 });
            // }
            //  Animated.event([null, { dx: gesture.dx, dy: 0 }], { useNativeDriver: true, listener: handleResponderMove },);
            position.current.setValue({ x: gesture.dx, y: 0 });
        },
        onPanResponderRelease: (event, gesture) => {

            if (gesture.dx > 0) { userSwipedRight(gesture); }
            else if (gesture.dx < 0) { userSwipedLeft(gesture); }
            resetPosition();
        },
        onPanResponderTerminate: () => { resetPosition(); }
    }), []);

    const resetPosition = () => {
        Animated.timing(position.current, { toValue: { x: 0, y: 0 }, duration: 200 }).start();
        position.current.setValue({ x: 0, y: 0 });
        position.current.setOffset({ x: 0, y: 0 });
        position.current.resetAnimation();
    }
    const deleteItemFromChat = useCallback(() => { }, [item]);
    const completeSwipe = (dimension, callback) => {
        const x = dimension === 'right' ? screenWidth : -screenWidth;
        Animated.timing(position.current, {
            toValue: { x, y: 0 }, duration: FORCING_DURATION
        }).start(() => {
            Alert.alert(
                `Delete conversation with ${item.user1.name}`,
                `Do you want to delete this conversation with ${item.user1.name}?`,
                [
                    { text: 'Yes', onPress: () => deleteItemFromChat() },
                    { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                ],
                { cancelable: true }
            );
        });
        callback();
    }
    const userSwipedRight = (gesture) => {
        if (gesture.dx >= FORCE_TO_OPEN_THRESHOLD) {
            completeSwipe('right', () => { console.log('Complete Swipe'); /*  */ });
        } else {
            resetPosition();
        }
    }
    const userSwipedLeft = (gesture) => { console.log('Swipped Left') }
    const handleResponderMove = useCallback((ev) => {
        // console.log('-----handleResponderMove:', ev.nativeEvent.locationY);
    });
    const openTheNewChatDialog = useCallback(() => {
        //  console.log('Open Chat Dialog', item);
        if (itemIsBlockedUser == true) return Alert.alert(
            `Blocked`,
            `User ${item.user1.name} was blocked!\nCan unblock ${item.user1.name} in Blockes List Menu`,
            [
                // { text: 'Yes', onPress: () => prov_deleteInRooms(item.roomId) },
                { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
            ],
            { cancelable: true }
        );
        navigation.navigate('ChatDialogScreens', { screen: 'ChatRoom', params: { fromMatch: false, profile: { ...item.user1, _id: item?.user1?.profile_id || item?.user1?._id } } });
    }, [item, itemIsBlockedUser])
    const radius = wp(11);
    const styles = StyleSheet.create({
        containerStyle: {},
        categoryContainerStyle: { paddingTop: wp(4), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: hp(1) },
        categoryTextStyle: { fontFamily: font.normal, fontSize: fontSize.N18, fontWeight: '900', textAlign: 'left' },
        roomsContainerStyle: { maxHeight: hp('45%'), width: '100%' },
        roomContainerStyle: { position: 'relative', marginVertical: wp(2), marginHorizontal: wp(3), paddingBottom: wp(5), },
        roomAvatarContainerStyle: { position: 'relative', flex: 1.25, justifyContent: 'center', alignItems: 'center', borderWidth: wp(1) },
        roomAvatarUnreadMsgCountContainer: { justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: -wp(6.5), width: wp(8), height: wp(8), borderRadius: wp(4), borderWidth: wp(1.2), },
        roomAvatarUnreadMsgCount: { fontFamily: font.nunitoBold, fontWeight: '900', fontSize: fontSize.N12, },
        roomTextWrapperStyle: { flex: 5, marginHorizontal: wp(4), justifyContent: 'flex-start', },
        roomTextContainerStyle: { marginTop: hp(1), marginLeft: wp(2), },
        roomUseNameStyle: { fontFamily: font.nunitoBold, fontSize: fontSize.N18, fontWeight: '900', },
        roomLastMessageStyle: { fontFamily: font.nunitoRegular, fontSize: itemIsBlockedUser ? fontSize.N16 : fontSize.N18, fontWeight: '900', fontStyle: itemIsBlockedUser ? 'italic' : 'normal', color: itemIsBlockedUser ? theme.MESSAGE : theme.DARK_GRAY },
        roomUserRateContainerStyle: { flex: 0.9, justifyContent: 'center', alignItems: 'center', width: wp(12), height: wp(12), borderRadius: wp(6), borderWidth: wp(1.25), },
        roomUserRateStyle: { fontFamily: font.nunitoBlack, fontSize: fontSize.N26, fontWeight: '900', }
    }); const { roomContainerStyle, roomAvatarContainerStyle, roomAvatarUnreadMsgCountContainer,
        roomAvatarUnreadMsgCount, roomTextWrapperStyle, roomTextContainerStyle,
        roomUseNameStyle, roomLastMessageStyle,
        roomUserRateContainerStyle, roomUserRateStyle } = styles;
    return (
        <Animated.View style={[{ flex: 1, /* ...position.current.getLayout(), */ transform: position.current.getTranslateTransform(), }]}
            {...panResponder.panHandlers}>
            <TouchableOpacity onPress={() => { openTheNewChatDialog(); }} style={roomContainerStyle} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={[roomAvatarContainerStyle, {
                        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, borderColor: theme.PRIMARY_BACKGROUND_COLOR,
                        width: radius * 2 - wp(1) || wp(10),
                        height: radius * 2 - wp(1) || wp(10),
                        borderRadius: radius - wp(1) || wp(5),
                    }]}>
                        <Image source={item?.user1?.avatar ? { uri: item?.user1?.avatar } : { uri: noUrlOnAvatar }} style={{ height: radius * 2 - wp(2), width: radius * 2 - wp(2), borderRadius: radius * 2 - wp(2), }} resizeMode={'contain'} />
                        {(+item?.pendingMesages) > 0 &&
                            <View style={[roomAvatarUnreadMsgCountContainer, { backgroundColor: theme.ACCENT, borderColor: theme.PRIMARY_BACKGROUND_COLOR, }]}>
                                <Text style={[roomAvatarUnreadMsgCount, { color: theme.PRIMARY_BACKGROUND_COLOR }]}>{item?.pendingMesages}</Text>
                            </View>
                        }
                    </View>
                    <View style={roomTextWrapperStyle}>
                        <View style={roomTextContainerStyle}>
                            <Text style={[roomUseNameStyle, { color: theme.PARAGRAPH_HEADERS_ICONS }]}>{item.user1.name}</Text>
                            <Text style={[roomLastMessageStyle]} numberOfLines={1} ellipsizeMode='tail'
                            >{itemIsBlockedUser ? 'Blocked' : item?.lastMessage}{/* {lastMessage} */}</Text>
                        </View>
                    </View>
                    <View style={[roomUserRateContainerStyle, { borderColor: theme.ACCENT, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, }]}>
                        <Text style={[roomUserRateStyle, { color: theme.ACCENT }]}>{item?.user1?.average_score?.split('.')[0]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    const { conversations } = store.chatReducer;
    const { userDetail, blockedProfileIds } = store.userReducer;

    return {
        theme,
        conversations,
        userDetail, blockedProfileIds,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SwippeableItem);
