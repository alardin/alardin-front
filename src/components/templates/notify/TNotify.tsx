import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';
import { isNotify } from '../../../recoil/notify/notify';
import Container from '../../atoms/container/Container';
import NotifyList from '../../organisms/notify/NotifyList';

const TNotify = () => {
  const [checkNotify, setIsNotify] = useRecoilState(isNotify);

  useFocusEffect(() => {
    if (checkNotify) {
      setIsNotify(false);
    }
  });

  return (
    <Container options="zero">
      <NotifyList type="default" />
    </Container>
  );
};

export default TNotify;
