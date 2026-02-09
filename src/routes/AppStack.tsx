import React from 'react';

import { useSaveNotificationToken } from '@domain';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CameraScreen,
  DarkModeScreen,
  EditEmailScreen,
  EditPasswordScreen,
  EditProfileScreen,
  MyFollowersScreen,
  MyFollowingScreen,
  PostCommentScreen,
  ProfileScreen,
  PublishPostScreen,
  SearchScreen,
  SettingsScreen,
} from '@screens';

import { AppTabBottomTabParamList, AppTabNavigator } from './AppTabNavigator';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  SettingsScreen: undefined;
  DarkModeScreen: undefined;
  PostCommentScreen: {
    postId: number;
    postAuthorId: number;
    showPost?: boolean;
  };
  ProfileScreen: { userId: number };
  SearchScreen: undefined;
  PublishPostScreen: { imageUri: string };
  CameraScreen: undefined;
  EditProfileScreen: { userId: number };
  EditEmailScreen: { userId: number };
  EditPasswordScreen: { userId: number };
  MyFollowersScreen: undefined;
  MyFollowingScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {
  initialRouteName?: keyof AppStackParamList;
}

export function AppStack({ initialRouteName = 'AppTabNavigator' }: Props) {
  useSaveNotificationToken();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        animation: 'slide_from_right',
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PublishPostScreen" component={PublishPostScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="DarkModeScreen" component={DarkModeScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
      <Stack.Screen name="EditEmailScreen" component={EditEmailScreen} />
      <Stack.Screen name="MyFollowersScreen" component={MyFollowersScreen} />
      <Stack.Screen name="MyFollowingScreen" component={MyFollowingScreen} />
    </Stack.Navigator>
  );
}
