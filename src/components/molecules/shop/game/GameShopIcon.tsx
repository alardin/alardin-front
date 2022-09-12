import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import Text from '../../../atoms/text/Text';

type IGameInfoNavigation = StackNavigationProp<RootStackParamList, 'GameInfo'>;

interface IGameShopIconProps {
  text: string;
  icon: string;
  id: number;
}

const GameIcon = styled.Image`
  width: 40px;
  height: 40px;
`;

const GameText = styled(Text)`
  padding-top: 8px;
  text-align: center;
`;

const GameShopIcon = ({ text, icon, id }: IGameShopIconProps) => {
  const navigation = useNavigation<IGameInfoNavigation>();
  const handlePress = () => {
    navigation.navigate('GameInfo', { gameId: id });
  };
  return (
    <Button onPress={handlePress}>
      <Box center>
        <GameIcon source={{ uri: icon }} />
        <GameText textType="comment">{text}</GameText>
      </Box>
    </Button>
  );
};

export default GameShopIcon;
