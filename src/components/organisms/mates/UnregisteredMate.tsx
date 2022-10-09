import React from 'react';
import { IMembersDataType } from '../../../recoil/home/members';
import Box from '../../atoms/box/Box';
import UnregisterUser from '../../molecules/mates/UnregisterUser';

interface IUnregisteredMateProps {
  matesList: IMembersDataType[];
}

const UnregisteredMate = ({ matesList }: IUnregisteredMateProps) => {
  return (
    <Box>
      {matesList?.map((mate, index) => (
        <UnregisterUser mate={mate} key={`friend_${index}`} />
      ))}
    </Box>
  );
};

export default UnregisteredMate;
