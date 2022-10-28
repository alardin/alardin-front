import React from 'react';
import Box from '../components/atoms/box/Box';
import Button from '../components/atoms/button/Button';
import Text from '../components/atoms/text/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Container from '../components/atoms/container/Container';
import styled from 'styled-components/native';
import HighlightedText from '../components/atoms/text/HighlightedText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/stack/StackNavigation';
import { useRecoilValue } from 'recoil';
import { token } from '../recoil/authorization';

type BottomStackScreen = StackScreenProps<
  RootStackParamList,
  'BottomNavigation'
>;

const CustomContainer = styled.SafeAreaView`
  flex: 1;
  padding: 8px;
`;

const TopBox = styled(Box)`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const MiddleBox = styled(Box)`
  flex: 3;
  padding: 0 12px;
  align-items: center;
`;

const BottomBox = styled(Box)`
  flex: 1.5;
  justify-content: flex-end;
  align-items: center;
`;

const ItemBox = styled(Box)`
  margin: 8px 0;
`;

const IconBox = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  flex: 3;
`;

const TextTitle = styled(Text)`
  margin: 8px 0;
`;

const PermissionScreen = ({ navigation }: BottomStackScreen) => {
  const isLogin = useRecoilValue(token);
  const permissionMetaData = [
    {
      name: '앱 추적',
      icon: 'advertisements',
      description:
        '사용자에게 적합한 광고를 보여주기 위해 앱 추적 권한을 허용합니다.',
    },
    {
      name: '마이크',
      icon: 'microphone',
      description: '알람을 끄기 위해 마이크 사용을 허용합니다.',
    },
    {
      name: '푸쉬 알림',
      icon: 'notification-clear-all',
      description: '알람을 울리기 위해 푸쉬 알림 권한을 허용합니다.',
    },
  ];

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const handleRequestPermission = async () => {
    const checkPermissionArr =
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.MICROPHONE,
            PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
          ]
        : [
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          ];
    await requestUserPermission();
    const response = await requestMultiple(checkPermissionArr);
    const result =
      Platform.OS === 'ios'
        ? response['ios.permission.APP_TRACKING_TRANSPARENCY'] === 'denied' ||
          response['ios.permission.MICROPHONE'] === 'denied'
        : response['android.permission.POST_NOTIFICATIONS'] === 'denied' ||
          response['android.permission.RECORD_AUDIO'] === 'denied';
    if (result) {
      await handleRequestPermission();
    }
    navigation.reset({
      index: 0,
      routes: [!isLogin ? { name: 'Login' } : { name: 'BottomNavigation' }],
    });
  };

  return (
    <CustomContainer>
      <TopBox>
        <Text size="m" options="bold">
          해당 서비스를 이용하기 위해
        </Text>
        <Text size="m" options="bold">
          아래와 같은 권한 허용이 필요합니다.
        </Text>
      </TopBox>
      <MiddleBox>
        {permissionMetaData.map(({ name, icon, description }, index) => (
          <ItemBox row key={`permission_${index}`}>
            <IconBox>
              <Icon name={icon} size={48} />
            </IconBox>
            <TextBox>
              <TextTitle options="semiBold">{name}</TextTitle>
              <Text>{description}</Text>
            </TextBox>
          </ItemBox>
        ))}
      </MiddleBox>
      <BottomBox>
        <Button
          width="95%"
          height="xl"
          options="primary"
          center
          onPress={handleRequestPermission}>
          권한 설정
        </Button>
      </BottomBox>
    </CustomContainer>
  );
};

export default PermissionScreen;
