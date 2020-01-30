import React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Profile from "../../screen/Profile";
import Setting from "../../screen/Profile/Setting";
import ChangePass from "../../screen/Profile/ChangePass";

import Home from "../../screen/Home";
import Detail from "../../screen/Detail";
import Search from "../../screen/Detail/Search";

import View from "../../screen/ViewDetail";
import Attachment from "../../screen/Attachment";

import homeIcon from "assets/ic_home/ic_home.png";
import settingsIcon from "assets/ic_settings/ic_settings.png";
import Colors from "helpers/Colors";

const iconForTab = ({ state }) => {
  switch (state.routeName) {
    case "Home":
      return homeIcon;
    case "Profile":
      return settingsIcon;
    default:
      return null;
  }
};

const TabIcon = (
  { icon, tintColor } // eslint-disable-line
) => <Image source={icon} style={{ tintColor }} />;

const ProfileStack = createStackNavigator({ Profile, Setting, ChangePass });
const HomeStack = createStackNavigator({
  Home,
  Detail,
  View,
  Attachment
});
const AppStack = createStackNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
    View: View
    //Attachment: Attachment
  },
  {
    header: null,
    headerMode: "none"
  }
);

export default AppStack;
