/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Button from '../../components/atoms/button/Button';
import Container from '../../components/atoms/container/Container';
import Text from '../../components/atoms/text/Text';
import Rating from '../../components/molecules/other/Rating';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';

export type GameEndProps = StackScreenProps<
  RootStackParamList,
  'SingleGameEnd'
>;

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

const HightLightText = styled(Text)`
  margin: 4px 0;
`;

const SingleGameEnd = ({ route, navigation }: GameEndProps) => {
  const { gameId } = route.params;
  console.log(route.params);
  const [, setRatingScore] = useState<number>(1);
  const handleExit = async () => {
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
      {gameId !== 0 && (
        <BottomBox>
          <TextBox>
            <Text>게임은 어떠셨나요?</Text>
            <HightLightText size="l">평가를 남겨주세요!</HightLightText>
          </TextBox>
          <Rating {...{ setRatingScore }} />
        </BottomBox>
      )}
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

export default SingleGameEnd;
