import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout, unlink } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  IAuthorization,
  IMyProfile,
  loginPlatform,
  token,
} from '../../../recoil/authorization';
import AdBox from '../../organisms/menu/AdBox';
import ProfileBox from '../../organisms/menu/ProfileBox';
import SettingList from '../../organisms/menu/SettingList';
import alardinApi from '../../../utils/alardinApi';
import axios from 'axios';
import SwitchList from '../../organisms/menu/SwitchList';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';

const TMenu = () => {
  const navigation = useNavigation<any>();

  const [profile, setProfile] = useState<IMyProfile>({} as IMyProfile);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const setAuthorization = useSetRecoilState(token);
  const [loginPlat, setLoginPlatform] = useRecoilState(loginPlatform);

  const handleLogout = () => {
    alardinApi.post('/users/logout').then(async () => {
      await EncryptedStorage.removeItem('appAccessToken');
      await EncryptedStorage.removeItem('appRefreshToken');
      // await AsyncStorage.removeItem('notifyStorage');
      setAuthorization({} as IAuthorization);
      messaging().unsubscribeFromTopic('all');
      if (loginPlat === 'kakao') {
        await logout();
      }
      setLoginPlatform('none');
    });
  };

  const handleExit = async () => {
    Alert.alert(
      '회원 탈퇴 확인',
      `${profile.nickname} 회원님께서 Alardin 회원에 탈퇴하시겠습니까?`,
      [
        { text: '아니요' },
        {
          text: '예',
          onPress: () =>
            unlink()
              .then(res => {
                console.log(res);
              })
              .finally(() => {
                alardinApi.delete('/users').then(async () => {
                  messaging().unsubscribeFromTopic('all');
                  await EncryptedStorage.removeItem('appAccessToken');
                  await EncryptedStorage.removeItem('appRefreshToken');
                  await AsyncStorage.removeItem('notifyStorage');
                  setLoginPlatform('none');
                  setAuthorization({} as IAuthorization);
                });
              }),
        },
      ],
    );
  };

  const swtichItems = [
    {
      title: '프로필 공개 설정',
      value: profile.is_private,
      handler: async (args: any) => {
        const { nickname, bio, profile_image_url, thumbnail_image_url } =
          profile;
        await alardinApi.post('/users/edit', {
          nickname,
          bio,
          profile_image_url,
          thumbnail_image_url,
          is_private: args,
        });
      },
    },
  ];

  const appItems = [
    {
      type: 'button_no-icon',
      key: '프로필 정보 수정',
      handlePress: () => {
        const {
          nickname,
          bio,
          profile_image_url,
          thumbnail_image_url,
          is_private,
        } = profile;
        navigation.navigate('ProfileRetouch', {
          nickname,
          bio,
          profile_image_url,
          thumbnail_image_url,
          email: profile.email,
          is_private,
        });
      },
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
    return () => {
      setProfile({} as IMyProfile);
      setIsPremium(false);
    };
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
