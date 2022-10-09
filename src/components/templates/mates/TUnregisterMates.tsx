import React, { useCallback, useEffect, useState } from 'react';
import useMatesList from '../../../hooks/useMatesList';
import UnregisteredMate from '../../organisms/mates/UnregisteredMate';
import EncryptedStorage from 'react-native-encrypted-storage';
import AcceptFriends from '../../molecules/mates/AcceptFriends';
import InviteFriends from '../../molecules/mates/InviteFriends';

const TUnregisterMates = () => {
  const [isKakaoAgree, setIsKakaoAgree] = useState<boolean>(true);

  const bringStorageScopes = useCallback(async () => {
    const jsonScopes = await EncryptedStorage.getItem('scopes');
    if (jsonScopes) {
      const scopes = JSON.parse(jsonScopes);
      console.log(scopes);
      setIsKakaoAgree(scopes.includes('friends'));
    }
  }, []);

  const kakaoFriends = useMatesList('kakaoFriends');

  useEffect(() => {
    bringStorageScopes();
    return () => setIsKakaoAgree(true);
  }, []);

  console.log(kakaoFriends);

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
