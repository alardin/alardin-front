import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';
import bottomVisible from '../../../recoil/bottomVisible';
import { isNotify } from '../../../recoil/notify/notify';
import BottomScreen from '../../../screen/BottomScreen';
import Container from '../../atoms/container/Container';
import NotifyConfirm from '../../organisms/notify/NotifyConfirm';
import NotifyList from '../../organisms/notify/NotifyList';

const TNotify = () => {
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [checkNotify, setIsNotify] = useRecoilState(isNotify);

  useFocusEffect(() => {
    if (checkNotify) {
      setIsNotify(false);
    }
  });

  return (
    <Container options="zero">
      <NotifyList type="default" />
      <BottomScreen {...{ visible, setVisible }}>
        <NotifyConfirm />
      </BottomScreen>
    </Container>
  );
};

export default TNotify;
