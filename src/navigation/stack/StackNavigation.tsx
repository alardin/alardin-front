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
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { myProfile, token } from '../../recoil/authorization';

import TRetouch from '../../components/templates/home/TRetouch';
import { IAlarmInfoData } from '../../recoil/home/alarmList';
import Loading from '../../screen/Loading';
import TGame from '../../components/templates/shop/TGame';
import WebScreen from '../../screen/WebScreen';
import Mates from '../../components/pages/Mates';
import { TouchableOpacity } from 'react-native';

import BackIcon from '../../assets/icons/ic-back.svg';
import ShareIcon from '../../assets/icons/ic-share.svg';
import AddFriendsIcon from '../../assets/icons/ic-add-profile.svg';
import theme from '../../theme/theme';
import sharingAlarm from '../../utils/sharingAlarm';
import ChatIcon from '../../assets/icons/ic-chat.svg';
import Box from '../../components/atoms/box/Box';
import SingleGameStart from '../../screen/game/SingleGameStart';
import SingleGameEnd from '../../screen/game/SingleGameEnd';
import shareOnKakao from '../../utils/shareOnKakao';
import centerVisible from '../../recoil/mates/centerVisible';
import ProfileRetouch from '../../components/organisms/menu/ProfileRetouch';

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
    gameId: number;
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
    alarmId: number;
    gameId: number;
  };
  Mates: undefined;
  Loading: undefined;
  GameInfo: {
    gameId: number;
    isPaid: boolean;
  };
  WebScreen: {
    mode: string;
    uri?: string;
  };
  ProfileRetouch: {
    nickname: string;
    email: string;
    thumbnail_image_url: string;
    profile_image_url: string;
    bio: string;
    is_private: boolean;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const auth = useRecoilValueLoadable(token);
  const me = useRecoilValue(myProfile);
  const setMateVisible = useSetRecoilState(centerVisible);

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
          headerStyle: { backgroundColor: '#F8F9FA' },
          headerShadowVisible: false,
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
              <TouchableOpacity
                onPress={() => shareOnKakao('alarm', me.nickname)}>
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
        options={({ navigation }) => ({
          headerTitle: '알람방 수정',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
        })}
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
          headerRight: () => (
            <TouchableOpacity onPress={() => setMateVisible(true)}>
              <AddFriendsIcon
                width={28}
                height={28}
                fill={theme.color.gray_900}
                style={{ marginHorizontal: 8 }}
              />
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
      <Stack.Screen
        name="ProfileRetouch"
        component={ProfileRetouch}
        options={({ navigation }) => ({
          headerTitle: '프로필 정보 수정',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={28} height={28} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
