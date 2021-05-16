
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback, Switch } from 'react-native';
import { wp, } from ' ../../../helper/responsiveScreen';
const SwitcherComponent = (props) => {
    const { initialValue, whenIsOn, onSwitch, externalPressed } = props;
    const height = props.height || wp(10);
    const width = props.width || '100%'
    const [on, setOn] = useState(initialValue ?? undefined);
    const [init, setInit] = useState(false);
    const { theme, borderColor: { onColor, offColor } } = props;
    const settingOn = val => setOn(c => c != val ? val : c);
    const onPressSwitch = () => { setOn(c => !c); setInit(true) }
    useEffect(() => {
        if (on === true) { whenIsOn && whenIsOn(on); }
        init && onSwitch && onSwitch(on);
    }, [on]);

    // useEffect(() => {  onPressSwitch(); }, [externalPressed])
    return (<TouchableWithoutFeedback onPress={() => { onPressSwitch() }} >
        <View style={{
            backgroundColor: on ? onColor : theme.TRANSPARENT,
            height: height, width: width, borderColor: on ? onColor : offColor, borderWidth: wp(0.5), borderRadius: height / 2, justifyContent: 'center', alignItems: 'stretch'
        }}>
            {on == true
                ? <View style={{
                    height: height - wp(2), width: height - wp(2), borderRadius: height / 2,
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, alignSelf: 'flex-end', marginHorizontal: wp(0.5)
                }}>
                </View>
                : <View style={{
                    height: height - wp(2), width: height - wp(2), borderRadius: height / 2,
                    backgroundColor: offColor, alignSelf: 'flex-start', marginHorizontal: wp(0.5)
                }}>
                </View>
            }
        </View>

    </TouchableWithoutFeedback >)
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //  modalUserInfoOpen: (options) => dispatch(modalUserInfoOpen({ isOpen: true, options: options })),
    }
};

const Switcher = connect(mapStateToProps, mapDispatchToProps)(SwitcherComponent)


export const ClassicSwitch1 = (props) => {
    const height = props.height || wp(10);
    const width = props.width || '100%';
    const { initialValue, whenIsOn, onSwitch, externalPressed } = props;
    const [on, setOn] = useState(initialValue ?? undefined);
    const [init, setInit] = useState(false);
    const { theme, borderColor: { onColor, offColor } } = props;

    const settingOn = val => setOn(c => c != val ? val : c);
    const onPressSwitch = () => { setOn(c => !c); setInit(true) }
    useEffect(() => {
        if (on === true) { whenIsOn && whenIsOn(on); }
        init && onSwitch && onSwitch(on);
    }, [on]);

    // useEffect(() => {  onPressSwitch(); }, [externalPressed])
    return (<TouchableWithoutFeedback onPress={() => { onPressSwitch() }} >
        <View style={{
            backgroundColor: theme.TRANSPARENT, height: height, width: width,
            /*  borderColor: on ? onColor : offColor, borderWidth: wp(0.5), */
            borderRadius: height / 2, justifyContent: 'center', alignItems: 'center',

        }}>
            <View View style={{
                position: 'absolute', left: (height / 2), right: (height), bottom: height / 4, top: height / 4,
                backgroundColor: on == true ? offColor : theme.LIGHTEST_DELIMITER,
                height: height / 2, width: width - (height / 2), borderRadius: height / 2,
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
            }} />

            {on == true
                ? <View style={{ flex: 0, alignSelf: 'flex-end', height: height, width: height, borderRadius: height / 2, }}>
                    <View style={{
                        height: height - 2, width: height - 2, borderRadius: (height - 2) / 2,
                        backgroundColor: onColor, alignSelf: 'flex-end', marginHorizontal: 0.5,
                        //  backgroundColor: theme.PRIMARY_BACKGROUND,// "#10aaae",
                        borderStyle: "solid",
                        elevation: 5,
                        shadowColor: onColor,
                        shadowRadius: 5,
                        shadowOpacity: .2,
                        shadowOffset: { width: 0, height: 10 }
                    }}>

                    </View>
                </View>
                : <View style={{ flex: 0, height: height, width: height, borderRadius: height / 2, }}>
                    <View style={{
                        height: height - 2, width: height - 2, borderRadius: (height - 2) / 2,
                        backgroundColor: theme.PRIMARY_BACKGROUND,// "#10aaae",
                        borderStyle: "solid",
                        elevation: 5,
                        shadowColor: theme.LIGHTEST_DELIMITER,
                        shadowRadius: 5,
                        shadowOpacity: .2,
                        shadowOffset: { width: 0, height: 10 }
                    }}>
                        <View style={{ height: height - 2, width: height - 2, borderRadius: (height - 2) / 2, backgroundColor: theme.WHITE, alignSelf: 'flex-start', marginHorizontal: 0.5 }} />
                    </View>
                </View>
            }
        </View>

    </TouchableWithoutFeedback >)
}
export const ClassicSwitch2 = (props) => {
    const height = props.height || wp(10);
    const width = props.width || '100%';
    const { initialValue, whenIsOn, onSwitch, externalPressed } = props;
    const [isEnabled, setIsEnabled] = useState(initialValue ?? undefined);
    const [init, setInit] = useState(false);
    const { theme, borderColor: { onColor, offColor } } = props;

    const settingOn = val => setOn(c => c != val ? val : c);
    const onPressSwitch = () => { setIsEnabled(c => !c); setInit(true) }
    useEffect(() => {
        if (isEnabled === true) { whenIsOn && whenIsOn(isEnabled); }
        init && onSwitch && onSwitch(isEnabled);
    }, [isEnabled]);

    // useEffect(() => {  onPressSwitch(); }, [externalPressed])
    return (<Switch
        trackColor={{ false: theme.DISABLED, true: theme.MAIN }}
        thumbColor={isEnabled ? theme.MAIN : theme.MAIN}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onPressSwitch}
        value={isEnabled}
    />)
}
const mapStateToProps1 = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};

const mapDispatchToProps1 = (dispatch) => {
    return {
        //  modalUserInfoOpen: (options) => dispatch(modalUserInfoOpen({ isOpen: true, options: options })),
    }
};

const SwitcherClassic = connect(mapStateToProps1, mapDispatchToProps1)(ClassicSwitch2)
export { Switcher, SwitcherClassic };
