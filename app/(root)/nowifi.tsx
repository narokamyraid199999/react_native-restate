import icons from "@/constants/icons";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoWifi() {
  return (
    <SafeAreaView className="bg-white h-full flex flex-col justify-center items-center gap-4">
      <Image source={icons.wifi} className="size-24" />
      <Text className="text-2xl font-bold text-gray-800">
        No Internet Connection
      </Text>
      <Text className="text-gray-600">
        Please check your network settings and try again.
      </Text>
    </SafeAreaView>
  );
}
