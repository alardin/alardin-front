import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';
import Box from '../../atoms/box/Box';

const AlarmContainer = styled(Box)`
  height: 86px;
  justify-content: center;
  align-items: center;
`;

const AlarmPlus = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('AlarmCreate', { type: 'plus' });
  };
  return (
    <TouchableHighlight onPress={handlePress}>
      <AlarmContainer width="100%" height="100%" colorName="white">
        <Icon name="plus" size={40} color={theme.color.black} />
      </AlarmContainer>
    </TouchableHighlight>
  );
};

export default AlarmPlus;
