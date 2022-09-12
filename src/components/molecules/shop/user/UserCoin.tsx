import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

interface IUserCoinProps {
  coin: number;
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

const UserCoin = ({ coin }: IUserCoinProps) => {
  return (
    <CustomBox colorName="white" row>
      <Box row center>
        <Icon name="coins" size={20} color="#FFD700" />
        <IconText options="semiBold">회원 등급</IconText>
      </Box>
      <Text options="semiBold">{`${coin} G`}</Text>
    </CustomBox>
  );
};

export default UserCoin;
