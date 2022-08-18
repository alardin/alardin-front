/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Button from '../../components/atoms/button/Button';
import Container from '../../components/atoms/container/Container';
import Text from '../../components/atoms/text/Text';
import Rating from '../../components/molecules/other/Rating';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';

export type GameEndProps = StackScreenProps<RootStackParamList, 'GameEnd'>;

const CustomContainer = styled(Container)`
  height: 100%;
  justify-content: space-evenly;
`;

const TopBox = styled(Box)`
  width: 100%;
  align-items: center;
`;

const BottomBox = styled(Box)`
  width: 100%;
  align-items: center;
`;

const TextBox = styled(Box)`
  align-items: center;
  padding: 8px 0;
`;

const EndButton = styled(Button)`
  width: 100%;
`;

const GameEnd = ({ navigation }: GameEndProps) => {
  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomNavigation' }],
    });
  };
  return (
    <CustomContainer>
      <TopBox>
        <TextBox>
          <Text textType="subTitle" options="semiBold">
            알람이 꺼졌습니다
          </Text>
          <Text textType="subTitle" options="semiBold">
            좋은 하루 보내세요 😄
          </Text>
        </TextBox>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            height: 200,
            transform: [{ scale: 1.5 }],
            marginTop: 100,
          }}
          source={require('../../assets/images/game-end-flag.png')}
        />
      </TopBox>
      <BottomBox>
        <TextBox>
          <Text textType="subTitle" options="semiBold">
            게임이 즐거우셨다면,
          </Text>
          <Text textType="subTitle" options="semiBold">
            좋은 평가 부탁드립니다!
          </Text>
        </TextBox>
        <Rating />
      </BottomBox>
      <EndButton
        colorName="black"
        width="100%"
        height="48px"
        center
        onPress={handleExit}>
        게임 종료
      </EndButton>
    </CustomContainer>
  );
};

export default GameEnd;
