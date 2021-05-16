import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { Animated, Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, TextInput } from 'react-native';
import { wp, hp } from '../../helper/responsiveScreen';
import { color, fontSize, font } from '../../helper/themeHelper';
import imgAsset from '../../assets/images';

const SelectTextInput = (props) => {
    const [isDroppedDown, setIsDroppedDown] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const [options, setOptions] = useState(props.optionsList || []);

    const inputElement = useRef(null);

    useLayoutEffect(() => { if (props.isFocused) { props.isFocused(true) } }, [])
     

    const onChangeText = (text) => {
        setValue(text);
        const filtered = (query) => options.filter(word => word.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        if (text.length < 1) setOptions([...props.optionsList])
        else setOptions([...filtered(text)]);
    }
    const onBlur = useCallback(() => { if (isDroppedDown && optionsList.indexOf(value) > -1) { setIsDroppedDown(false); } if (props.isFocused) { props.isFocused(false) } }
        , [isDroppedDown, optionsList]);
    const onFocus = () => { setIsDroppedDown(true); if (props.isFocused) { props.isFocused(true) } };

    const { fieldName, optionsList, inputWrapperStyle, fieldNameStyle, inputContainerStyle, inputStyle } = props || {}
    return (<View style={[inputWrapperStyle && inputWrapperStyle]}>
        <Text style={[{ paddingVertical: hp(1), fontSize: fontSize.N16, fontFamily: font.normal, color: color.lightGray2, textAlignVertical: 'center', }, fieldNameStyle && fieldNameStyle]}
        >{fieldName}</Text>

        <KeyboardAvoidingView behavior="padding" >
            <View style={[{ paddingHorizontal: wp(4), color: color.mainColor, borderColor: color.lightGray2, borderWidth: wp(0.5), borderRadius: wp(3), backgroundColor: color.transparent },]}>
                <View style={[{ marginTop: wp(1), minHeight: wp(8), flexDirection: 'row', alignItems: 'stretch', color: color.mainColor, backgroundColor: color.transparent }, inputContainerStyle && inputContainerStyle]}>
                    <TextInput placeholder={''}
                        numberOfLines={1}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'next'}
                        placeholderTextColor={undefined}
                        ref={inputElement}
                        style={[{
                            textAlignVertical: 'top',
                            flex: 1, margin: 0, padding: 0, backgroundColor: color.transparent,
                            fontSize: fontSize.N16, fontFamily: font.normal,
                            minHeight: props.minHeight ? wp(30) : undefined,
                        }, inputStyle && inputStyle]}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    <View style={{ backgroundColor: color.transparent, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', maxWidth: wp(9), textAlignVertical: 'center', }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => setIsDroppedDown(c => !c)}>
                            <Image source={imgAsset['dropDown']} style={{ tintColor: color.mainColor }} resizeMode={'contain'} tintColor={color.mainColor} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ maxHeight: wp(15), marginRight: wp(9), backgroundColor: color.transparent, width: inputElement && inputElement.current && inputElement.current.clientWidth }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                    /*  contentContainerStyle={{ flex: 1 }} */
                    >

                        {isDroppedDown && options && options.length > 0 && options.map((item, index) => {

                            return (<TouchableOpacity key={index} style={{ backgroundColor: color.transparent, paddingVertical: wp(1), borderTopWidth: wp(0.25), borderTopColor: color.lightGray2, }}
                                onPress={() => { onChangeText(item); }}
                            >
                                <Text style={{ fontSize: fontSize.N16, fontFamily: font.normal, }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>

                            )

                        })}

                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>)
};

export { SelectTextInput }; 