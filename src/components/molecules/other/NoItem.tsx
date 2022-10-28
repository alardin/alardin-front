import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import theme from '../../../theme/theme';
import { Dimensions } from 'react-native';

interface INoItemProps {
  title: string;
}

const CustomBox = styled(Box)`
  justify-content: center;
  align-items: center;
`;

const NoItem = ({ title }: INoItemProps) => {
  const windowHeight = Math.floor(Dimensions.get('screen').height * 0.7);
  return (
    <CustomBox width="100%" height={`${windowHeight}px`}>
      <Text
        options="semiBold"
        colorName={theme.color.gray_500}>{`${title} 리스트가 없어요.`}</Text>
    </CustomBox>
  );
};

export default NoItem;
