import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import theme from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';

export type IAlarmCreateNavigation = StackNavigationProp<
  RootStackParamList,
  'AlarmCreate'
>;

const AlarmContainer = styled(Box)`
  height: 86px;
  justify-content: center;
  align-items: center;
`;

const AlarmPlus = () => {
  const navigation = useNavigation<IAlarmCreateNavigation>();
  const handlePress = () => {
    navigation.navigate('AlarmCreate', { type: 'plus' });
  };
  return (
    <Button onPress={handlePress}>
      <AlarmContainer width="100%" height="100%" colorName="white">
        <Icon name="plus" size={40} color={theme.color.black} />
      </AlarmContainer>
    </Button>
  );
};

export default AlarmPlus;
