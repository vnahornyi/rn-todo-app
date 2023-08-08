import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";

import useAppState from "@todoapp/shared/src/hooks/useAppState";
import TYPOGRAPHY from "../constants/typography";
import COLORS from "../constants/colors";
import { CatType } from "@todoapp/shared/src/providers/AppProvider";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/normalize";
import calculateCatCardHeight from "../utils/calculateCatCardHeight";

import CatCard from "../components/CatCard";
import Button from "../UI/Button";

const CatsScreen: React.FC = () => {
  const [columns, setColumns] = useState<1 | 2 | 3>(1);
  const { loading, loadCats, cats } = useAppState();

  useEffect(() => {
    loadCats();
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CatType>) => {
      return <CatCard columns={columns} {...item} />;
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
  }, [columns]);

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

  return (
    <View style={styles.container}>
      {loading === "rejected" && (
        <Text style={styles.error}>Something wrong... Try reload app</Text>
      )}
      {loading === "fullfiled" && (
        <FlatList
          key={columns}
          stickyHeaderHiddenOnScroll
          ListHeaderComponent={renderHeader()}
          stickyHeaderIndices={[0]}
          numColumns={columns}
          style={styles.list}
          data={cats}
          initialNumToRender={columns * 5}
          maxToRenderPerBatch={columns * 5}
          updateCellsBatchingPeriod={300 / columns}
          windowSize={3}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      )}
      {loading === "pending" && <ActivityIndicator color={COLORS.secondary} />}
    </View>
  );
};

export default CatsScreen;

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.background,
  },
});
