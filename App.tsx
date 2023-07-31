import "react-native-gesture-handler";
import { Platform } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import theme from "./constants/theme";

import FirstOnboardingScreen from "./screens/intro/FirstOnboardingScreen";

export type RootScreensType = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  ThirdOnboarding: undefined;
};

const Stack = createNativeStackNavigator<RootScreensType>();

const App: React.FC = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hide();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="FirstOnboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="FirstOnboarding"
            component={FirstOnboardingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
