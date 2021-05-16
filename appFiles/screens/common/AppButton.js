import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { font, fontSize, color } from '../../helper/themeHelper';
import { wp, } from '../../helper/responsiveScreen';

const AppButton = (props) => {

    const { theme, standard, light, containerStyle,
        leftImage, leftImageStyle, leftImageTintColor,
        textContainerStyle,
        disabled, loading, colorIndicator, onPress,
        title, title1, textStyle1, title2, title3, textStyle,
        rightImage, rightImageStyle, rightImageTintColor, leftImageContainer, rightImageContainer } = props;

    const { btnOuter, btnContainer, lightStyle, textContainer, btnText, standardButtonStyle, } = styles(theme);

    return (
        <TouchableOpacity style={[btnOuter,
            standard && standardButtonStyle,
            light && lightStyle,
            containerStyle && containerStyle,
            disabled && { backgroundColor: disabled ? theme.DISABLED : theme.MAIN }]}
            onPress={(e) => { if (!disabled && !loading) return onPress(e) }}>
            <View style={btnContainer}>

                <View style={[{ width: 56, height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: color.mainColorBorder, borderRadius: wp(10), }, leftImageContainer && leftImageContainer]}>
                    {(leftImage) &&
                        < Image source={leftImage}
                            style={[{ height: '100%', width: '100%', }, leftImageStyle && leftImageStyle]}
                            tintColor={leftImageTintColor && leftImageTintColor || undefined}
                            resizeMode={'contain'}
                        />
                    }
                </View>

                <View style={[textContainer, textContainerStyle && textContainerStyle,]}>



                    {loading ? <ActivityIndicator color={colorIndicator ? colorIndicator : color.white} />
                        : <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: wp(0) }}>
                            <Text style={[btnText,
                                standard && { fontSize: fontSize.N18, },
                                light ? { color: color.mainColor } : { color: color.white },
                                textStyle && textStyle]}
                            >
                                {title}
                                {(title1) &&
                                    <Text style={[, textStyle1 && textStyle1]}>
                                        {title1}
                                    </Text>
                                }
                            </Text>
                            {title2 && <Text style={[btnText,
                                standard && { fontSize: fontSize.N15 },
                                light ? { color: color.mainColor } : { color: color.white },
                                textStyle && textStyle]}
                            // numberOfLines={1}
                            >
                                {title2}
                                {(title3) &&
                                    <Text style={textStyle1 && textStyle1}>
                                        {title3}
                                    </Text>
                                }
                            </Text>}
                        </View>
                    }
                </View>

                <View style={[{ width: 56, height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: color.mainColorBorder, borderRadius: wp(10), }, rightImageContainer && rightImageContainer]}>
                    {
                        (rightImage) && <Image source={rightImage}
                            style={[{ height: '100%', width: '100%', }, rightImageStyle && rightImageStyle]}
                            tintColor={rightImageTintColor && rightImageTintColor || undefined}
                            resizeMode={'contain'}
                        />
                    }
                </View>

            </View>
        </TouchableOpacity >
    )
};

const styles = StyleSheet.create((theme) => ({
    btnOuter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: color.mainColor, borderColor: color.mainColorBorder, borderWidth: wp(1), borderRadius: wp(10), paddingVertical: 0, marginVertical: 0, height: 55.5, borderWidth: 0.5, },
    btnContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    textContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    btnText: { color: theme.PRIMARY_BACKGROUND_COLOR, fontFamily: font.josefinSansBold, fontWeight: '700', fontSize: fontSize.N18, textAlign: 'center', fontWeight: '900' },
    standardButtonStyle: { marginVertical: 0, marginTop: 8, height: 56, borderWidth: 0, width: '100%', paddingVertical: 2, alignItems: 'center', textAlign: 'center' },
    lightStyle: { borderRadius: wp(10), borderWidth: wp(0.75), borderColor: color.mainColor },
    backButtonImageStyle: { tintColor: color.white, marginLeft: wp(20), width: wp(5), height: wp(5), justifyContent: 'center' },
    whiteBlueButtonStyle: { backgroundColor: color.white, borderRadius: 8, borderWidth: wp(0.75), borderColor: color.blue },
}));
const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(AppButton);
