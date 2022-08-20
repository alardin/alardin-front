import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';
import Button from '../atoms/button/Button';
import Container from '../atoms/container/Container';
import Text from '../atoms/text/Text';
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout } from '@react-native-seoul/kakao-login';
import { useSetRecoilState } from 'recoil';
import { IAuthorization, token } from '../../recoil/authorization';

export type CallScreenProps = StackNavigationProp<
  RootStackParamList,
  'CallScreen'
>;

const Menu = () => {
  const setAuthorization = useSetRecoilState(token);
  const navigation = useNavigation<CallScreenProps>();
  const handlePress = () => {
    navigation.navigate('CallScreen');
  };
  const handleLogout = async () => {
    await EncryptedStorage.removeItem('appAccessToken');
    await EncryptedStorage.removeItem('appRefreshToken');
    setAuthorization({} as IAuthorization);
    await logout();
  };
  return (
    <SafeAreaView>
      <Container>
        <Text textType="title" options="bold">
          Hello Menu!
        </Text>
        <Button
          width="100%"
          height="48px"
          colorName="black"
          center
          onPress={handlePress}>
          Navigate to CallScreen
        </Button>
        <Button
          width="100%"
          height="48px"
          colorName="black"
          center
          onPress={handleLogout}>
          Logout
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default Menu;
