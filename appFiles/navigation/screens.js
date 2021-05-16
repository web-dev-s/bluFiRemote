import React, { useState, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, Linking, View, Text, Button, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color, font, fontSize, isIOS, shadowStyle } from "../helper/themeHelper";
import { hp, wp } from '../helper/responsiveScreen';
import { store } from '../reduxStore/store';
import { modalBlockContactOpen } from '../reduxStore/actions/modalAction';
import LoadingModal from '../screens/common/modalComponents/LoadingModal';


import SplashScreen from '../screens/components/splashScreen';
import Intro from '../screens/components/Intro';

import ControlsScreen from '../screens/components/tabedEntries/controlsScreen';
import SystemScreen from '../screens/components/tabedEntries/systemScreen';
import SettingsScreen from '../screens/components/tabedEntries/settingsScreen';
import StatisticsScreen from '../screens/components/tabedEntries/statisticsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabBar from './tabBars/mainTabBar';
import SecondaryTabBarMenu from './tabBars/secondaryTabBar';

const defaultOptions = {
   animationEnabled: false,
   swipeEnabled: false
}

const MenuTab = createBottomTabNavigator();
const MenuTabbedScreens = (props) => {
   return (
      <MenuTab.Navigator tabBar={props => <SecondaryTabBarMenu  {...props} />} tabBarOptions={{ style: { elevation: 3, shadowOpacity: 4, borderTopWidth: wp(1), borderTopColor: store.getState().appReducer.theme.PARAGRAPH_HEADERS_ICONS } }} keyboardHandlingEnabled={false}
         screenOptions={{ activeTintColor: '#e91e63', removeClippedSubviews: false }}
         initialRouteName={'MenuSettingsScreens'} >
         <MenuTab.Screen name="MenuSettingsScreens" component={MenuSettingsScreens} options={({ navigation, route }) => ({ tabBarLabel: 'Menu', ...defaultOptions })} />
      </MenuTab.Navigator >
   );
}


const Tab = createBottomTabNavigator();
const UserTabbedScreens = (props) => {
   const getTabBarVisibility = (route) => {
      const routeName = route.state ? route.state.routes[route.state.index].name : '';

      if (['ControlsScreen', 'SettingsScreen', 'StatisticsScreen'].indexOf(routeName) > -1) {
         //   console.log('UserTabbedScreens return false', route.state)
         return false;
      }
      return true;
   };

   return (
      <Tab.Navigator tabBar={props => <MainTabBar {...props} />} tabBarOptions={{ style: { elevation: 3, shadowOpacity: 4, borderTopWidth: wp(1), borderTopColor: color.mainColor } }} keyboardHandlingEnabled={false}
         screenOptions={{ activeTintColor: '#e91e63', removeClippedSubviews: false }}
         initialRouteName={'ControlsScreen'} >
         <Tab.Screen name="ControlsScreen" component={ControlsScreen} options={({ navigation, route }) => ({ tabBarLabel: 'Controls', ...defaultOptions })} />
         <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={({ navigation, route }) => ({ tabBarLabel: 'Settings', ...defaultOptions })} />
         <Tab.Screen name="StatisticsScreen" component={StatisticsScreen} options={({ navigation, route }) => ({ tabBarLabel: 'Statistics', ...defaultOptions })} />
         <Tab.Screen name="SystemScreen" component={SystemScreen} options={({ navigation, route }) => ({ tabBarLabel: 'System', ...defaultOptions })} />
      </Tab.Navigator >
   );
}

export {
   SplashScreen,
   Intro,
   UserTabbedScreens,
   MenuTabbedScreens,

};