import { isANDROID } from "./themeHelper";
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";

export const NetworkUtils = () => NetInfo.fetch().then(response => response);

   export const noUrlOnAvatar='https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg';//'https://placeimg.com/140/140/any';

export function isValidEmail(email) {
    const format = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(email);
}
export function isEmpty(text) {
    return (text.toString().trim().length > 0 && text.toString().trim() !== "0");
}
export function isValidName(name) {
    const format = /^[a-zA-Z0-9-+#$]{2,}$/;
    const pattern =/^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$/ ;
    return pattern.test(name);//name.length > 2;// format.test(name);
}
export const isValidDate = (date) => {
    var m = moment(date, 'MM/DD/YYYY');
    return m.isValid(); // false

}
