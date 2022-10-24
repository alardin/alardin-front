import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { IMembersDataType } from '../../../recoil/home/members';
import InviteFriends from '../../molecules/mates/InviteFriends';
import UnregisterUser from '../../molecules/mates/UnregisterUser';

interface IUnregisteredMateProps {
  matesList: IMembersDataType[];
}

const UnregisteredMate = ({ matesList }: IUnregisteredMateProps) => {
  return (
    <ScrollView>
      {matesList.length === 0 ? (
        <InviteFriends />
      ) : (
        matesList?.map((mate, index) => (
          <UnregisterUser mate={mate} key={`friend_${index}`} />
        ))
      )}
    </ScrollView>
  );
};

export default UnregisteredMate;
