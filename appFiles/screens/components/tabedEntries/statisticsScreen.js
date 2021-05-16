import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Pressable, Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Animated, PanResponder, ScrollView, AppRegistry, Keyboard } from 'react-native';
import { connect } from "react-redux";
import {
    modalScoredFlashingOpen, modalLoadingOpen, modalLoadingClose, modalUserInfoOpen,
    modalNoScoresOpen, modalNoScoresClose
} from '../../../reduxStore/actions/modalAction';
import { getScoreSuggestionsRtv } from '../../../reduxStore/actions/userActions';
import { wp, hp } from '../../../helper/responsiveScreen';
import { fullScreenHeight, screenHeight, screenWidth, color, fontSize, font, isIOS, shadowStyle } from '../../../helper/themeHelper';
import { Loading } from '../../common'
import * as Progress from 'react-native-progress';
import imgAsset from '../../../assets/images';
import { AppButton, SlideImages, RatingSlider, /* NoScoresModal, */ ScoredFlashingModal, UserInfoModal, UserDescription } from '../../common';
import { ThemeProvider, useIsFocused } from '@react-navigation/native';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Modal from 'react-native-modal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const bm = {
    superb: ["2021-05-01", "2021-05-06", "2021-05-11", "2021-05-14", "2021-05-18", "2021-05-20", "2021-05-25", "2021-05-22",],
    good: ["2021-05-02", "2021-05-05", "2021-05-09", "2021-05-12", "2021-05-17", "2021-05-21", "2021-05-31", "2021-05-27",],
    average: ["2021-05-03", "2021-05-07", "2021-05-13", "2021-05-15", "2021-05-19", "2021-05-24", "2021-05-28",],
    bad: ["2021-05-04", "2021-05-08", "2021-05-10", "2021-05-16", "2021-05-23", "2021-05-26", "2021-05-29", "2021-05-30",],
}
const um = {
    superb: ["2021-05-01", "2021-05-05", "2021-05-07", "2021-05-12", "2021-05-17", "2021-05-23", "2021-05-28", "2021-05-31", "2021-05-30",],
    good: ["2021-05-03", "2021-05-08", "2021-05-09", "2021-05-11", "2021-05-18", "2021-05-19", "2021-05-25", "2021-05-29",],
    average: ["2021-05-04", "2021-05-10", "2021-05-15", "2021-05-16", "2021-05-21", "2021-05-22", "2021-05-26",],
    bad: ["2021-05-02", "2021-05-06", "2021-05-13", "2021-05-14", "2021-05-20", "2021-05-24", "2021-05-27",],
}
const getBorderColorForBM = (date) => {
    console.log('getBorderColorForBM:', date)
    if (bm?.superb?.indexOf(date) > -1) return 'green';
    if (bm?.good?.indexOf(date) > -1) return 'blue';
    if (bm?.average?.indexOf(date) > -1) return 'yellow';
    if (bm?.bad?.indexOf(date) > -1) return 'red';
    return 'transparent'
}
const getBorderColorForUM = (date) => {
    if (um?.superb?.indexOf(date) > -1) return 'green';
    if (um?.good?.indexOf(date) > -1) return 'blue';
    if (um?.average?.indexOf(date) > -1) return 'yellow';
    if (um?.bad?.indexOf(date) > -1) return 'red';
    return 'transparent'

}
const StatisticsScreen = ({ route, scrollX, ...props }) => {
    const isFocused = useIsFocused();
    const { theme, userDetail, navigation, modalScoredFlashingOpen, onGetScoreSuggestions, } = props;
    const [visibleMode, setVisibleMode] = useState('month');
    const [minDate, setMinDate] = useState('2021-05-01');
    const [maxDate, setMaxDate] = useState('2021-05-31');

    const [loading, setLoading] = useState(false);
    const { wrapperStyle, } = styles(theme);


    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
            colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GR_INTERMED_II, theme.GRADIENT_LIGHT]}
            style={[wrapperStyle,]}>
            {/* <KeyboardAvoidingScrollView style={{ width: wp('100%'), backgroundColor: theme.SECONDARY_BACKGROUND, }}
                nestedScrollEnabled={true} showsVerticalScrollIndicator={false}> */}
            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Pressable
                    onPress={(_e) => setVisibleMode('week')}
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        borderWidth: 1, borderRightColor: theme.DISABLED,
                        borderTopColor: theme.TRANSPARENT, borderBottomColor: theme.TRANSPARENT, borderLeftColor: theme.TRANSPARENT
                    }}
                >
                    <Text style={{
                        paddingHorizontal: 20, fontSize: fontSize.N22, fontFamily: font.nunitoBlack,
                        color: visibleMode === 'week' ? theme.WHITE : theme.DISABLED
                    }}>{'Week'}</Text>
                </Pressable>
                <Pressable
                    onPress={(_e) => setVisibleMode('month')}
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        borderWidth: 1, borderLeftColor: theme.DISABLED,
                        borderTopColor: theme.TRANSPARENT, borderBottomColor: theme.TRANSPARENT,
                        borderRightColor: theme.TRANSPARENT
                    }}
                >
                    <Text style={{
                        paddingHorizontal: 20, fontSize: fontSize.N22, fontFamily: font.nunitoBlack,
                        color: visibleMode === 'month' ? theme.WHITE : theme.DISABLED
                    }}>{'Month'}</Text>

                </Pressable>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {visibleMode === 'month' && <View style={{ width: wp('100') }}>
                    <Calendar
                        markingType={'custom'}
                        markedDates={{
                            '2021-05-12': {
                                customStyles: {
                                    containerShadow: {
                                    },
                                    container: {
                                        backgroundColor: 'white',
                                        borderWidth: 3, borderColor: 'green',

                                    },
                                    text: {
                                        color: 'black',
                                        fontWeight: 'bold',

                                        // borderRadius: 16, borderWidth: 3, borderColor: 'red',
                                    },
                                    dayContainer: {
                                        backgroundColor: 'pink'
                                    }
                                }
                            },
                            '2021-05-29': {
                                customStyles: {
                                    container: {
                                        backgroundColor: 'white',
                                        elevation: 2
                                    },
                                    text: {
                                        color: 'blue'
                                    }
                                }
                            }
                        }}
                        //CalendarList:
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={wp('100%')}
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={true}

                        //Calendar: 
                        // Initially visible month. Default = Date()
                        current={'2021-05-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={minDate}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={maxDate}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { console.log('selected day', day) }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => { console.log('selected day', day) }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MMM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        // renderArrow={(direction) => (<Text >{direction == 'left' ? '<' : '>'}</Text>)}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={false}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={false}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={true}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        // disableArrowLeft={true}
                        // // Disable right arrow. Default = false
                        // disableArrowRight={true}
                        // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                        // disableAllTouchEventsForDisabledDays={true}
                        // // Replace default month and year title with custom one. the function receive a date as parameter.
                        // renderHeader={(date) => { <Text>{moment(date).format('MM YYYY')}</Text> }}
                        // // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={true}

                        theme={{
                            arrowColor: 'black',
                            'stylesheet.calendar.header': {
                                week: {
                                    marginTop: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: theme.TRANSPARENT,
                                }
                            },
                            'stylesheet.calendar-list.main': {
                                flatListContainer: {
                                    flex: Platform.OS === 'web' ? 1 : undefined
                                },
                                container: {
                                    backgroundColor: theme.TRANSPARENT
                                },
                                placeholder: {
                                    backgroundColor: theme.TRANSPARENT,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },

                                calendar: {
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    backgroundColor: theme.TRANSPARENT,
                                },
                                staticHeader: {
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    backgroundColor: theme.TRANSPARENT,
                                    paddingLeft: 15,
                                    paddingRight: 15
                                },

                            },
                            'stylesheet.calendar.main': {
                                container: {
                                    backgroundColor: theme.TRANSPARENT,
                                },
                                dayContainer: {
                                    backgroundColor: theme.TRANSPARENT,
                                },
                                emptyDayContainer: {
                                    backgroundColor: theme.TRANSPARENT,
                                },
                                monthView: {
                                    backgroundColor: theme.TRANSPARENT,
                                },
                                week: {
                                    marginTop: 7,
                                    marginBottom: 7,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    backgroundColor: theme.TRANSPARENT,
                                },
                            }
                        }}
                        dayComponent={({ date, state }) => {
                            // const dayMissions = missionsByDay ? missionsByDay[`${date.dateString}`] : null;
                            // const isNextMissionDay =
                            //     missions && missions.length && missions[0].dateString === date.dateString;
                            console.log(state)
                            return (<LinearGradient
                                start={{ x: 0.0, y: 0.0 }} end={{ x: 0, y: 1 }}
                                colors={[theme.GRADIENT_DARK, theme.GR_INTERMED_I, theme.GRADIEND_MEDIUM, theme.GR_INTERMED_II, theme.GRADIENT_LIGHT]}
                                style={{
                                    width: 35, height: 35, justifyContent: 'center', alignItems: 'center',
                                    borderRadius: 17.5, borderWidth: 4, borderColor: getBorderColorForBM(date?.dateString),
                                }}>
                                <Pressable
                                    onPress={(_e) => console.log(date)}
                                    style={{
                                        width: 32, height: 32, justifyContent: 'center', alignItems: 'center',
                                        borderRadius: 16, borderWidth: 3, borderColor: getBorderColorForUM(date?.dateString),
                                    }}
                                >
                                    <Text style={{ color: theme.WHITE }}>{date.day}</Text>
                                </Pressable>
                            </LinearGradient>);
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 10, borderWidth: 2, borderColor: 'green' }}></View>
                            <Text style={{ paddingHorizontal: 10, color: theme.DISABLED }}>{'Superb'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 10, borderWidth: 2, borderColor: 'blue' }}></View>
                            <Text style={{ paddingHorizontal: 10, color: theme.DISABLED }}>{'Good'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 10, borderWidth: 2, borderColor: 'yellow' }}></View>
                            <Text style={{ paddingHorizontal: 10, color: theme.DISABLED }}>{'Average'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 10, borderWidth: 2, borderColor: 'red' }}></View>
                            <Text style={{ paddingHorizontal: 10, color: theme.DISABLED }}>{'Bad'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>

                        <Text style={{
                            fontSize: fontSize.N24, fontFamily: font.nunitoBlack, fontWeight: '900',
                            paddingHorizontal: 10, color: theme.WHITE
                        }}>{'Monthly Average Sleep Time'}</Text>
                        <Text style={{
                            fontSize: fontSize.N48,
                            fontFamily: font.nunitoBlack, fontWeight: '900', paddingHorizontal: 10, color: theme.WHITE
                        }}>{'7'}<Text style={{
                            fontSize: fontSize.N18,
                            fontFamily: font.nunitoBlack, fontWeight: '900', paddingHorizontal: 10, color: theme.WHITE
                        }}>{' H '}</Text>{'58'}<Text style={{
                            fontSize: fontSize.N18,
                            fontFamily: font.nunitoBlack, fontWeight: '900', paddingHorizontal: 10, color: theme.WHITE
                        }}>{' M'}</Text></Text>
                    </View>
                    <View style={{ marginVertical: 10, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ fontSize: fontSize.N24, fontFamily: font.nunitoBlack, fontWeight: '900', paddingHorizontal: 10, color: theme.WHITE }}>{'Monthly Sleep Quality'}</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={4}
                            selectedColor={'#3ab4df'}
                            unSelectedColor={theme.ACCENT}
                            reviewColor={'white'}
                            size={30}
                            showRating={false}
                            // isDisabled={true}
                            starContainerStyle={{ borderRadius: 1, backgroundColor: theme.TRANSPARENT, paddingVertical: 10 }}
                        />
                    </View>
                </View>
                }
                {visibleMode === 'week' &&
                    <View style={{ alignSelf: 'center', marginVertical: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: fontSize.N24, fontFamily: font.josefinSansBold,
                            fontWeight: '900', paddingHorizontal: 10, color: theme.WHITE,
                            textAlign: 'center', marginBottom: 40
                        }}>{`Week chart display \n...to be implemented`}</Text>
                        <Loading width={wp('48%')} height={wp('48%')} borderWidth={wp('1%')}
                            text={{ first: '<', second: '>', style: { fontSize: fontSize.N68, color: theme.EXTRA_BLACK } }} />
                    </View>
                }
            </View>
            {/* </KeyboardAvoidingScrollView> */}
        </LinearGradient >
    );
}

const styles = StyleSheet.create(theme => ({
    wrapperStyle: {
        flex: 1, maxHeight: hp('100%') - 58, alignText: 'center', alignItems: 'center',
        justifyContent: 'space-between', backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, color: theme.PRIMARY_TEXT_COLOR,
        marginBottom: 48
    },
}));
const mapStateToProps = (store) => {
    const { userDetail } = store.userReducer;
    const { theme, } = store.appReducer;
    return {
        theme, userDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};
AppRegistry.registerComponent('StatisticsScreen', () => StatisticsScreen);
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);