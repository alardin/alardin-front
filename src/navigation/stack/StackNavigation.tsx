import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

import TRetouch from '../../components/templates/home/TRetouch';
import { IAlarmInfoData } from '../../recoil/home/alarmList';
import Loading from '../../screen/Loading';
import TGame from '../../components/templates/shop/TGame';
import WebScreen from '../../screen/WebScreen';
import Mates from '../../components/pages/Mates';
import { Share, TouchableOpacity } from 'react-native';

import BackIcon from '../../assets/icons/ic-back.svg';
import ShareIcon from '../../assets/icons/ic-share.svg';
import theme from '../../theme/theme';
import sharingAlarm from '../../utils/sharingAlarm';
import ChatIcon from '../../assets/icons/ic-chat.svg';
import Box from '../../components/atoms/box/Box';
import SingleGameStart from '../../screen/game/SingleGameStart';
import SingleGameEnd from '../../screen/game/SingleGameEnd';

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
  SingleGameStart: {
    id: number;
    alarmId: number;
  };
  SingleGameEnd: {
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
  WebScreen: {
    mode: string;
    uri?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        options={({ navigation }) => ({
          headerTitle: '알람방 생성',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AlarmAttend"
        component={TAttend}
        options={({ navigation }) => ({
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Box row>
              <TouchableOpacity onPress={() => sharingAlarm()}>
                <ShareIcon
                  width={28}
                  height={28}
                  fill={theme.color.gray_900}
                  style={{ marginHorizontal: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('kakao share link')}>
                <ChatIcon
                  width={28}
                  height={28}
                  fill={theme.color.gray_900}
                  style={{ marginHorizontal: 8 }}
                />
              </TouchableOpacity>
            </Box>
          ),
        })}
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
        name="SingleGameStart"
        component={SingleGameStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleGameEnd"
        component={SingleGameEnd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mates"
        component={Mates}
        options={({ navigation }) => ({
          headerTitle: '메이트 목록',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="GameInfo"
        component={TGame}
        options={({ navigation }) => ({
          headerTitle: '게임 정보',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
