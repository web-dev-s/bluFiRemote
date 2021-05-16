import AccesNotPermittedModal from './modalComponents/AccesNotPermittedModal';
import BlockContactModal from './modalComponents/BlockContactModal';
import LoadingModal from './modalComponents/LoadingModal';// comp showing loading circle while processing api requests
import ScrollWrapper from './ScrollWrapper';
import SwippeableItem from './SwippeableItem';// comp for showing chat lit items wih swipe option
import SquareSwitcher from './SquareSwitcher';//used in menu for options mi-km
import AppButton from './AppButton';// used for horizontal texted buttons 
import RoundPressable from './RoundPressable'; //used in menu for options on-off
export * from './Switcher'; //used in menu for options on-off
export * from './ShadowedCard'; //used in menu for options on-off
export * from './CardSwitchOption'
export * from './CardSliderOption';
export * from './LoadingComponent';
export * from './modalComponents/ScoredFlashingModal'; // modal with a rating number that dissapears after a few seconds
export * from './modalComponents/MatchingModal'; // comp for outputing match confirmation with starting chat option
export * from './modalComponents/Tutorial_I_Modal'; // comp showing how to use gesture features for matching/dodging
export * from './modalComponents/Tutorial_II_Modal'; // comp showing how to use gesture features for profile info
export * from './modalComponents/Tutorial_III_Modal'; // comp showing how to use gesture features for swiping photos
export * from './modalComponents/SearchingMatchesModal';


export * from './SlideImages'; // used in scoreScreen, matchScreen and UserInfoModal  
export * from './RatingSlider'; // used in scoreScreen for rating profiles
export * from './AutoMove';// used in matchScreen comp for UI effects interaction with match true-false action triggers
export * from './HorizontalSlider'; // used in radius setup  is component for a horizontal slider
export * from './Slider'; // not used  is component for a vertical slider
export {
    RoundPressable,
    AppButton, AccesNotPermittedModal, BlockContactModal,
    LoadingModal, ScrollWrapper, SquareSwitcher, SwippeableItem,
};