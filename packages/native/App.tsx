import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import { heightPixel, widthPixel } from "./utils/normalize";
import theme from "./constants/theme";
import COLORS from "./constants/colors";
import PLATFORM from "./constants/platform";
import { TodoType } from "@todoapp/shared/src/providers/TodosProvider";

import FirstOnboardingScreen from "./screens/intro/FirstOnboardingScreen";
import SecondOnboardingScreen from "./screens/intro/SecondOnboardingScreen";
import ThirdOnboardingScreen from "./screens/intro/ThirdOnboardingScreen";
import TodosScreen from "./screens/TodosScreen";
import CreateEditTodoPlug from "./screens/CreateEditTodoPlug";
import TodoScreen from "./screens/TodoScreen";
import Settings from "./screens/Settings";
import CreateEditTodo from "./screens/CreateEditTodo";
import CatsScreen from "./screens/CatsScreen";

import RootProvider from "@todoapp/shared/src/providers";
import AddTodoButton from "./components/AddTodoButton";
import HomeIcon from "./assets/images/icons/home.svg";
import HomeSolidIcon from "./assets/images/icons/home-solid.svg";
import SettingsIcon from "./assets/images/icons/settings.svg";
import SettingsSolidIcon from "./assets/images/icons/settings-solid.svg";
import PetsIcon from "./assets/images/icons/pets.svg";
import useTodos from "@todoapp/shared/src/hooks/useTodos";

export type RootScreensType = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  ThirdOnboarding: undefined;
  TabsRoot: undefined;
  TodosScreen: undefined;
  TodoScreen: { todoId: number };
  CreateEditTodoPlug: undefined;
  CreateEditTodo?: TodoType;
  SettingsScreen: undefined;
  Cats: undefined;
  PlugScreen: undefined;
};

const Stack = createNativeStackNavigator<RootScreensType>();
const Tabs = createBottomTabNavigator<RootScreensType>();

const App: React.FC = () => {
  return (
    <RootProvider>
      <Navigator />
    </RootProvider>
  );
};

const Navigator: React.FC = () => {
  const { prepareTodos } = useTodos();

  useEffect(() => {
    prepareTodos().finally(SplashScreen.hide);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar animated barStyle="light-content" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="FirstOnboarding"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
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
          <Stack.Screen
            name="CreateEditTodo"
            options={{
              presentation: PLATFORM.isIOS ? "modal" : "card",
              animation: "slide_from_bottom",
              gestureDirection: "vertical",
            }}
            component={CreateEditTodo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const TabsNavigator: React.FC = () => {
  return (
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

            return (
              <Icon
                color={COLORS.white}
                width={widthPixel(24)}
                height={heightPixel(24)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Cats"
        component={CatsScreen}
        options={{
          headerTitle: "Cats",
          tabBarLabel: "Cats",
          tabBarIcon: () => {
            return (
              <PetsIcon
                color={COLORS.white}
                width={widthPixel(24)}
                height={heightPixel(24)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="CreateEditTodoPlug"
        component={CreateEditTodoPlug}
        options={{
          tabBarButton: AddTodoButton,
        }}
      />
      <Tabs.Screen
        name="PlugScreen"
        component={Settings}
        options={{
          headerTitle: "Plug",
          tabBarLabel: "Plug",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? SettingsSolidIcon : SettingsIcon;

            return (
              <Icon
                width={widthPixel(28)}
                height={heightPixel(28)}
                color={COLORS.white}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          headerTitle: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? SettingsSolidIcon : SettingsIcon;

            return (
              <Icon
                width={widthPixel(28)}
                height={heightPixel(28)}
                color={COLORS.white}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomHeader: {
    backgroundColor: COLORS.cardBackground,
  },
});

export default App;
