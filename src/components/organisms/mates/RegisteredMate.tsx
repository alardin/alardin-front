import React, { useCallback, useEffect, useState } from 'react';
import { IMembersDataType } from '../../../recoil/home/members';
import Box from '../../atoms/box/Box';
import EncryptedStorage from 'react-native-encrypted-storage';
import RegisterUser from '../../molecules/mates/RegisterUser';
import NoItem from '../../molecules/other/NoItem';

interface IRegisteredMateProps {
  matesList: IMembersDataType[];
}

const RegisteredMate = ({ matesList }: IRegisteredMateProps) => {
  const [myId, setMyId] = useState<number>(0);
  const bringUserId = useCallback(async () => {
    const profileJson = await EncryptedStorage.getItem('myProfile');
    if (profileJson) {
      const { id } = JSON.parse(profileJson);
      setMyId(id);
    }
  }, []);

  useEffect(() => {
    bringUserId();
  }, []);

  return (
    <Box>
      {matesList.length === 0 ? (
        <NoItem title="등록된 메이트" />
      ) : (
        matesList?.map((mate, index) => (
          <RegisterUser mate={mate} myId={myId} key={`friend_${index}`} />
        ))
      )}
    </Box>
  );
};

export default RegisteredMate;
