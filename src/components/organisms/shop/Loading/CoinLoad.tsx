import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

const CustomBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 18px;
  margin-top: 8px;
  margin-bottom: 40px;
`;

const CoinLoad = () => {
  return (
    <CustomBox bgColor={theme.color.white} row>
      <Text options="semiBold">보유한 알람 코인</Text>
      <Placeholder Animation={Fade}>
        <Box row center>
          <PlaceholderLine
            width={20}
            height={20}
            noMargin
            style={{ marginRight: 8 }}
          />
          <Icon name="coins" size={20} color="#FFD700" />
        </Box>
      </Placeholder>
    </CustomBox>
  );
};

export default CoinLoad;
