import React, { useState, useEffect, useRef, } from 'react';
import { connect } from 'react-redux'
import { wp, hp } from '../../helper/responsiveScreen';
import { isIOS, isANDROID, font, fontSize, color } from '../../helper/themeHelper';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, FlatList, TouchableOpacity, Keyboard, Animated } from 'react-native';
import imgAsset from '../../assets/images';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const SuggestionsInputComponent = (props) => {
    const { theme, containerStyle, fieldName, fieldNameStyle, optionsList, placeHolder, value, onChangeText, onBlur, onTouch, } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [chooser, setChooser] = useState(false);
    const [options, setOptions] = useState([...optionsList]);
    const [lastTextValue, setLastTextValue] = useState(value);
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    const settingOptions = (value) => { setOptions(value) }
    useEffect(() => {
        if (value?.length > 1) { settingOptions([...findSuggestions(value)]) }
        else settingOptions([...optionsList])
    }, [value]);
    const findSuggestions = (suggestion) => {
        const theArray = [...optionsList];
        let filteredWords = []
        if (suggestion?.length > 0) {
            let searchField = suggestion.toLowerCase();
            for (let i = 0; i < theArray?.length || 0; i++) {
                if (theArray[i].toLowerCase().includes(searchField)) {
                    filteredWords.push(theArray[i]);
                }
                else { //verify if items contains '/' separated charatcters (for continent/country)
                    if (theArray[i].toLowerCase().indexOf('/') > -1) {
                        const first = theArray[i].toLowerCase().split('/')[0]
                        const second = theArray[i].toLowerCase().split('/')[1]
                        if (first.includes(searchField) || second.includes(searchField)) {
                            filteredWords.push(theArray[i]);
                        }
                    }
                }
            }
        }
        return filteredWords;
    }

    const OnChange = (txt) => {
        if (txt?.length === 0) { setOptions([...optionsList]) }
        (txt?.length > -1) && onChangeText(txt);
    };
    const onDropPress = (item) => { setChooser(false); onChangeText(item); }
    const OnBlurTextInput = () => {/*  if (props.isValid) { setIsFocused(false); setChooser(false); setOptions([...optionsList]) } */ onBlur && onBlur(); };
    const onFocusTextInput = () => { setOptions([...optionsList]); setIsFocused(true); setChooser(true); onTouch && onTouch() };

    const styles = StyleSheet.create({
        wrapperS: { flex: 0, marginTop: hp(2) },
        fieldStyle: { flexDirection: 'row', alignItems: 'center' },
        inputLeftIconStyle: { marginLeft: wp(5), height: hp('4%'), width: hp('4%'), tintColor: theme.SHADED_TEXT, },
        itemTextContainerStyle: { flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', textAlign: 'center' },
        itemTextStyle: { textAlign: 'center', fontWeight: '900', fontFamily: font.nunitoExtraBold, color: theme.DARK_GRAY, fontSize: fontSize.N28 },
        textInputStyle: { minHeight: isIOS ? hp(5) : hp(2), fontSize: fontSize.N16, fontFamily: font.nunitoBold, color: theme.DARK_GRAY, },
        inputLabel: { fontFamily: font.roundedRegular, fontSize: fontSize.N10, color: theme.DARK_GRAY, fontWeight: '900', marginBottom: 3 },
        redAlert: { borderColor: theme.ERROR.red, borderWidth: wp(0.65), borderRadius: wp(20) },
        underlined: { textDecorationLine: 'underline', },
        lightTextStyle: { color: theme.SHADED_TEXT, fontSize: fontSize.N15, }
    });

    const { wrapperS, fieldStyle, textInputStyle, itemTextContainerStyle, itemTextStyle } = styles;
    return (
        <View style={[wrapperS, containerStyle]}>
            <Text style={{ paddingVertical: hp(1), fontSize: fontSize.N16, fontFamily: font.nunitoBold, color: theme.DARK_GRAY, textAlignVertical: 'center', }}
            >{fieldName}</Text>
            <View style={{ color: theme.DARK_GRAY, borderColor: theme.SECONDARY_TEXT_COLOR_LIGHT, fontSize: fontSize.N16, fontFamily: font.nunitoBold, borderWidth: wp(0.5), borderRadius: wp(3), paddingHorizontal: wp(4), textAlignVertical: 'top', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: color.transparent }}>
                {
                    chooser && <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, maxHeight: hp(15), justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList data={options}
                                nestedScrollEnabled={true} scrollsToTop={false}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.toString()}
                                scrollEnabled={true}
                                onScrollBeginDrag={isANDROID && Keyboard.dismiss}
                                initialScrollIndex={options.indexOf(lastTextValue) || findSuggestions(lastTextValue)?.length > 0 ? findSuggestions(lastTextValue)[0] : 0}
                                initialNumToRender={4}
                                onEndReachedThreshold={0.7}
                                windowSize={10}
                                extraData={{ ...props }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => onDropPress(item)} style={[itemTextContainerStyle]} >
                                            <Text style={[itemTextStyle, { fontFamily: item == lastTextValue ? font.nunitoBold : font.nunitoRegular, fontWeight: item == value ? '900' : '400', marginVertical: wp(2), fontSize: fontSize.N16, borderBottomWidth: (index === options.length - 1) ? 0 : wp(0.25), borderBottomColor: theme.PRIMARY_TEXT }]}
                                            >{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                        </View>
                    </View>
                }
                <KeyboardAvoidingView>
                    <View style={[fieldStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={{ flex: 1 }}>
                            <TextInput placeholder={!isFocused ? placeHolder : ''}
                                numberOfLines={1}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType={'next'}
                                placeholderTextColor={theme.PRIMARY_TEXT}
                                style={[textInputStyle, {}]}
                                value={value}
                                onChangeText={OnChange}
                                onBlur={OnBlurTextInput}
                                onFocus={() => { onFocusTextInput(true) }}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: wp(0), }}>
                            <TouchableOpacity onPress={() => { setChooser(c => !c); }}
                                style={{ width: wp(6), height: wp(6) }} >
                                <Image source={chooser ? imgAsset['dropup'] : imgAsset['location']}
                                    style={{ height: '100%', width: '100%', tintColor: theme.MAIN, resizeMode: 'contain' }}
                                    tintColor={theme.MAIN}
                                    resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View >
    )
}
const mapStateToProps = (store) => {
    const { userDetail } = store.userReducer;
    const { safeArea, theme } = store.appReducer;
    return { theme, userDetail, };
};

const SuggestionsInput = connect(mapStateToProps, null)(SuggestionsInputComponent);
export { SuggestionsInput };