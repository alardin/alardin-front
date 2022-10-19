import React from 'react';
import { IMembersDataType } from '../../../recoil/home/members';
import Box from '../../atoms/box/Box';
import InviteFriends from '../../molecules/mates/InviteFriends';
import UnregisterUser from '../../molecules/mates/UnregisterUser';

interface IUnregisteredMateProps {
  matesList: IMembersDataType[];
}

const UnregisteredMate = ({ matesList }: IUnregisteredMateProps) => {
  return (
    <Box>
      {matesList.length === 0 ? (
        <InviteFriends />
      ) : (
        matesList?.map((mate, index) => (
          <UnregisterUser mate={mate} key={`friend_${index}`} />
        ))
      )}
    </Box>
  );
};

export default UnregisteredMate;
