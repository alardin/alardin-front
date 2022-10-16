import React, { useCallback, useEffect, useState } from 'react';
import useMatesList from '../../../hooks/useMatesList';
import UnregisteredMate from '../../organisms/mates/UnregisteredMate';
import EncryptedStorage from 'react-native-encrypted-storage';
import AcceptFriends from '../../molecules/mates/AcceptFriends';
import InviteFriends from '../../molecules/mates/InviteFriends';
import { useRecoilValue } from 'recoil';
import { loginPlatform } from '../../../recoil/authorization';

const TUnregisterMates = () => {
  const userPlatform = useRecoilValue(loginPlatform);
  const [isKakaoAgree, setIsKakaoAgree] = useState<boolean>(false);

  const kakaoFriends = useMatesList('kakaoFriends');

  useEffect(() => {
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
