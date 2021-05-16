import React, { useState, memo, useMemo, useEffect } from 'react';
import { Image, StyleSheet, View, Text, AppRegistry, Switch } from 'react-native';
import { connect } from "react-redux";
import { setInSettingsScreen } from '../../../reduxStore/actions/appAction';
import { wp, hp } from '../../../helper/responsiveScreen';
import { color, fontSize, font, isIOS, } from '../../../helper/themeHelper';
import imgAsset from '../../../assets/images';
import {
    CardSwitchOption, RenderSwitchOption, RenderSwitchOptionMod,
    CardSliderOption, RenderSliderOption
} from '../../common';

import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const SettingsScreen = ({ route, scrollX, ...props }) => {
    const { theme, settingsScreen, onSetInSettingsScreen } = props;
    const [cardsRender, setCardsRender] = useState(true);
    const { wrapperStyle, } = styles(theme);

    const {
        mode, oscilationSpeed, sleepTime, stopMovementBeforeWakeUp, timeOn, timeOff, stopMovementAfterAsleep,
    } = settingsScreen
    return (<KeyboardAvoidingScrollView style={{ flex: 1, width: wp('100%'), backgroundColor: theme.SECONDARY_BACKGROUND, }}
        nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        <View style={[wrapperStyle]}>
            <RenderSwitchOptionMod title={'Display card render'}
                description={'Switch between render modes'}
                initialValue={cardsRender}
                onSwitching={(val) => { console.log('RenderSwitchOption1 switched to ', val); setCardsRender(val) }} />
            {cardsRender
                ? <View>
                    <CardSwitchOption title={`Mode `}
                        description={`Switch between Manual and Auto mode. \nCurrently setted on is ${mode == 2 ? 'Auto' : mode == 1 ? 'Manual' : '-not setted-'}`} initialValue={mode == 2 ? true : false}
                        onSwitching={(val) => { console.log('onSwitching', val); onSetInSettingsScreen({ mode: val ? 2 : 1 }) }} />
                    <CardSliderOption title={'Bed Oscilation'} description={'Sets the bed movement / oscillation speed. '}
                        minVal={0}
                        maxVal={100} intervalHide={10}
                        radiusValue={10}
                        sliderWidth={wp('85%')}
                        initialVal={oscilationSpeed}
                        onSlideEnd={(val) => onSetInSettingsScreen({ oscilationSpeed: val })} />

                    <CardSliderOption title={'Sleep Time'} description={'Sets the wake up time . '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={sleepTime}
                        onSlideEnd={(val) => onSetInSettingsScreen({ sleepTime: val })} />
                    <CardSliderOption title={'Stop movement before wake up '}
                        description={`Sets the time for switching off the bed movement at a selected number of minutes before wake up.`}
                        minVal={0}
                        maxVal={60} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={stopMovementBeforeWakeUp}
                        onSlideEnd={(val) => onSetInSettingsScreen({ stopMovementBeforeWakeUp: val })} />
                    {mode == 1 && <CardSliderOption title={'Time On'} description={'Indicates the amount of time the bed motion is on. '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={timeOn}
                        onSlideEnd={(val) => onSetInSettingsScreen({ timeOn: val })} />
                    }
                    {mode == 1 && <CardSliderOption title={'Time Off'} description={'Indicates the amount of time the bed motion is off. '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={timeOff}
                        onSlideEnd={(val) => onSetInSettingsScreen({ timeOff: val })} />
                    }
                    {mode == 2 && <CardSliderOption title={'Stop movement after asleep '}
                        description={`Switch off the bed movement after the selected number of minutes, provided there is no user movement. Anything larger than 90 minutes implies: “never switch off”`}
                        minVal={10}
                        maxVal={90}
                        intervalHide={6}
                        radiusValue={10}
                        sliderWidth={wp('85%')}
                        initialVal={stopMovementAfterAsleep}
                        onSlideEnd={(val) => onSetInSettingsScreen({ stopMovementAfterAsleep: val })} />
                    }
                </View>
                : <View>
                    <RenderSwitchOption title={`Mode `}
                        description={`Switch between Manual and Auto mode. \nCurrently setted on is ${mode == 2 ? 'Auto' : mode == 1 ? 'Manual' : '-not setted-'}`} initialValue={mode == 2 ? true : false}
                        onSwitching={(val) => { console.log('onSwitching', val); onSetInSettingsScreen({ mode: val ? 2 : 1 }) }} />
                    <RenderSliderOption title={'Bed Oscilation'} description={'Sets the bed movement / oscillation speed. '}
                        minVal={0}
                        maxVal={100} intervalHide={10}
                        radiusValue={10}
                        sliderWidth={wp('85%')}
                        initialVal={oscilationSpeed}
                        onSlideEnd={(val) => onSetInSettingsScreen({ oscilationSpeed: val })} />

                    <RenderSliderOption title={'Sleep Time'} description={'Sets the wake up time . '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={sleepTime}
                        onSlideEnd={(val) => onSetInSettingsScreen({ sleepTime: val })} />
                    <RenderSliderOption title={'Stop movement before wake up '}
                        description={`Sets the time for switching off the bed movement at a selected number of minutes before wake up.`}
                        minVal={0}
                        maxVal={60} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={stopMovementBeforeWakeUp}
                        onSlideEnd={(val) => onSetInSettingsScreen({ stopMovementBeforeWakeUp: val })} />
                    {mode == 1 && <RenderSliderOption title={'Time On'} description={'Indicates the amount of time the bed motion is on. '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={timeOn}
                        onSlideEnd={(val) => onSetInSettingsScreen({ timeOn: val })} />
                    }
                    {mode == 1 && <RenderSliderOption title={'Time Off'} description={'Indicates the amount of time the bed motion is off. '}
                        minVal={0}
                        maxVal={24} intervalHide={1}
                        radiusValue={10} sliderWidth={wp('85%')}
                        initialVal={timeOff}
                        onSlideEnd={(val) => onSetInSettingsScreen({ timeOff: val })} />
                    }
                    {mode == 2 && <RenderSliderOption title={'Stop movement after asleep '}
                        description={`Switch off the bed movement after the selected number of minutes, provided there is no user movement. Anything larger than 90 minutes implies: “never switch off”`}
                        minVal={10}
                        maxVal={90}
                        intervalHide={6}
                        radiusValue={10}
                        sliderWidth={wp('85%')}
                        initialVal={stopMovementAfterAsleep}
                        onSlideEnd={(val) => onSetInSettingsScreen({ stopMovementAfterAsleep: val })} />
                    }
                </View >}
        </View>
    </KeyboardAvoidingScrollView >
    );
}

const styles = StyleSheet.create(theme => ({
    wrapperStyle: {
        flex: 1, backgroundColor: color.appBackground,
        alignItems: 'stretch', justifyContent: 'space-between',
        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, color: theme.PRIMARY_TEXT_COLOR, marginBottom: hp('20%')
    },
    containerStyle: { justifyContent: 'space-around', flex: 1 },
    logoStyle: { width: wp('55%'), marginTop: hp('22%'), alignSelf: 'center' },
    rSContStyle: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', paddingHorizontal: wp(2), marginVertical: wp(7), paddingTop: isIOS ? hp(3) : 0, marginRight: wp(2), width: wp('20%'), zIndex: 3 },
    userDContStyle: { zIndex: 5, position: 'absolute', bottom: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp('2%'), marginBottom: 0 }
}));
const mapStateToProps = (store) => {

    const { theme, settingsScreen } = store.appReducer;
    return {
        theme, settingsScreen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetInSettingsScreen: option => dispatch(setInSettingsScreen(option)),
    }
};
AppRegistry.registerComponent('SettingsScreen', () => SettingsScreen);
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);