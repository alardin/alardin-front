import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { RootBottomParamList } from '../../../navigation/NavigationData';
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

type IShopNavigation = BottomTabScreenProps<RootBottomParamList, 'Shop'>;

const TShop = ({ navigation }: IShopNavigation) => {
  const apiPath = ['/assets', '/game', '/users'];
  const [visible, setVisible] = useState<boolean>(false);
  const [shopState, setShopState] = useState<IShopState>({
    gameList: [],
    profile: {} as IMyProfile,
    userAsset: {} as IUserAssetData,
  });

  const isFocus = useIsFocused();

  const isFocusing = useCallback(() => {
    console.log(`isFocused: ${isFocus}`);
    if (isFocus) {
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
              myGames: games,
            },
            gameList: gamelist,
            profile: user,
          });
        }),
      );
    }
    return () =>
      setShopState({
        gameList: [],
        profile: {} as IMyProfile,
        userAsset: {} as IUserAssetData,
      });
  }, []);

  useEffect(() => {
    isFocusing();
  }, [isFocusing]);

  return (
    <>
      <CustomScrollView nestedScrollEnabled={true}>
        <ShopProfile
          profile={shopState.profile}
          asset={shopState.userAsset}
          setVisible={setVisible}
        />
        <UserCoin asset={shopState.userAsset} />
        <GameShopList
          data={shopState.gameList}
          myGames={shopState.userAsset.myGames}
        />
      </CustomScrollView>
      <CenterScreen visible={visible} setVisible={setVisible}>
        <PremiumBuy />
      </CenterScreen>
    </>
  );
};

export default TShop;
