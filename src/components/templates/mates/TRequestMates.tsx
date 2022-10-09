import React from 'react';
import { useRecoilState } from 'recoil';
import useMateNotify from '../../../hooks/useMateNotify';
import bottomVisible from '../../../recoil/bottomVisible';
import BottomScreen from '../../../screen/BottomScreen';
import NoItem from '../../molecules/other/NoItem';
import NotifyConfirm from '../../organisms/notify/NotifyConfirm';
import NotifyList from '../../organisms/notify/NotifyList';

const TRequestMates = () => {
  const notifyArr = useMateNotify();
  const [visible, setVisible] = useRecoilState(bottomVisible);

  return (
    <>
      {notifyArr.length !== 0 ? (
        <NotifyList notifyData={notifyArr} />
      ) : (
        <NoItem title="요청" />
      )}
      <BottomScreen {...{ visible, setVisible }}>
        <NotifyConfirm />
      </BottomScreen>
    </>
  );
};

export default TRequestMates;
