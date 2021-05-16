@ECHO OFF
ECHO Start patching unamaintained node_modules libs.
PAUSE
XCOPY /C /S /Y /I ".\blacklist.js" "..\node_modules\metro-config\src\defaults"
XCOPY /C /S /Y /I ".\SpringScrollView.js" "..\node_modules\react-native-spring-scrollview"
XCOPY /C /S /Y /I ".\KeyboardAvoidingContainer.js" "..\node_modules\react-native-keyboard-avoiding-scroll-view\dist"
XCOPY /C /S /Y /I ".\RCTBluetoothSerialPackage.java"  "..\node_modules\react-native-bluetooth-serial\android\src\main\java\com\rusel\RCTBluetoothSerial"
XCOPY /C /S /Y /I ".\HttpCacheModule.java" "..\node_modules\react-native-http-cache\android\src\main\java\cn\reactnative\httpcache"
PAUSE
EXIT

copy "C:\Folder1" *.*  "D:\Folder2"