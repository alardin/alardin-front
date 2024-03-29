/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Button from '../../components/atoms/button/Button';
import Container from '../../components/atoms/container/Container';
import HighlightedText from '../../components/atoms/text/HighlightedText';
import Text from '../../components/atoms/text/Text';
import Rating from '../../components/molecules/other/Rating';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';
import alardinApi from '../../utils/alardinApi';

export type GameEndProps = StackScreenProps<RootStackParamList, 'GameEnd'>;

const CustomContainer = styled(Container)`
  height: 100%;
  justify-content: space-around;
`;

const TopBox = styled(Box)`
  width: 100%;
  align-items: center;
`;

const BottomBox = styled(Box)`
  width: 95%;
  height: 220px;
  border: ${({ theme }) => `1px solid ${theme.color.gray_100}`};
  background-color: ${({ theme }) => theme.color.white};
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  align-items: center;
  padding: 8px 0;
`;

const EndButton = styled(Button)`
  width: 100%;
`;

const GameEnd = ({ route, navigation }: GameEndProps) => {
  const { gameId } = route.params;
  console.log(route.params);
  const [ratingScore, setRatingScore] = useState<number>(1);
  const handleExit = async () => {
    await alardinApi.post(`/game/${gameId}/rate`, { score: ratingScore });
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomNavigation' }],
    });
  };
  return (
    <CustomContainer>
      <TopBox>
        <TextBox>
          <Text size="l">알람이 꺼졌습니다</Text>
          <Text size="l">좋은 하루 보내세요</Text>
        </TextBox>
      </TopBox>
      <BottomBox>
        <TextBox>
          <Text>게임은 어떠셨나요?</Text>
          <HighlightedText size="l">평가를 남겨주세요!</HighlightedText>
        </TextBox>
        <Rating {...{ setRatingScore }} />
      </BottomBox>
      <Button
        width="100%"
        height="l"
        options="sub"
        center
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomNavigation' }],
          })
        }>
        다음에 할래요
      </Button>
      <EndButton
        width="100%"
        height="xl"
        options="primary"
        center
        onPress={handleExit}>
        게임 종료
      </EndButton>
    </CustomContainer>
  );
};

export default GameEnd;
