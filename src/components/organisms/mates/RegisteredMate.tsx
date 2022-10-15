import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../recoil/home/members';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import EncryptedStorage from 'react-native-encrypted-storage';
import RegisterUser from '../../molecules/mates/RegisterUser';

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
      {matesList?.map((mate, index) => {
        return <RegisterUser mate={mate} myId={myId} key={`friend_${index}`} />;
      })}
    </Box>
  );
};

export default RegisteredMate;
