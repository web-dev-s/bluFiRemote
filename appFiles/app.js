import React, { useEffect } from 'react';
import { StatusBar, View, LogBox, } from 'react-native';
import { isIOS } from './helper/themeHelper';
import AppContainer from './navigation/stackNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/store';
//import Amplify, { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify';
//import awsConfig from '../aws-exports';


LogBox.ignoreLogs(['Animated: `useNativeDriver`',
    'VirtualizedLists should never be nested',
    'componentWillMount',
    'componentWillReceiveProps',
    'Require cycle:',
    'AsyncStorage has been extracted',
    'Can\'t perform a React state update on an unmounted component',
    'Setting a timer for a long period of time'
]);

export default App = (props) => {
    useEffect(() => { console.log('App mounted.: '); return () => { } }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={{ flex: 1, margin: 0 /* marginTop: (Platform.OS === 'ios') ? hp(3) :hp(0), */ }}>
                    <StatusBar hidden={false} backgroundColor={'black'} barStyle={isIOS ? "dark-content" : 'white-content'} />
                    <AppContainer />
                </View>
            </PersistGate>
        </Provider>
    );

}