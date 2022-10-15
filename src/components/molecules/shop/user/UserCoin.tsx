import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';
import { IUserAssetData } from '../../../organisms/shop/ShopProfile';
import AnimateNumber from 'react-native-animate-number';

interface IUserCoinProps {
  asset: IUserAssetData;
}

const CustomBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 18px;
  margin-top: 8px;
  margin-bottom: 40px;
`;

const IconText = styled(Text)`
  margin-right: 8px;
`;

const UserCoin = ({ asset }: IUserCoinProps) => {
  const { coin } = asset;
  return (
    <CustomBox bgColor={theme.color.white} row>
      <Text options="semiBold">보유한 알람 코인</Text>
      <Box row center>
        <IconText options="semiBold">
          <AnimateNumber
            value={coin}
            timing="linear"
            formatter={(val: string) => {
              return parseFloat(val).toFixed(0);
            }}
            interval={5}
          />
        </IconText>
        <Icon name="coins" size={20} color="#FFD700" />
      </Box>
    </CustomBox>
  );
};

export default UserCoin;
