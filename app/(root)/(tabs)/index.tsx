import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import icons from "@/constants/icons";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { Card, FeaturedCard } from "@/components/Cards";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { getLatestProperties, getProperties } from "@/lib/appwrite";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const handleRefresh = async () => {
    try {
      await refetch({
        filter: params.filter!,
        query: params.query!,
        limit: 6,
      });
    } catch (error) {
      console.error(error);
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
        <FlatList
          data={properties}
          numColumns={2}
          renderItem={({ item }) => (
            <Card item={item} onPress={() => handleCardPress(item.$id)} />
          )}
          keyExtractor={(item) => item.$id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={["#4040d8"]}
            ></RefreshControl>
          }
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                className="text-primary-300 mt-5"
              />
            ) : (
              <NoResults />
            )
          }
          ListHeaderComponent={() => (
            <View className="px-5">
              <View className="flex flex-row items-center justify-between mt-5">
                <TouchableWithoutFeedback
                  onPress={() => router.push("/(root)/(tabs)/profile")}
                >
                  <View className="flex flex-row">
                    <Image
                      source={{ uri: user?.avatar }}
                      className="size-12 rounded-full"
                    />

                    <View className="flex flex-col items-start ml-2 justify-center">
                      <Text className="text-xs font-rubik text-black-100">
                        {t("goodMorning")}
                      </Text>
                      <Text className="text-base font-rubik-medium text-black-300">
                        {user?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <Image source={icons.bell} className="size-6" />
              </View>

              <Search />

              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-bold text-black-300">
                    {t("featured")}
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">
                      {t("seeAll")}
                    </Text>
                  </TouchableOpacity>
                </View>

                {latestPropertiesLoading ? (
                  <ActivityIndicator
                    size="large"
                    className="text-primary-300"
                  />
                ) : !latestProperties || latestProperties.length === 0 ? (
                  <NoResults />
                ) : (
                  <FlatList
                    data={latestProperties}
                    renderItem={({ item }) => (
                      <FeaturedCard
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                      />
                    )}
                    keyExtractor={(item) => item.$id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                  />
                )}
              </View>

              {/* <Button title="seed" onPress={seed} /> */}

              <View className="mt-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-bold text-black-300">
                    {t("ourRecommendation")}
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">
                      {t("seeAll")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Filters />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
