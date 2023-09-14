import { View, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { SvgProps } from "react-native-svg";
import { t } from "@lingui/macro";

import { RootScreensType } from "../App";
import TYPOGRAPHY from "../constants/typography";
import useLocale from "../../shared/hooks/useLocale";
import {
  moderatePixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../utils/normalize";

import Button from "../UI/Button";
import Stepper from "../UI/Stepper";
import createStyles from "../utils/createStyles";
import useAppState from "../hooks/useAppState";

type PropsType = {
  Image: React.FC<SvgProps>;
  step: 1 | 2 | 3;
  title: string;
  description: string;
};

interface PathsType {
  1: "SecondOnboarding";
  2: "ThirdOnboarding";
  3: "TabsRoot";
}

const paths: PathsType = {
  1: "SecondOnboarding",
  2: "ThirdOnboarding",
  3: "TabsRoot",
};

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootScreensType,
  "FirstOnboarding"
>;

const Onboarding: React.FC<PropsType> = ({
  Image,
  step,
  title,
  description,
}) => {
  const styles = useStyles();
  const { i18n } = useLocale();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { setShowIntroSkipped } = useAppState();

  const handleNext = () => {
    navigation.navigate(paths[step]);

    if (step === 3) {
      void setShowIntroSkipped();
    }
  };

  const handleSkip = useCallback(() => {
    navigation.push("TabsRoot");
    void setShowIntroSkipped();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.skip}>
          <Button
            variant="ghost"
            color="secondary"
            title={t(i18n)`SKIP`}
            onPress={handleSkip}
          />
        </View>
        <View style={styles.topPart}>{<Image style={styles.image} />}</View>
        <View style={styles.bottomPart}>
          <Stepper step={step} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.bottomTabs}>
          {navigation.canGoBack() && (
            <Button
              title={t(i18n)`BACK`}
              variant="ghost"
              color="secondary"
              onPress={navigation.goBack}
            />
          )}
          <View style={styles.next}>
            <Button title={t(i18n)`NEXT`} onPress={handleNext} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const useStyles = createStyles((colors) => ({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: moderatePixel(24),
  },
  skip: {
    position: "absolute",
    left: pixelSizeHorizontal(24),
    top: pixelSizeVertical(24),
  },
  topPart: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: pixelSizeVertical(50),
    height: "50%",
  },
  bottomPart: {
    alignItems: "center",
    height: "50%",
  },
  bottomTabs: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: pixelSizeVertical(24),
  },
  next: {
    marginLeft: "auto",
  },
  title: {
    ...TYPOGRAPHY.largeTitle,
    textAlign: "center",
    marginTop: pixelSizeVertical(50),
    marginBottom: pixelSizeVertical(42),
    color: colors.text,
  },
  description: {
    ...TYPOGRAPHY.body,
    textAlign: "center",
    color: colors.text,
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));
