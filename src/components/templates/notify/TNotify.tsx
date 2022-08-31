import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';
import useNotifyStorage from '../../../hooks/useNotifyStorage';
import bottomVisible from '../../../recoil/bottomVisible';
import { isNotify } from '../../../recoil/notify/notify';
import BottomScreen from '../../../screen/BottomScreen';
import Container from '../../atoms/container/Container';
import Header from '../../molecules/notify/Header';
import NotifyConfirm from '../../organisms/notify/NotifyConfirm';
import NotifyList from '../../organisms/notify/NotifyList';

const TNotify = () => {
  const notifyArr = useNotifyStorage();
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [checkNotify, setIsNotify] = useRecoilState(isNotify);

  useFocusEffect(() => {
    if (checkNotify) {
      setIsNotify(false);
    }
  });

  return (
    <Container>
      <Header />
      <NotifyList notifyData={notifyArr} />
      <BottomScreen {...{ visible, setVisible }}>
        <NotifyConfirm />
      </BottomScreen>
    </Container>
  );
};

export default TNotify;
