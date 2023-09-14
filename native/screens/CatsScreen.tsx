import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  ViewToken,
} from "react-native";
import { Plural, Trans } from "@lingui/macro";
import { useCallback, useEffect, useState } from "react";

import useAppState from "../../shared/hooks/useAppState";
import TYPOGRAPHY from "../constants/typography";
import { CatType } from "../../shared/types/cats";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import calculateCatCardHeight from "../utils/calculateCatCardHeight";

import CatCard from "../components/CatCard";
import Button from "../UI/Button";
import createStyles from "../utils/createStyles";
import useTheme from "../hooks/useTheme";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ViewableItemsType = {
  viewableItems: ViewToken[];
};

const CatsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = useStyles();
  const [columns, setColumns] = useState<1 | 2 | 3>(1);
  const { loading, loadCats, cats } = useAppState();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const scrollValue = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollValue.value = event.contentOffset.y;
  });

  useEffect(() => {
    loadCats();
  }, []);

  const animatedListStyles = useAnimatedStyle(
    () => ({
      ...styles.list,
      backgroundColor: withTiming(
        Math.round(scrollValue.value / 10) % 2 === 0 ? "#FFFFFF" : "#000000",
        { duration: 1000 }
      ),
    }),
    []
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CatType>) => {
      return (
        <CatCard viewableItems={viewableItems} columns={columns} {...item} />
      );
    },
    [columns]
  );

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <Button
          title="1"
          variant={columns === 1 ? "contained" : "outline"}
          color={columns === 1 ? "primary" : "secondary"}
          onPress={() => setColumns(1)}
        />
        <Button
          title="2"
          variant={columns === 2 ? "contained" : "outline"}
          color={columns === 2 ? "primary" : "secondary"}
          onPress={() => setColumns(2)}
        />
        <Button
          title="3"
          variant={columns === 3 ? "contained" : "outline"}
          color={columns === 3 ? "primary" : "secondary"}
          onPress={() => setColumns(3)}
        />
      </View>
    );
  }, [columns, styles.header]);

  const keyExtractor = useCallback((item: CatType) => item.id, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<CatType> | null | undefined, index: number) => {
      const cardHeight = calculateCatCardHeight(columns);

      return {
        length: cardHeight,
        offset: cardHeight * index,
        index,
      };
    },
    [columns]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems: vItems }: ViewableItemsType) => {
      viewableItems.value = vItems;
    },
    []
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          <Plural value={1} one="# cat" few="# cats" other="# cats" />
        </Text>
        <Text style={styles.text}>
          <Plural value={3} one="# cat" few="# cats" other="# cats" />
        </Text>
        <Text style={styles.text}>
          <Plural value={5} one="# cat" few="# cats" other="# cats" />
        </Text>
      </View>
      {loading === "rejected" && (
        <Text style={styles.error}>
          <Trans>Something wrong... Try reload app</Trans>
        </Text>
      )}
      {loading === "fullfiled" && (
        <Animated.FlatList
          key={columns}
          stickyHeaderHiddenOnScroll
          ListHeaderComponent={renderHeader()}
          stickyHeaderIndices={[0]}
          numColumns={columns}
          style={animatedListStyles}
          data={cats}
          onScroll={onScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          initialNumToRender={columns * 5}
          maxToRenderPerBatch={columns * 5}
          updateCellsBatchingPeriod={300 / columns}
          windowSize={3}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      )}
      {loading === "pending" && <ActivityIndicator color={colors.secondary} />}
    </View>
  );
};

export default CatsScreen;

const useStyles = createStyles((colors) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    ...TYPOGRAPHY.title,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: pixelSizeHorizontal(24),
    paddingVertical: pixelSizeVertical(24),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
}));
