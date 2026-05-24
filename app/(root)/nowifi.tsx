import { Text, View } from "react-native";

export default function NoWifi() {
  return (
    <View className="bg-white h-full flex flex-col justify-center items-center gap-4">
      <Text className="text-2xl font-bold text-gray-800">
        No Internet Connection
      </Text>
      <Text className="text-gray-600">
        Please check your network settings and try again.
      </Text>
    </View>
  );
}
