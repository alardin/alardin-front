import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  IKakaoMembersData,
  IMembersDataType,
} from '../../../recoil/home/members';
import alardinApi from '../../../utils/alardinApi';
import Container from '../../atoms/container/Container';
import Header from '../../organisms/mates/Header';
import RegisteredMate from '../../organisms/mates/RegisteredMate';
import UnregisteredMate from '../../organisms/mates/UnregisteredMate';
import kakaoApi from '../../../utils/kakaoApi';
import BottomScreen from '../../../screen/BottomScreen';
import MateConfirm from '../../organisms/mates/MateConfirm';
import { useRecoilState, useSetRecoilState } from 'recoil';
import bottomVisible from '../../../recoil/bottomVisible';
import checkScopes from '../../../recoil/checkScopes';
import Button from '../../atoms/button/Button';
import { addFriendsAccess } from '@react-native-seoul/kakao-login';
import { renewalTokenByAgreement } from '../../../recoil/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import MatesNavigation from '../../../navigation/top/MatesNavigation';
import styled from 'styled-components/native';

interface IMateListDataTyp {
  kakaoFriends: IMembersDataType[];
  mates: IMembersDataType[];
}

const CustomContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const TMates = () => {
  const [matesList, setMatesList] = useState<IMateListDataType>(
    {} as IMateListDataType,
  );
  const renewalToken = useSetRecoilState(renewalTokenByAgreement);
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [isKakaoAgree, setIsKakaoAgree] = useState<boolean>(true);

  const [, setRefreshData] = useState<boolean>(false);

  const requestKakaoAgreement = () => {
    addFriendsAccess().then(async newToken => {
      console.log(newToken);
      if (typeof newToken !== 'string') {
        await EncryptedStorage.setItem(
          'scopes',
          JSON.stringify(newToken.scopes),
        );
        renewalToken(newToken);
        setIsKakaoAgree(newToken.scopes.includes('friends'));
      }
    });
  };

  const bringStorageScopes = useCallback(async () => {
    const jsonScopes = await EncryptedStorage.getItem('scopes');
    if (jsonScopes) {
      const scopes = JSON.parse(jsonScopes);
      console.log(scopes);
      setIsKakaoAgree(scopes.includes('friends'));
    }
  }, []);

  // const requestKakaoFriends = () => {
  //   kakaoApi.get('/talk/friends').then(res => {
  //     const responseData = res.data.elements;
  //     console.log(responseData);
  //     const convertData = responseData.map((friend: any) => ({
  //       kakao_id: friend.id,
  //       thumbnail_image_url: friend.profile_thumbnail_image,
  //       nickname: friend.profile_nickname,
  //     }));
  //     setMatesList(prevState => ({ ...prevState }));
  //   });
  // };

  useEffect(() => {
    alardinApi.get('/mate').then(res => {
      const responseData = res.data.data;
      const matesThumbnails = responseData.mates.map(
        (friends: any) => friends.nickname,
      );
      const convertKakaoData = responseData.kakaoFriends.map((friend: any) => ({
        kakao_id: friend.id,
        thumbnail_image_url: friend.profile_thumbnail_image,
        nickname: friend.profile_nickname,
      }));
      const filteredKakao = convertKakaoData.filter(
        (friend: any) => !matesThumbnails.includes(friend.nickname),
      );
      setMatesList({
        kakaoFriends: filteredKakao,
        mates: responseData.mates,
      });
    });
  }, []);

  useEffect(() => {
    bringStorageScopes();
    return () => setIsKakaoAgree(true);
  }, []);

  return (
    <SafeAreaView>
      <CustomContainer>
        <Header />
        <MatesNavigation />
        <RegisteredMate matesList={matesList.mates} />
        {isKakaoAgree ? (
          <UnregisteredMate matesList={matesList.kakaoFriends} />
        ) : (
          <Button
            width="100%"
            height="l"
            center
            options="primary"
            onPress={requestKakaoAgreement}>
            친구 목록 추가 동의
          </Button>
        )}
        <BottomScreen {...{ visible, setVisible }}>
          <MateConfirm {...{ setRefreshData }} />
        </BottomScreen>
      </CustomContainer>
    </SafeAreaView>
  );
};

export default TMates;
