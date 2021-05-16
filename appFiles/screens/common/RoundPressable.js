import React from 'react';
import { connect } from "react-redux";
import { Pressable, Text, AppRegistry, } from 'react-native';
import { font, fontSize } from '../../helper/themeHelper';

const RoundPressable = (props) => {
    const { label, onPress, style, textStyle, isActive, color, theme } = props;

    return (<Pressable onPress={onPress}
        style={{
            width: 75, height: 75, borderRadius: 75, backgroundColor: isActive ? 'green' : color ? color : 'white',
            flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            ...style
        }}>
        <Text style={{
            fontSize: fontSize.N32, fontFamily: font.nunitoBlack, color: theme.BLACK, fontWeight: '900',
            textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, //textShadowColor: theme.PARAGRAPH_HEADERS_ICONS,
            ...textStyle
        }} numberOfLines={1} adjustsFontSizeToFit allowFontScaling >{label}</Text>
    </Pressable >)
}

const mapStateToProps = (store) => {
    const { theme, } = store.appReducer;
    return { theme, };
};
export default connect(mapStateToProps, null)(RoundPressable);
