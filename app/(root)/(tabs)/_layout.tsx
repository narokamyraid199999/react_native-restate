import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { LocalizedText as Text } from "@/components/LocalizedText";

import icons from "@/constants/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-2 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const inset = useSafeAreaInsets();
  const tabBarHeight = inset.bottom > 0 ? 60 + inset.bottom : 60;
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          paddingBottom: inset.bottom,
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: tabBarHeight,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title={t("tabs.home")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              title={t("tabs.explore")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title={t("tabs.profile")}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
