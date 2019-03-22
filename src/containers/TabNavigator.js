import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import ProfilScreen from "./ProfilScreen";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profil: ProfilScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";

            break;
          case "Settings":
            iconName = "ios-settings";

            break;
          case "Profil":
            iconName = "md-people";
            break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#FF5A5F",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;
  let headerStyle;
  let headerTintColor;

  switch (routeName) {
    case "Home":
      headerTitle = "Liste des appartements";
      (headerStyle = {
        backgroundColor: "#FF5A5F"
      }),
        (headerTintColor = "white");
      break;
    case "Settings":
      headerTitle = "Paramètres";
      (headerStyle = {
        backgroundColor: "#FF5A5F"
      }),
        (headerTintColor = "white");
      break;
    default:
      headerTitle = routeName;
      (headerStyle = {
        backgroundColor: "#FF5A5F"
      }),
        (headerTintColor = "white");
  }

  return {
    headerTitle,
    headerStyle,
    headerTintColor
  };
};

export default TabNavigator;
