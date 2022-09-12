import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Description from '../../molecules/shop/game/Description';
import Header from '../../molecules/shop/game/Header';
import ScreenShots from '../../molecules/shop/game/ScreenShots';

const ConfirmButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const GameInfo = () => {
  return (
    <SafeAreaView>
      <Container>
        <ScrollView>
          <Header title="게임 1" />
          <Description />
          <ScreenShots />
          <ConfirmButton width="100%" height="48px" colorName="black" center>
            게임 구매
          </ConfirmButton>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default GameInfo;
