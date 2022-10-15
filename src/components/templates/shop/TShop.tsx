import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { IMyProfile } from '../../../recoil/authorization';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import CenterScreen from '../../../screen/CenterScreen';
import alardinApi from '../../../utils/alardinApi';
import UserCoin from '../../molecules/shop/user/UserCoin';
import GameShopList from '../../organisms/shop/GameShopList';
import PremiumBuy from '../../organisms/shop/PremiumBuy';
import ShopProfile, { IUserAssetData } from '../../organisms/shop/ShopProfile';

interface IShopState {
  gameList: IGameMetaType[];
  userAsset: IUserAssetData;
  profile: IMyProfile;
}

const CustomScrollView = styled.ScrollView`
  padding: 8px;
  height: 100%;
`;

const TShop = () => {
  const apiPath = ['/assets', '/game', '/users'];
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [shopState, setShopState] = useState<IShopState>({
    gameList: [],
    profile: {} as IMyProfile,
    userAsset: {} as IUserAssetData,
  });

  useEffect(() => {
    axios.all(apiPath.map(path => alardinApi.get(path))).then(
      axios.spread((res1, res2, res3) => {
        const { asset, games } = res1.data.data;
        const gamelist = res2.data.data;
        const user = res3.data.data;
        setShopState({
          userAsset: {
            coin: asset.coin,
            isPremium: asset.is_premium,
            totalGames: games.length,
          },
          gameList: gamelist,
          profile: user,
        });
      }),
    );
    return () =>
      setShopState({
        gameList: [],
        profile: {} as IMyProfile,
        userAsset: {} as IUserAssetData,
      });
  }, []);

  return (
    <>
      <CustomScrollView nestedScrollEnabled={true}>
        <ShopProfile
          profile={shopState.profile}
          asset={shopState.userAsset}
          setVisible={setVisible}
        />
        <UserCoin asset={shopState.userAsset} />
        <GameShopList data={shopState.gameList} />
      </CustomScrollView>
      <CenterScreen visible={visible} setVisible={setVisible}>
        <PremiumBuy />
      </CenterScreen>
    </>
  );
};

export default TShop;
