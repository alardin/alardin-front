import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import Text from '../../../atoms/text/Text';

export type IMateNavigation = StackNavigationProp<RootStackParamList, 'Mates'>;

const AlarmContainer = styled(Box)`
  height: 180px;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.color.gray_300}`};
`;

const CustomText = styled(Text)`
  margin-bottom: 18px;
`;

const AlarmInvite = () => {
  const navigation = useNavigation<IMateNavigation>();
  const handlePress = () => {
    navigation.navigate('Mates');
  };
  return (
    <AlarmContainer width="100%">
      <CustomText>새로운 메이트와 알람방에 참여해보세요!</CustomText>
      <Button height="m" options="secondary" center onPress={handlePress}>
        메이트 요청하러 가기
      </Button>
    </AlarmContainer>
  );
};

export default AlarmInvite;
