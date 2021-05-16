
import React, { useEffect, useState, } from 'react';
import { connect } from "react-redux";
import { modalLoadingOpen, modalLoadingClose } from '../reduxStore/actions/modalAction';
import { setChatPusherEnabled, userRefreshCredentialsRtv, setActiveScreen } from '../reduxStore/actions/userActions';

import { Platform, StyleSheet, Linking, View } from 'react-native';
import { logJson, isIOS, color, font, fontSize, shadowStyle } from "../helper/themeHelper";
import { hp, wp } from '../helper/responsiveScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    SplashScreen, Intro, UserTabbedScreens, MenuTabbedScreens,

} from './screens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { navigationRef, isReadyRef, } from './RootNavigation';
const defPar = { isBack: true, };
const Stack = createStackNavigator();
const defaultOptions = {
    animationEnabled: false,
    swipeEnabled: false,
}
const STACK_PROPS = (props) => <Stack.Navigator headerMode={'none'} keyboardHandlingEnabled={false}
    screenOptions={{ activeTintColor: '#e91e63', removeClippedSubviews: false }}
    initialRouteName={props.initialRouteName ? props.initialRouteName : undefined}>
    {props.children}
</Stack.Navigator >


// Gets the current screen from navigation state
const getActiveRouteName = state => {
    const route = state?.routes[state?.index];
    if (route?.state) {
        // Dive into nested navigators
        return getActiveRouteName(route?.state);
    }
    return route;
    ;
};

const AppContainer = (props) => {
    const previousActiveRouteRef = React.useRef();
    const activeRouteRef = React.useRef();

    const { userDetail, onSetActiveScreen, } = props
    useEffect(() => {
        const state = navigationRef?.current?.getRootState();
        activeRouteRef.current = getActiveRouteName(state);// Save the initial route name  
        return () => {
            console.log('AppContainer unmounted');
            isReadyRef.current = false;
            //     if (removeOnNotificationOpened) { removeOnNotificationOpened() }
            //     if (removeOnNotification) { removeOnNotification() }
            //     if (removeOnTokenRefresh) { removeOnTokenRefresh() }
        }
    }, []);
    var timeout;
    const setTokenRefreshing = (after) => { timeout = setTimeout(() => { }, (+after)); }
    const cancelSetTokenRefreshing = () => { clearTimeout(timeout); }

    // useEffect(() => { cancelSetTokenRefreshing(); setTokenRefreshing((+props.expires_in * 1000)); console.log('New Refresh Token in ', (+props.expires_in * 1000), 's\n') }, [props.expires_in])

    return (<SafeAreaProvider>
        <NavigationContainer
            // initialState={initialState}
            ref={navigationRef}
            removeClippedSubviews={false}
            onStateChange={state => {
                const previousActiveRoute = activeRouteRef.current;
                const currentRoute = getActiveRouteName(state);
                if (previousActiveRoute !== activeRouteRef) {
                    // console.log('NavigationContainer previousActive: -> ', previousActiveRoute);
                    console.log('NavigationContainer active: -> ', currentRoute);
                    onSetActiveScreen(currentRoute.name);

                }
                // Save the current route name for later comparision
                activeRouteRef.current = currentRoute;
                previousActiveRouteRef.current = previousActiveRoute;

            }}
            onReady={() => { isReadyRef.current = true; }}
        >
            <STACK_PROPS initialRouteName='SplashScreen'>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={({ navigation, route }) => ({ backBehavior: 'order', ...defaultOptions, })}
                    initialParams={{ itemId: 'SplashScreen' }} />
                <Stack.Screen name="Intro" component={Intro} options={({ navigation, route }) => ({ backBehavior: 'order', ...defaultOptions, })}
                    initialParams={{ itemId: 'Intro' }} />
                <Stack.Screen name="UserTabbedScreens" component={UserTabbedScreens} options={({ navigation, route }) => ({ backBehavior: 'order', ...defaultOptions, })}
                    initialParams={{ itemId: 'UserTabbedScreens' }} />

            </STACK_PROPS>
        </NavigationContainer>
    </SafeAreaProvider >
    );
}


const mapStateToProps = (store) => {
    const { theme, last_credentials } = store.appReducer;
    const { userDetail, credentials: { expires_in, access_token }, } = store.userReducer;
    return { theme, userDetail, expires_in, last_credentials, access_token };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onModalLoadingOpen: (options) => dispatch(modalLoadingOpen({ isOpen: true, options: options })),
        onModalLoadingClose: () => dispatch(modalLoadingClose()),

        onSetActiveScreen: (screenName) => dispatch(setActiveScreen(screenName)),


    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)