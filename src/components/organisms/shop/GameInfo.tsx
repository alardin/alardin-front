import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import CenterScreen from '../../../screen/CenterScreen';
import Container from '../../atoms/container/Container';
import Description from '../../molecules/shop/game/Description';
import GameDetails from '../../molecules/shop/game/GameDetails';
import GameProfile from '../../molecules/shop/game/GameProfile';
import ScreenShots from '../../molecules/shop/game/ScreenShots';
import BuyConfirm from './BuyConfirm';

interface IGameInfoProps extends IGameInfoData {
  isPaid: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGameInfoData {
  game: IGameMetaType;
  gameScreenshots: string[];
}

const CustomScrollView = styled.ScrollView`
  height: 100%;
`;

const GameInfo = ({
  game,
  gameScreenshots,
  isPaid,
  visible,
  setVisible,
}: IGameInfoProps) => {
  const {
    id,
    name,
    category,
    price,
    description,
    thumbnail_url,
    rating,
    min_player,
    max_player,
  } = game;

  return (
    <SafeAreaView>
      <Container>
        <CustomScrollView>
          <GameProfile
            {...{ name, price, thumbnail_url, id, isPaid, setVisible }}
          />
          <GameDetails
            minPlayer={min_player}
            maxPlayer={max_player}
            {...{ category, rating }}
          />
          <Description descript={description} />
          <ScreenShots images={gameScreenshots} />
        </CustomScrollView>
      </Container>
      <CenterScreen {...{ visible, setVisible }}>
        <BuyConfirm
          name={name}
          price={String(price)}
          setVisible={setVisible}
          id={id}
        />
      </CenterScreen>
    </SafeAreaView>
  );
};

export default GameInfo;
