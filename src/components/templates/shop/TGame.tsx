/* eslint-disable @typescript-eslint/no-unused-expressions */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import alardinApi from '../../../utils/alardinApi';
import GameInfo, { IGameInfoData } from '../../organisms/shop/GameInfo';

type IGameInfoScreen = StackScreenProps<RootStackParamList, 'GameInfo'>;

const TGame = ({ route }: IGameInfoScreen) => {
  const { gameId, isPaid } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const [gameData, setGameData] = useState<IGameInfoData>({
    game: {
      id: 0,
      name: '',
      category: '',
      price: 0,
      description: '',
      thumbnail_url: '',
      min_player: 0,
      max_player: 0,
      rating: 0,
      keyword_count: 0,
    },
    gameScreenshots: [],
  });

  useEffect(() => {
    !visible &&
      alardinApi
        .get(`/game/${gameId}`)
        .then(res => {
          console.log(res.data.data);
          setGameData(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
  }, [visible]);

  return (
    <GameInfo
      {...gameData}
      isPaid={isPaid}
      visible={visible}
      setVisible={setVisible}
    />
  );
};

export default TGame;
