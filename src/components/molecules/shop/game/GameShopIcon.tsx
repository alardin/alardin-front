import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import GameDefaultIcon from '../../../../assets/icons/ic-game.svg';
import themeColor from '../../../../theme/theme';

type IGameInfoNavigation = StackNavigationProp<RootStackParamList, 'GameInfo'>;

interface IGameShopIconProps {
  text: string;
  icon?: string;
  id: number;
  isPaid: boolean;
}

const GameIcon = styled(Box)`
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.gray_200};
`;

const GameText = styled(Text)`
  padding-top: 8px;
  text-align: center;
`;

const GameShopIcon = ({ text, icon, id, isPaid }: IGameShopIconProps) => {
  const navigation = useNavigation<IGameInfoNavigation>();
  const handlePress = () => {
    navigation.navigate('GameInfo', { gameId: id, isPaid });
  };
  console.log(icon);
  return (
    <Box radius={12} center>
      <TouchableOpacity onPress={handlePress}>
        <GameIcon center>
          {icon ? (
            <Image source={{ uri: icon, width: 36, height: 36 }} />
          ) : (
            <GameDefaultIcon
              width={32}
              height={32}
              fill={themeColor.color.gray_400}
            />
          )}
        </GameIcon>
      </TouchableOpacity>
      <GameText size="xs">{text}</GameText>
    </Box>
  );
};

export default GameShopIcon;
