import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import theme from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

interface IUserGameProps {
  totalGames: number;
}

const CustomBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 18px;
  margin: 4px 0;
`;

const IconText = styled(Text)`
  margin-left: 8px;
`;

const UserGame = ({ totalGames }: IUserGameProps) => {
  return (
    <CustomBox colorName="white" row>
      <Box row center>
        <Icon
          name="game-controller-outline"
          size={20}
          color={theme.color.green}
        />
        <IconText options="semiBold">보유 게임 개수</IconText>
      </Box>
      <Text options="semiBold">{`${totalGames} 개`}</Text>
    </CustomBox>
  );
};

export default UserGame;
