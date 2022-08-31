import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { IMembersDataType } from '../../../recoil/home/members';
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

export interface IMateListDataType extends IMembersDataType {
  kakao_id: string;
}

const TMates = () => {
  const [registeredMatesList, setRegisteredMatesList] = useState<
    IMateListDataType[]
  >([]);
  const [unregisteredMatesList, setUnregisteredMatesList] = useState<
    IMateListDataType[]
  >([]);
  const renewalToken = useSetRecoilState(renewalTokenByAgreement);
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [scopes, setScopes] = useRecoilState(checkScopes);
  const [isKakaoAgree, setIsKakaoAgree] = useState<boolean>(
    scopes.includes('friends'),
  );

  const [, setRefreshData] = useState<boolean>(false);

  const requestKakaoAgreement = async () => {
    addFriendsAccess().then(newToken => {
      console.log(newToken);
      if (typeof newToken !== 'string') {
        setScopes(newToken.scopes);
        renewalToken(newToken);
        setIsKakaoAgree(scopes.includes('friends'));
      }
    });
  };

  const requestKakaoFriends = () => {
    kakaoApi.get('/talk/friends').then(res => {
      const responseData = res.data.elements;
      console.log(responseData);
      const convertData = responseData.map((friend: any) => ({
        kakao_id: friend.id,
        thumbnail_image_url: friend.profile_thumbnail_image,
        nickname: friend.profile_nickname,
      }));
      setUnregisteredMatesList(convertData);
    });
  };

  useEffect(() => {
    alardinApi.get('/mate').then(res => {
      const responseData: IMateListDataType[] = res.data.data;
      setRegisteredMatesList(responseData);
    });
  }, []);

  useEffect(() => {
    if (isKakaoAgree) {
      requestKakaoFriends();
    }
  }, [isKakaoAgree]);

  return (
    <SafeAreaView>
      <Container>
        <Header />
        <RegisteredMate matesList={registeredMatesList} />
        {isKakaoAgree ? (
          <UnregisteredMate matesList={unregisteredMatesList} />
        ) : (
          <Button
            width="100%"
            height="48px"
            colorName="black"
            center
            onPress={requestKakaoAgreement}>
            친구 목록 추가 동의
          </Button>
        )}
        <BottomScreen {...{ visible, setVisible }}>
          <MateConfirm {...{ setRefreshData }} />
        </BottomScreen>
      </Container>
    </SafeAreaView>
  );
};

export default TMates;
