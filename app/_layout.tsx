import { useEffect } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "@/lib/i18n";

import "./global.css";
import GlobalProvider from "@/lib/global-provider";
import { useNetInfo } from "@react-native-community/netinfo";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  const netInfo = useNetInfo();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isOffline =
      netInfo.isConnected === false || netInfo.isInternetReachable === false;

    const isOnline =
      netInfo.isConnected === true || netInfo.isInternetReachable === true;

    if (isOffline && pathname !== "/nowifi") {
      router.replace("/nowifi");
    }

    if (isOnline && pathname === "/nowifi") {
      router.replace("/");
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
