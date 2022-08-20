import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { IMembersDataType } from '../../../recoil/home/members';
import alardinApi from '../../../utils/alardinApi';
import Container from '../../atoms/container/Container';
import Header from '../../organisms/mates/Header';
import RegisteredMate from '../../organisms/mates/RegisteredMate';
import UnregisteredMate from '../../organisms/mates/UnregisteredMate';
import { addFriendsAccess } from '@react-native-seoul/kakao-login';
import kakaoApi from '../../../utils/kakaoApi';
import BottomScreen from '../../../screen/BottomScreen';
import MateConfirm from '../../organisms/mates/MateConfirm';
import { useRecoilState } from 'recoil';
import bottomVisible from '../../../recoil/bottomVisible';

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
  const [visible, setVisible] = useRecoilState(bottomVisible);

  const kakaoFriends = useCallback(async () => {
    const response = await addFriendsAccess();
    console.log(response);
    return response;
  }, []);

  useEffect(() => {
    alardinApi.get('/mate').then(res => {
      const responseData: IMateListDataType[] = res.data.data;
      const convertData = responseData.map(mate => ({
        ...mate,
        thumbnail_image_url: `https://${
          mate.thumbnail_image_url.split('//')[1]
        }`,
      }));
      setRegisteredMatesList(convertData);
    });
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
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <Header />
        <RegisteredMate matesList={registeredMatesList} />
        <UnregisteredMate matesList={unregisteredMatesList} />
        <BottomScreen {...{ visible, setVisible }}>
          <MateConfirm />
        </BottomScreen>
      </Container>
    </SafeAreaView>
  );
};

export default TMates;
