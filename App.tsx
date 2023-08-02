import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import theme from "./constants/theme";
import COLORS from "./constants/colors";

import FirstOnboardingScreen from "./screens/intro/FirstOnboardingScreen";
import SecondOnboardingScreen from "./screens/intro/SecondOnboardingScreen";
import ThirdOnboardingScreen from "./screens/intro/ThirdOnboardingScreen";
import TodosScreen, { TodoType } from "./screens/TodosScreen";
import TodoScreen from "./screens/TodoScreen";

import HomeIcon from "./assets/images/icons/home.svg";
import HomeSolidIcon from "./assets/images/icons/home-solid.svg";

export type RootScreensType = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  ThirdOnboarding: undefined;
  TabsRoot: undefined;
  TodosScreen: undefined;
  TodoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootScreensType>();
const Tabs = createBottomTabNavigator<RootScreensType>();

const App: React.FC = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hide();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar animated barStyle="light-content" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="FirstOnboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="FirstOnboarding"
            component={FirstOnboardingScreen}
          />
          <Stack.Screen
            name="SecondOnboarding"
            component={SecondOnboardingScreen}
          />
          <Stack.Screen
            name="ThirdOnboarding"
            component={ThirdOnboardingScreen}
          />
          <Stack.Screen name="TabsRoot" component={TabsNavigator} />
          <Stack.Screen name="TodoScreen" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const TabsNavigator: React.FC = () => (
  <Tabs.Navigator
    initialRouteName="TodosScreen"
    screenOptions={{
      tabBarActiveTintColor: COLORS.white,
      tabBarInactiveTintColor: COLORS.white,
      tabBarStyle: styles.bottomHeader,
    }}
  >
    <Tabs.Screen
      name="TodosScreen"
      component={TodosScreen}
      options={{
        headerTitle: "Todos",
        tabBarLabel: "Todos",
        tabBarIcon: ({ focused }) => {
          const Icon = focused ? HomeSolidIcon : HomeIcon;

          return <Icon width={24} height={24} />;
        },
      }}
    />
  </Tabs.Navigator>
);

const styles = StyleSheet.create({
  bottomHeader: {
    backgroundColor: COLORS.cardBackground,
  },
});

export default App;
