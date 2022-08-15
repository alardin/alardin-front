import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../bottom/BottomNavigation';
import TCreate from '../../components/templates/home/TCreate';
import TAttend from '../../components/templates/home/TAttend';
import Login from '../../screen/Login';
import GameStart from '../../screen/game/GameStart';
import GameEnd from '../../screen/game/GameEnd';
import CallScreen from '../../screen/CallScreen';

export type RootStackParamList = {
  BottomNavigation: undefined;
  AlarmCreate: undefined;
  AlarmAttend: undefined;
  Login: undefined;
  GameStart: undefined;
  GameEnd: undefined;
  CallScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavigation">
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlarmCreate"
        component={TCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlarmAttend"
        component={TAttend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameStart"
        component={GameStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameEnd"
        component={GameEnd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
