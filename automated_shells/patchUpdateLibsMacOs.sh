#! /bin/bash
function pause ()
{
read -s -n 1 -p "Press any key to continue . . . "
echo""
}
cp -nf ./HttpCacheModule.java ../node_modules/react-native-http-cache/android/src/main/java/cn/reactnative/httpcache
cp -nf ./SpringScrollView.js ../node_modules/react-native-spring-scrollview
cp -nf ./KeyboardAvoidingContainer.js ../node_modules/react-native-keyboard-avoiding-scroll-view/dist
cp -nf ./RCTBluetoothSerialPackage.java  ../node_modules/react-native-bluetooth-serial/android/src/main/java/com/rusel/RCTBluetoothSerial
pause