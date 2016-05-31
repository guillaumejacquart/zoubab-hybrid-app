del "production-x86.apk"
del "production-armv7.apk"

CALL cordova build android --release

CALL jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore production.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk production
CALL zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk production-armv7.apk