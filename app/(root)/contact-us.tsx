import { LocalizedText as Text } from "@/components/LocalizedText";
import { Link, useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Touchable,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  Pressable,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ContactUs() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Handle form submission
    console.log({ fullName, email, phone, message });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(t("contactUs.messageSent"));
      // Clear form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 2000);
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-gray-50">
        <ScrollView className="flex-1  " contentContainerClassName="pb-32 ">
          <View className="flex-1 h-full ">
            {/* navigation header */}
            <View className="flex flex-row items-center px-7  justify-between mt-5 ">
              <View className="flex flex-row items-center gap-4">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                >
                  <Image source={icons.backArrow} className="size-5" />
                </TouchableOpacity>
                <Text className="text-xl font-rubik-bold">
                  {t("contactUs.title")}
                </Text>
              </View>
              <Pressable
                onPress={async () => {
                  await Linking.openURL("tel:+201080757368");
                }}
              >
                <View className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                  <Image source={icons.phone} className="size-6" />
                </View>
              </Pressable>
            </View>

            {/* contact us form */}
            <View className="flex-1 flex flex-col gap-6 mt-5  rounded-t-3xl px-7 py-8">
              {/* Full Name Field */}
              <View className="flex flex-row items-center bg-white rounded-3xl px-4 py-3 gap-3 shadow">
                <Image
                  source={icons.person}
                  className="size-6 tint-orange-400"
                />
                <TextInput
                  placeholder={t("contactUs.fullName")}
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                  className="flex-1 text-base text-gray-700"
                />
              </View>

              {/* Email Field */}
              <View className="flex flex-row items-center bg-white rounded-3xl px-4 py-3 gap-3 shadow">
                <Image source={icons.chat} className="size-6 tint-green-400" />
                <TextInput
                  placeholder={t("contactUs.emailAddress")}
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  className="flex-1 text-base text-gray-700"
                />
              </View>

              {/* Phone Field */}
              <View className="flex flex-row items-center bg-white rounded-3xl px-4 py-3 gap-3 shadow">
                <Image source={icons.phone} className="size-6 tint-blue-400" />
                <TextInput
                  placeholder={t("contactUs.phoneNo")}
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  className="flex-1 text-base text-gray-700"
                />
              </View>

              {/* Message Field */}
              <View className="flex flex-col bg-white rounded-3xl shadow px-4 py-3 mt-2">
                <TextInput
                  placeholder={t("contactUs.message")}
                  placeholderTextColor="#999"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={10}
                  textAlignVertical="top"
                  className="text-base text-gray-700 min-h-[100px]"
                />
              </View>

              {/* Send Button */}
              <TouchableHighlight
                disabled={loading || !fullName || !email || !phone || !message}
                underlayColor={"bg-blue-800"}
                onPress={handleSend}
                className="bg-blue-600 rounded-3xl py-4 mt-6 active:bg-blue-700"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-center text-white text-lg font-rubik-bold">
                    {t("contactUs.send")}
                  </Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
