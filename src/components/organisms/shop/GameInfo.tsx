import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Description from '../../molecules/shop/game/Description';
import Header from '../../molecules/shop/game/Header';
import ScreenShots from '../../molecules/shop/game/ScreenShots';

export interface IGameInfoData {
  game: IGameMetaType;
  gameScreenshots: string[];
}

const ConfirmButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const GameInfo = ({ game, gameScreenshots }: IGameInfoData) => {
  return (
    <SafeAreaView>
      <Container>
        <ScrollView>
          <Header title={game.name} />
          <Description descript={game.description} />
          <ScreenShots images={gameScreenshots} />
          <ConfirmButton width="100%" height="48px" colorName="black" center>
            게임 구매
          </ConfirmButton>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default GameInfo;
