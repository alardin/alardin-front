import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout, unlink } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  IAuthorization,
  IMyProfile,
  loginPlatform,
  myProfile,
  token,
} from '../../../recoil/authorization';
import AdBox from '../../organisms/menu/AdBox';
import ProfileBox from '../../organisms/menu/ProfileBox';
import SettingList from '../../organisms/menu/SettingList';
import alardinApi from '../../../utils/alardinApi';
import axios from 'axios';
import SwitchList from '../../organisms/menu/SwitchList';

const TMenu = () => {
  const navigation = useNavigation<any>();
  const me = useRecoilValue(myProfile);

  const [profile, setProfile] = useState<IMyProfile>({} as IMyProfile);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  console.log(me);
  const setAuthorization = useSetRecoilState(token);
  const setLoginPlatform = useSetRecoilState(loginPlatform);

  const handleLogout = async () => {
    await EncryptedStorage.removeItem('appAccessToken');
    await EncryptedStorage.removeItem('appRefreshToken');
    // await AsyncStorage.removeItem('notifyStorage');
    setAuthorization({} as IAuthorization);
    setLoginPlatform('none');
    await logout();
  };

  const handleExit = async () => {
    alardinApi.delete('/users').then(async () => {
      await EncryptedStorage.removeItem('appAccessToken');
      await EncryptedStorage.removeItem('appRefreshToken');
      await AsyncStorage.removeItem('notifyStorage');
      await unlink();
      setAuthorization({} as IAuthorization);
      setLoginPlatform('none');
    });
  };

  const swtichItems = [
    {
      title: '프로필 공개 설정',
      value: profile.is_private,
      handler: async (args: any) => {
        const { nickname, bio, profile_image_url, thumbnail_image_url } =
          profile;
        console.log(args, profile);
        const response = await alardinApi.post('/users/edit', {
          nickname,
          bio,
          profile_image_url,
          thumbnail_image_url,
          is_private: args,
        });
        console.log(response);
      },
    },
  ];

  const appItems = [
    {
      type: 'button_no-icon',
      key: '공지사항',
      handlePress: () =>
        navigation.navigate('CallScreen', { id: me.id, alarmId: 51 }),
      // navigation.navigate('WebScreen', {
      // mode: 'WEB',
      // uri: 'https://www.google.com',
      // }),
    },
    {
      type: 'button_no-icon',
      key: '고객센터',
      handlePress: () =>
        navigation.navigate('WebScreen', {
          mode: 'WEB',
          uri: 'http://pf.kakao.com/_mxfYTxj',
        }),
    },
    {
      type: 'button_no-icon',
      key: '개인정보 처리방침',
      handlePress: () =>
        navigation.navigate('WebScreen', {
          mode: 'WEB',
          uri: 'https://alard.in/terms/personal',
        }),
    },
    {
      type: 'button_no-icon',
      key: '서비스이용약관',
      handlePress: () =>
        navigation.navigate('WebScreen', {
          mode: 'WEB',
          uri: 'https://alard.in/terms/service',
        }),
    },
    { type: 'info', key: '앱 버전', value: '1.0.0' },
    {
      type: 'button_info',
      key: '회원탈퇴',
      handlePress: handleExit,
    },
    {
      type: 'button_info',
      key: '로그아웃',
      handlePress: handleLogout,
    },
  ];

  useEffect(() => {
    axios.all([alardinApi.get('/users'), alardinApi.get('/assets')]).then(
      axios.spread((res1, res2) => {
        const user = res1.data.data;
        const asset = res2.data.data;
        setProfile(user);
        setIsPremium(asset.is_premium);
      }),
    );
  }, []);

  return (
    <>
      <ScrollView>
        <ProfileBox premium={isPremium} profile={profile} />
        {Object.keys(profile).length !== 0 && (
          <SwitchList title="앱 설정" data={swtichItems} />
        )}
        <SettingList title="앱 설정" data={appItems} />
        <AdBox />
      </ScrollView>
    </>
  );
};

export default TMenu;
