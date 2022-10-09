import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import useShopData from '../../../hooks/useShopData';
import { IMyProfile } from '../../../recoil/authorization';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import CenterScreen from '../../../screen/CenterScreen';
import alardinApi from '../../../utils/alardinApi';
import UserCoin from '../../molecules/shop/user/UserCoin';
import GameShopList from '../../organisms/shop/GameShopList';
import CoinLoad from '../../organisms/shop/Loading/CoinLoad';
import GameListLoad from '../../organisms/shop/Loading/GameListLoad';
import UserLoad from '../../organisms/shop/Loading/UserLoad';
import PremiumBuy from '../../organisms/shop/PremiumBuy';
import ShopProfile from '../../organisms/shop/ShopProfile';

interface IUserAssetData {
  coin: number;
  isPremium: boolean;
  totalGames: number;
}

const TShop = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<IMyProfile>({} as IMyProfile);
  const [userAsset, setUserAsset] = useState<IUserAssetData>(
    {} as IUserAssetData,
  );
  const [gameList, setGameList] = useState<IGameMetaType[]>([]);

  // useEffect(() => {
  //   axios
  //     .all([
  //       alardinApi.get('/assets'),
  //       alardinApi.get('/game'),
  //       alardinApi.get('/users'),
  //     ])
  //     .then(
  //       axios.spread((res1, res2, res3) => {
  //         const { asset, games } = res1.data.data;
  //         const { data } = res2.data;
  //         const user = res3.data.data;
  //         setUserAsset({
  //           coin: asset.coin,
  //           isPremium: asset.is_premium,
  //           totalGames: games.length,
  //         });
  //         setGameList(data);
  //         setProfile(user);
  //       }),
  //     );
  //   return () => {
  //     setGameList([]);
  //     setProfile({} as IMyProfile);
  //     setUserAsset({} as IUserAssetData);
  //   };
  // }, []);

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <Suspense fallback={<UserLoad />}>
          <ShopProfile setVisible={setVisible} />
        </Suspense>
        <Suspense fallback={<CoinLoad />}>
          <UserCoin />
        </Suspense>
        <Suspense fallback={<GameListLoad />}>
          <GameShopList />
        </Suspense>
      </ScrollView>
      <CenterScreen visible={visible} setVisible={setVisible}>
        <PremiumBuy />
      </CenterScreen>
    </>
  );
};

export default TShop;
