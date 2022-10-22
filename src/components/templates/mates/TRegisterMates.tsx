import React from 'react';
import useMatesList from '../../../hooks/useMatesList';
import NoItem from '../../molecules/other/NoItem';

import RegisteredMate from '../../organisms/mates/RegisteredMate';

const TRegisterMates = () => {
  const mates = useMatesList('mates');
  return mates ? (
    <RegisteredMate matesList={mates} />
  ) : (
    <NoItem title="등록된 메이트" />
  );
};

export default TRegisterMates;
