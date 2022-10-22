/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import themeColor from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

interface IGameDetails {
  category: string;
  rating: number;
  minPlayer: number;
  maxPlayer: number;
}

const ItemBox = styled(Box)`
  width: 100px;
  justify-content: center;
  align-items: center;
`;

const ItemTitle = styled(Text)`
  margin-bottom: 8px;
`;

const Line = styled(Box)`
  width: 3px;
  height: 70%;
  align-self: center;
  background-color: ${({ theme }) => theme.color.gray_200}; ;
`;

const GameDetails = ({
  category,
  rating,
  minPlayer,
  maxPlayer,
}: IGameDetails) => {
  const titleArr = ['카테고리', '평가', '최소 인원', '최대 인원'];
  const dataArr = [category, `${rating}점`, `${minPlayer}명`, `${maxPlayer}명`];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        height: 100,
        borderTopColor: `${themeColor.color.gray_200}`,
        borderTopWidth: 3,
        borderBottomColor: `${themeColor.color.gray_200}`,
        borderBottomWidth: 3,
      }}>
      {titleArr.map((title, index) => (
        <Box key={`content_${index}`} row>
          <ItemBox>
            <ItemTitle options="semiBold">{title}</ItemTitle>
            <Text colorName={themeColor.color.gray_700}>{dataArr[index]}</Text>
          </ItemBox>
          <Line />
        </Box>
      ))}
    </ScrollView>
  );
};

export default GameDetails;
