import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import Box from '../../../atoms/box/Box';
import NetInfo from '@react-native-community/netinfo';
import Button from '../../../atoms/button/Button';
import Text from '../../../atoms/text/Text';
import { toastEnable } from '../../../../utils/Toast';

export type IAlarmCreateNavigation = StackNavigationProp<
  RootStackParamList,
  'AlarmCreate'
>;

const AlarmContainer = styled(Box)`
  height: 180px;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.color.gray_300}`};
`;

const CustomText = styled(Text)`
  margin-bottom: 18px;
`;

const AlarmPlus = () => {
  const navigation = useNavigation<IAlarmCreateNavigation>();
  const handlePress = () => {
    NetInfo.fetch().then(state =>
      state.isConnected
        ? navigation.navigate('AlarmCreate', { type: 'plus' })
        : toastEnable({
            text: '오프라인 모드에서는 사용하실 수 없는 기능입니다',
            duration: 'LONG',
          }),
    );
  };
  return (
    <AlarmContainer width="100%">
      <CustomText>메이트와 함께 알람방에 참여해보세요!</CustomText>
      <Button height="m" options="secondary" center onPress={handlePress}>
        알람방 참여하러 가기
      </Button>
    </AlarmContainer>
  );
};

export default AlarmPlus;
