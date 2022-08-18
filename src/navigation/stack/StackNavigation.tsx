import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../bottom/BottomNavigation';
import TCreate from '../../components/templates/home/TCreate';
import TAttend from '../../components/templates/home/TAttend';
import Login from '../../screen/Login';
import GameStart from '../../screen/game/GameStart';
import GameEnd from '../../screen/game/GameEnd';
import CallScreen, { IAgoraVoiceCall } from '../../screen/CallScreen';
import RtcEngine from 'react-native-agora';
import { IAlarmInfoProps } from '../../components/molecules/home/AlarmInfo';
import { useRecoilValue } from 'recoil';
import authorization from '../../recoil/authorization';

interface IAlarmAttendStackProps extends IAlarmInfoProps {
  type: string;
}
export type RootStackParamList = {
  Login: undefined;
  BottomNavigation: undefined;
  AlarmCreate: { type: string };
  AlarmAttend: IAlarmAttendStackProps;
  GameStart: {
    engine: RtcEngine | undefined;
    agora: IAgoraVoiceCall;
    setAgora: React.Dispatch<React.SetStateAction<IAgoraVoiceCall>>;
  };
  GameEnd: undefined;
  CallScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const auth = useRecoilValue(authorization);
  return (
    <Stack.Navigator initialRouteName="Login">
      {!auth.appAccessToken ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
      )}
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
