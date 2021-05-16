@echo off
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)
@setlocal enableextensions
cls
REM find absolute path of level 1 parent (bat being in specific folder ar project root level)
set "pathTestFile=%~dp0"
call :GetDirParentN dirFileParent1 "%pathTestFile%" ".."

ECHO | set /p =" BATCH FILE CREATED BY "
call :ColorText 0F " DIP " echo
call :ColorText 0e " 19-11-2020 "
ECHO.
ECHO.
  call :DeleteIndexAndroidBundleIfExists
  call :CreateNewIndexAndroidBundle
  call :CleanExtraRes
  echo.
  echo.
  call :ColorText 0B "PROJECT IS READY FOR A FRESH RELEASE BUILD"  
  echo.
  echo.
  echo(
REM pause
call :CreateNewAPK
EXIT /B %ERRORLEVEL%
ECHO.
ECHO.
:END

:CreateNewAPK
echo off 
cd /d "%dirFileParent1%"
SET ENVFILE=.env.local
  echo(
  ECHO|set /p =""
  call :ColorText 0B "GENERATING NEW RELEASE APK FILE" 
   echo. :  
  call :CleanGradle
  call :PackBundleRelease
  call :PackAssembleRelease
  pause
  start %dirFileParent1%\android\app\build\outputs\apk\release
  EXIT /B %ERRORLEVEL%
goto :eof

:CleanGradle
echo off 
 echo( 
     ECHO|set /p ="-- "
  call :ColorText 09 "CLEANING GRADLE" 
   echo. -  
  cd "%dirFileParent1%\android" && gradlew clean
  goto eof

:PackBundleRelease
  echo( 
     ECHO|set /p ="-- "
  call :ColorText 09 "PACKING BUNDLE RELEASE" 
   echo. -  
  cd "%dirFileParent1%\android" && gradlew bundleRelease
  goto eof

:PackAssembleRelease
  echo( 
     ECHO|set /p ="-- "
  call :ColorText 09 "PACKING ASSEMBLE RELEASE" 
   echo. -  
  cd "%dirFileParent1%\android" &&  gradlew assembleRelease
  goto eof

:CleanExtraRes
@echo off
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)
 
set "pathToFile=%dirFileParent1%\android\app\src\main\res";
  echo(
  call :ColorText 0B "CLEANING UP" 
  echo. :  
  echo(
  call :ColorText 0e "Searching unwanted files into path"
  echo   :  %pathToFile% 
  echo( 
@cd /d "%pathToFile%"
SET "drawableFolders=drawable-" 
SET "rawFolders=raw" 
for /f "tokens=*" %%G in ('dir /b /s /a:d') do (
   set "str1=%%G"
   if not "!str1:%drawableFolders%=!" == "!str1!" (
        ECHO|set /p =""
         call :ColorText 0c "Will be deleted" echo
         call :ColorText 09 " drawable "  
         echo  :   %%G 
          del /s /q  "%%G\*" 2>nul
         rmdir /s /q  %%G 2>nul
        )
    if not "!str1:%rawFolders%=!" == "!str1!" (
         ECHO|set /p =""
         call :ColorText 0c "Will be deleted" echo
         call :ColorText 09 " raw " 
        echo  :   %%G 
        del /s /q  "%%G\*" 2>nul
        rmdir /s /q  %%G 2>nul
        )
   REM echo actual iteration  %%G 
)
exit /b
endlocal

:CreateNewIndexAndroidBundle
@echo off 
 
@cd /d "%dirFileParent1%"
  ECHO|set /p =""
  call :ColorText 0B "GENERATING NEW INDEX BUNDLE" 
  echo. :  
  echo(
  cd %dirFileParent1%  &&npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  echo( 
exit /b
 
:DeleteIndexAndroidBundleIfExists
@echo off
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)
@setlocal enableextensions

 
set "pathToFile=%dirFileParent1%\android\app\src\main\assets";
SET "wordToSearch=index.android.bundle" ;
   ECHO|set /p =""
  call :ColorText 0B "REMOVING ACTUAL INDEX BUNDLE" 
  echo. :  
  echo(
  call :ColorText 0e "Searching into path"
  echo   :  %pathToFile% 
for /r %pathToFile%\ %%a in (*) do if "%%~nxa"=="%wordToSearch%" set p=%%~dpnxa 
if defined p ( 
         ECHO|set /p =""
         call :ColorText 0c "Deleting file" 
         echo :  %p% 
         echo(  
      del %p% /q  
) else ( 
ECHO|set /p =""
call :ColorText 0c "File not Found ! Continuing at creation"
  echo( 
ECHO.
)
exit /b

:GetDirParentN
    for %%I in ("%~2\%~3") do set "%~1=%%~fI"
    exit /b 0

:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
exit /b

ECHO.
ECHO.
:END