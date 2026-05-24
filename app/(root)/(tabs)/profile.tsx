import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useState } from "react";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  slug?: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  slug,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {slug}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch, loading } = useGlobalContext();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); // This should come from your state or context
  const { t } = useTranslation();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const changeLanguage = async (lang: "en" | "ar") => {
    await Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Long_Press);
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refresh:", error);
    } finally {
      router.push("/(root)/(tabs)/profile");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="h-full">
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" className="text-primary-300" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={["#4040d8"]}
              onRefresh={handleRefresh}
            />
          }
          contentContainerClassName="pb-32 px-7 bg-white"
        >
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-xl font-rubik-bold">
                {t("profile.title")}
              </Text>
            </View>
            <Image source={icons.bell} className="size-5" />
          </View>

          <View className="flex flex-row justify-center mt-5">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                source={{ uri: user?.avatar }}
                className="size-24 relative rounded-full"
              />
              <TouchableOpacity className="absolute bottom-11 right-2">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>

              <Text className="text-xl font-rubik-bold mt-2">{user?.name}</Text>
            </View>
          </View>

          <View className="flex flex-row items-center gap-4  mt-10 border-b pb-6 border-primary-200">
            <View className="flex flex-row items-center gap-3">
              <Image source={icons.language} className="size-6" />
              <Text className="text-lg font-rubik-medium text-black-300">
                {t("profile.language")}
              </Text>
            </View>

            {/* English */}
            <Pressable
              onPress={() => changeLanguage("en")}
              className={`flex-row items-center justify-between rounded-2xl  border border-gray-400 py-2 px-3 flex-1 ${
                currentLanguage === "en"
                  ? "border-blue-400 bg-blue-200"
                  : "border-gray-400"
              }`}
            >
              <Text className="text-lg font-semibold">{"English"}</Text>

              <View
                className={`h-5 w-5 rounded-full border-2 ${
                  currentLanguage === "en"
                    ? "border-blue-400 bg-blue-400"
                    : "border-gray-400"
                }`}
              />
            </Pressable>

            {/* Arabic */}
            <Pressable
              onPress={() => changeLanguage("ar")}
              className={`flex-row items-center justify-between rounded-2xl border border-gray-400 py-2 px-3 flex-1 ${
                currentLanguage === "ar"
                  ? "border-blue-400 bg-blue-200"
                  : "border-gray-400"
              }`}
            >
              <Text className="text-lg font-semibold">{"العربية"}</Text>

              <View
                className={`h-5 w-5 rounded-full border-2 ${
                  currentLanguage === "ar"
                    ? "border-blue-400 bg-blue-300"
                    : "border-gray-400"
                }`}
              />
            </Pressable>
          </View>

          <View className="flex flex-col mt-10">
            <SettingsItem
              slug={t("profile.myBookings")}
              icon={icons.calendar}
              title="My Bookings"
            />
            <SettingsItem
              slug={t("profile.payments")}
              icon={icons.wallet}
              title="Payments"
            />
          </View>

          <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
            {settings.slice(2).map((item, index) => (
              <SettingsItem key={index} {...item} slug={t(item.slug)} />
            ))}
          </View>

          <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
            <SettingsItem
              icon={icons.logout}
              title="Logout"
              slug={t("profile.logout")}
              textStyle="text-danger"
              showArrow={false}
              onPress={handleLogout}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
