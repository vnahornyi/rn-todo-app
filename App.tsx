import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

import WelcomeScreen from "./screens/WelcomeScreen";
import CreateScreen from "./screens/CreateScreen";
import TodoScreen from "./screens/TodoScreen";
import TodosScreen from "./screens/TodosScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PolicyScreen from "./screens/PolicyScreen";

import ListIcon from "./components/icons/ListIcon";
import SettingsIcon from "./components/icons/settings.svg";

export type RootScreensType = {
  Welcome: undefined;
  TabRoot: undefined;
  DrawerRoot: undefined;
  Create: {
    isFirstOpen: boolean;
  };
  Todos: undefined;
  Todo: undefined;
  TransparentTodo: undefined;
  Settings: undefined;
  Policy: undefined;
};

const Stack = createNativeStackNavigator<RootScreensType>();
const Tabs = createBottomTabNavigator<RootScreensType>();
const Drawer = createDrawerNavigator<RootScreensType>();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const handleStart = () => {
    props.navigation.navigate("Welcome");
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Go To Start Page" onPress={handleStart} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName="Settings"
    >
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Policy" component={PolicyScreen} />
    </Drawer.Navigator>
  );
};

const TabsNavigator: React.FC = () => (
  <Tabs.Navigator initialRouteName="Todos">
    <Tabs.Screen
      name="Todos"
      options={{ tabBarIcon: ListIcon }}
      component={TodosScreen}
    />
    <Tabs.Screen
      name="DrawerRoot"
      options={{ headerShown: false, tabBarIcon: SettingsIcon }}
      component={DrawerNavigator}
    />
  </Tabs.Navigator>
);

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="Create"
            component={CreateScreen}
            initialParams={{ isFirstOpen: false }}
            options={{
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen name="TabRoot" component={TabsNavigator} />
          <Stack.Screen
            name="TransparentTodo"
            component={TodoScreen}
            options={{
              presentation: "containedTransparentModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Todo"
            component={TodoScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
