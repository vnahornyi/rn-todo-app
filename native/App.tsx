import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import useTheme from "./hooks/useTheme";
import useTodos from "../shared/hooks/useTodos";
import { heightPixel, widthPixel } from "./utils/normalize";
import { darkTheme, lightTheme } from "./constants/theme";
import PLATFORM from "./constants/platform";
import { TodoType } from "../shared/types/todos";
import RootProvider from "../shared/providers";

import FirstOnboardingScreen from "./screens/intro/FirstOnboardingScreen";
import SecondOnboardingScreen from "./screens/intro/SecondOnboardingScreen";
import ThirdOnboardingScreen from "./screens/intro/ThirdOnboardingScreen";
import TodosScreen from "./screens/TodosScreen";
import CreateEditTodoPlug from "./screens/CreateEditTodoPlug";
import TodoScreen from "./screens/TodoScreen";
import Settings from "./screens/Settings";
import CreateEditTodo from "./screens/CreateEditTodo";
import CatsScreen from "./screens/CatsScreen";
import FormScreen from "./screens/FormScreen";

import AddTodoButton from "./components/AddTodoButton";
import HomeIcon from "./assets/images/icons/home.svg";
import HomeSolidIcon from "./assets/images/icons/home-solid.svg";
import SettingsIcon from "./assets/images/icons/settings.svg";
import SettingsSolidIcon from "./assets/images/icons/settings-solid.svg";
import PetsIcon from "./assets/images/icons/pets.svg";
import DocumentIcon from "./assets/images/icons/document.svg";
import DocumentSolidIcon from "./assets/images/icons/document-solid.svg";
import { t } from "@lingui/macro";
import useLocale from "../shared/hooks/useLocale";
import ThemeProvider from "./providers/ThemeProvider";
import createStyles from "./utils/createStyles";

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
  FormScreen: undefined;
};

const Stack = createNativeStackNavigator<RootScreensType>();
const Tabs = createBottomTabNavigator<RootScreensType>();

const App: React.FC = () => {
  return (
    <RootProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </RootProvider>
  );
};

const Navigator: React.FC = () => {
  const { currentTheme } = useTheme();
  const { prepareTodos } = useTodos();

  useEffect(() => {
    prepareTodos().finally(SplashScreen.hide);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        animated
        barStyle={currentTheme === "light" ? "dark-content" : "light-content"}
      />
      <NavigationContainer
        theme={currentTheme === "light" ? lightTheme : darkTheme}
      >
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
  const { currentTheme, colors } = useTheme();
  const styles = useStyles();
  const { i18n } = useLocale();

  return (
    <Tabs.Navigator
      initialRouteName="TodosScreen"
      screenOptions={{
        tabBarActiveTintColor:
          currentTheme === "dark" ? colors.white : colors.black,
        tabBarInactiveTintColor:
          currentTheme === "dark" ? colors.white : colors.black,
        tabBarStyle: styles.bottomHeader,
      }}
    >
      <Tabs.Screen
        name="TodosScreen"
        component={TodosScreen}
        options={{
          headerTitle: t(i18n)`Todos`,
          tabBarLabel: t(i18n)`Todos`,
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeSolidIcon : HomeIcon;

            return (
              <Icon
                color={colors.text}
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
          headerTitle: t(i18n)`Cats`,
          tabBarLabel: t(i18n)`Cats`,
          tabBarIcon: () => {
            return (
              <PetsIcon
                color={colors.text}
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
        name="FormScreen"
        component={FormScreen}
        options={{
          headerTitle: t(i18n)`Form`,
          tabBarLabel: t(i18n)`Form`,
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? DocumentSolidIcon : DocumentIcon;

            return (
              <Icon
                width={widthPixel(28)}
                height={heightPixel(28)}
                color={colors.text}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          headerTitle: t(i18n)`Settings`,
          tabBarLabel: t(i18n)`Settings`,
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? SettingsSolidIcon : SettingsIcon;

            return (
              <Icon
                width={widthPixel(28)}
                height={heightPixel(28)}
                color={colors.text}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const useStyles = createStyles((colors) => ({
  bottomHeader: {
    backgroundColor: colors.cardBackground,
  },
}));

export default App;
