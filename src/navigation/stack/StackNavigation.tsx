import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../bottom/BottomNavigation';
import TCreate from '../../components/templates/home/TCreate';
import TAttend from '../../components/templates/home/TAttend';
import Login from '../../screen/Login';
import GameStart from '../../screen/game/GameStart';
import GameEnd from '../../screen/game/GameEnd';
import CallScreen from '../../screen/CallScreen';
import RtcEngine from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';
import { IAlarmInfoProps } from '../../components/molecules/home/main/AlarmInfo';
import { useRecoilValueLoadable } from 'recoil';
import { token } from '../../recoil/authorization';
import TMates from '../../components/templates/mates/TMates';
import TRetouch from '../../components/templates/home/TRetouch';
import { IAlarmInfoData } from '../../recoil/home/alarmList';
import Loading from '../../screen/Loading';
import TGame from '../../components/templates/shop/TGame';
import WebScreen from '../../screen/WebScreen';

interface IAlarmAttendStackProps extends IAlarmInfoProps {
  type: string;
}

interface IAlarmRetouchStackProps extends IAlarmInfoData {}

export type RootStackParamList = {
  Login: undefined;
  BottomNavigation: undefined;
  AlarmCreate: { type: string };
  AlarmAttend: IAlarmAttendStackProps;
  AlarmRetouch: IAlarmRetouchStackProps;
  GameStart: {
    id: number;
    client: RtmEngine | undefined;
    engine: RtcEngine | undefined;
    alarmId: number;
    userType: string;
  };
  GameEnd: {
    gameId: number;
  };
  CallScreen: {
    id: number;
    thumbnail_image_url: string;
    alarmId: number;
    nickname: string;
    userType: string;
  };
  Mates: undefined;
  Loading: undefined;
  GameInfo: {
    gameId: number;
  };
  WebScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const auth = useRecoilValueLoadable(token);
  return (
    <Stack.Navigator initialRouteName="Login">
      {!auth?.contents.appAccessToken ? (
        auth.state === 'loading' ? (
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )
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
        name="AlarmRetouch"
        component={TRetouch}
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
      <Stack.Screen
        name="Mates"
        component={TMates}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameInfo"
        component={TGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="WebScreen" component={WebScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
