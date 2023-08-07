import { memo, useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { pixelSizeVertical } from "../utils/normalize";
import { CatType } from "../providers/AppProvider";
import TYPOGRAPHY from "../constants/typography";
import SIZES from "../constants/sizes";
import calculateCatCardHeight from "../utils/calculateCatCardHeight";

type PropsType = CatType & {
  columns: number;
};

const CatCard: React.FC<PropsType> = ({
  reference_image_id,
  name,

  columns,
}) => {
  const cardStyles = useMemo(
    () => [
      styles.card,
      {
        height: calculateCatCardHeight(columns),
        width: SIZES.screenWidth / columns,
      },
    ],
    [columns]
  );

  const nameStyles = useMemo(
    () => (columns < 2 ? TYPOGRAPHY.title : TYPOGRAPHY.body),
    [columns]
  );

  return (
    <View style={cardStyles}>
      <Image
        source={{
          uri: `https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`,
        }}
        style={styles.image}
      />
      <Text style={nameStyles}>{name}</Text>
    </View>
  );
};

export default memo(CatCard);

const styles = StyleSheet.create({
  card: {
    paddingBottom: pixelSizeVertical(12),
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    aspectRatio: 1.33,
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
