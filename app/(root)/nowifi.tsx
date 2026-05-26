import icons from "@/constants/icons";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { LocalizedText as Text } from "@/components/LocalizedText";

export default function NoWifi() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="bg-white h-full flex flex-col justify-center items-center gap-4">
      <Image source={icons.wifi} className="size-24" />
      <Text className="text-2xl font-bold text-gray-800">
        {t("noInternet.title")}
      </Text>
      <Text className="text-gray-600">{t("noInternet.description")}</Text>
    </SafeAreaView>
  );
}
