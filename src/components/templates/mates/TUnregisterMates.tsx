import React, { useCallback, useEffect, useState } from 'react';
import useMatesList from '../../../hooks/useMatesList';
import UnregisteredMate from '../../organisms/mates/UnregisteredMate';
import EncryptedStorage from 'react-native-encrypted-storage';
import AcceptFriends from '../../molecules/mates/AcceptFriends';
import InviteFriends from '../../molecules/mates/InviteFriends';
import { useRecoilValue } from 'recoil';
import { loginPlatform } from '../../../recoil/authorization';
import alardinApi from '../../../utils/alardinApi';

const TUnregisterMates = () => {
  const userPlatform = useRecoilValue(loginPlatform);
  const [isKakaoAgree, setIsKakaoAgree] = useState<boolean>(false);
  const [kakaoFriends, setKakaoFriends] = useState<[]>([]);

  // const kakaoFriends = useMatesList('kakaoFriends');

  useEffect(() => {
    console.log(isKakaoAgree);
    console.log(userPlatform);
    if (userPlatform === 'kakao') {
      EncryptedStorage.getItem('scopes').then(jsonScopes => {
        if (jsonScopes) {
          const scopes = JSON.parse(jsonScopes);
          console.log(scopes);
          setIsKakaoAgree(scopes.includes('friends'));
        }
      });
    }
    return () => setIsKakaoAgree(false);
  }, []);

  useEffect(() => {
    if (isKakaoAgree) {
      alardinApi.get('/mate').then(res => {
        const responseData = res.data.data;
        const matesThumbnails = responseData.mates.map(
          (friends: any) => friends.nickname,
        );
        const convertKakaoData = responseData.kakaoFriends.map(
          (friend: any) => ({
            kakao_id: friend.id,
            thumbnail_image_url: friend.profile_thumbnail_image,
            nickname: friend.profile_nickname,
          }),
        );
        const filteredKakao = convertKakaoData.filter(
          (friend: any) => !matesThumbnails.includes(friend.nickname),
        );
        setKakaoFriends(filteredKakao);
      });
    }
  }, [isKakaoAgree]);

  return (
    <>
      {isKakaoAgree ? (
        kakaoFriends ? (
          <UnregisteredMate matesList={kakaoFriends} />
        ) : (
          <InviteFriends />
        )
      ) : (
        <AcceptFriends setIsKakaoAgree={setIsKakaoAgree} />
      )}
    </>
  );
};

export default TUnregisterMates;
