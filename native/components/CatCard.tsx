import { memo, useMemo } from "react";
import { Text, ViewToken } from "react-native";
import FastImage from "react-native-fast-image";

import { pixelSizeVertical } from "../utils/normalize";
import { CatType } from "../../shared/types/cats";
import TYPOGRAPHY from "../constants/typography";
import SIZES from "../constants/sizes";
import calculateCatCardHeight from "../utils/calculateCatCardHeight";
import createStyles from "../utils/createStyles";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type PropsType = CatType & {
  columns: number;
  viewableItems: SharedValue<ViewToken[]>;
};

const CatCard: React.FC<PropsType> = ({
  reference_image_id,
  name,
  viewableItems,
  columns,
  id,
}) => {
  const styles = useStyles();
  const height = calculateCatCardHeight(columns);

  const cardStyles = useAnimatedStyle(() => {
    const isVisible = !!viewableItems.value
      .filter((item) => item.isViewable)
      .find((viewableItem) => viewableItem.item.id === id);

    return {
      ...styles.card,
      height,
      width: SIZES.screenWidth / columns,
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, [columns]);

  const nameStyles = useMemo(
    () => [styles.title, columns < 2 ? TYPOGRAPHY.title : TYPOGRAPHY.body],
    [columns]
  );

  return (
    <Animated.View style={cardStyles}>
      <FastImage
        source={{
          uri: `https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={nameStyles}>{name}</Text>
    </Animated.View>
  );
};

export default memo(CatCard);

const useStyles = createStyles((colors) => ({
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
  title: {
    color: colors.text,
  },
}));
