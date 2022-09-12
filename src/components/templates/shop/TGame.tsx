import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import alardinApi from '../../../utils/alardinApi';
import GameInfo from '../../organisms/shop/GameInfo';

type IGameInfoScreen = StackScreenProps<RootStackParamList, 'GameInfo'>;

const TGame = ({ route }: IGameInfoScreen) => {
  const { gameId } = route.params;
  const [gameData, setGameData] = useState<IGameMetaType>({} as IGameMetaType);

  useEffect(() => {
    console.log(gameId);
    alardinApi
      .get(`/game/${gameId}`)
      .then(res => {
        setGameData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return <GameInfo {...gameData} />;
};

export default TGame;
