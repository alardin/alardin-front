import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import CenterScreen from '../../../screen/CenterScreen';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import UserCoin from '../../molecules/shop/user/UserCoin';
import UserGame from '../../molecules/shop/user/UserGame';
import GameShopList from '../../organisms/shop/GameShopList';
import Header from '../../organisms/shop/Header';
import PremiumBuy from '../../organisms/shop/PremiumBuy';
import UserList from '../../organisms/shop/UserList';

interface IUserAssetData {
  coin: number;
  isPremium: boolean;
  totalGames: number;
}

const TShop = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [userAsset, setUserAsset] = useState<IUserAssetData>(
    {} as IUserAssetData,
  );
  const [gameList, setGameList] = useState<IGameMetaType[]>([]);

  useEffect(() => {
    alardinApi.get('/assets').then(res => {
      const { asset, games } = res.data.data;
      setUserAsset({
        coin: asset.coin,
        isPremium: asset.is_premium,
        totalGames: games.length,
      });
    });
    alardinApi.get('/game').then(res => {
      const { data } = res.data;
      setGameList(data);
    });
  }, []);
  return (
    <>
      <Header isPremium={userAsset.isPremium} setVisible={setVisible} />
      <ScrollView>
        <UserList>
          <UserCoin coin={userAsset.coin} />
          <UserGame totalGames={userAsset.totalGames} />
        </UserList>
        <GameShopList data={gameList} />
      </ScrollView>
      <CenterScreen visible={visible} setVisible={setVisible}>
        <PremiumBuy />
      </CenterScreen>
    </>
  );
};

export default TShop;
