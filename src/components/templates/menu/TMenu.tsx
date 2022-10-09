import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout, unlink } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSetRecoilState } from 'recoil';
import {
  IAuthorization,
  IMyProfile,
  token,
} from '../../../recoil/authorization';
import AdBox from '../../organisms/menu/AdBox';
import ProfileBox from '../../organisms/menu/ProfileBox';
import SettingList from '../../organisms/menu/SettingList';
import alardinApi from '../../../utils/alardinApi';
import axios from 'axios';

const TMenu = () => {
  const navigation = useNavigation<any>();

  const setAuthorization = useSetRecoilState(token);
  const handleLogout = async () => {
    await EncryptedStorage.removeItem('appAccessToken');
    await EncryptedStorage.removeItem('appRefreshToken');
    // await AsyncStorage.removeItem('notifyStorage');
    setAuthorization({} as IAuthorization);
    await logout();
  };

  const handleExit = async () => {
    alardinApi.delete('/users').then(async () => {
      await EncryptedStorage.removeItem('appAccessToken');
      await EncryptedStorage.removeItem('appRefreshToken');
      await AsyncStorage.removeItem('notifyStorage');
      await unlink();
      setAuthorization({} as IAuthorization);
    });
  };

  const handlePressOne = () => {
    navigation.navigate('SingleGameStart', { id: 0, alarmId: 0 });
    // soundAlarm();
    // navigation.navigate({
    //   name: 'CallScreen',
    //   params: {
    //     id: 2,
    //     alarmId: 44,
    //     nickname: '이상혁',
    //     userType: 'A',
    //     thumbnail_image_url:
    //       'http://k.kakaocdn.net/dn/y4RJA/btqDmsGeqzy/gHEgXJJQgp5paxkG1PU8m0/img_110x110.jpg',
    //   },
    // });
    // console.log('notify');
    // PushNotification.localNotification({
    //   channelId: 'alardin-channel-id',
    //   title: 'Notification Test',
    //   message: '하이루~~',
    //   playSound: false,
    // });
  };

  const appItems = [
    {
      type: 'button_no-icon',
      key: '공지사항',
      handlePress: () => navigation.navigate('WebScreen'),
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
      handlePress: () => navigation.navigate('WebScreen', { mode: 'POLICY' }),
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

  const [profile, setProfile] = useState<IMyProfile>({} as IMyProfile);
  const [isPremium, setIsPremium] = useState<boolean>(false);

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
        <SettingList title="앱 설정" data={appItems} />
        <AdBox />
      </ScrollView>
    </>
  );
};

export default TMenu;
