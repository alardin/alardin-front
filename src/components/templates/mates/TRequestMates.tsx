import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import bottomVisible from '../../../recoil/bottomVisible';
import { mateNotifyList } from '../../../recoil/notify/notify';
import BottomScreen from '../../../screen/BottomScreen';
import MateNotifyItem, {
  IMateNotifyItemData,
} from '../../molecules/notify/MateNotifyItem';
import NoItem from '../../molecules/other/NoItem';
import NotifyConfirm from '../../organisms/notify/NotifyConfirm';

const TRequestMates = () => {
  const notifyArr = useRecoilValueLoadable(mateNotifyList);
  const [visible, setVisible] = useRecoilState(bottomVisible);

  return (
    <>
      {notifyArr.state === 'hasValue' ? (
        <>
          {notifyArr.contents.requestISent.map(
            (item: IMateNotifyItemData, index: number) => (
              <MateNotifyItem
                key={`request_${index}`}
                type="request"
                {...item}
              />
            ),
          )}
          {notifyArr.contents.responseIReceived.map(
            (item: IMateNotifyItemData, index: number) => (
              <MateNotifyItem
                key={`response_${index}`}
                type="response"
                {...item}
              />
            ),
          )}
        </>
      ) : (
        notifyArr.state === 'loading' && <NoItem title="요청" />
      )}
      <BottomScreen {...{ visible, setVisible }}>
        <NotifyConfirm />
      </BottomScreen>
    </>
  );
};

export default TRequestMates;
