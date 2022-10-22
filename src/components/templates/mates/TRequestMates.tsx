import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import bottomVisible from '../../../recoil/bottomVisible';
import { mateRefresh } from '../../../recoil/mates/mateRefresh';
import BottomScreen from '../../../screen/BottomScreen';
import alardinApi from '../../../utils/alardinApi';
import MateNotifyItem, {
  IMateNotifyItemData,
} from '../../molecules/notify/MateNotifyItem';
import NotifyConfirm from '../../organisms/notify/NotifyConfirm';

interface IRequestMatesData {
  requestISent: IMateNotifyItemData[];
  responseIReceived: IMateNotifyItemData[];
}

const TRequestMates = () => {
  // const notifyArr = useRecoilValueLoadable(mateNotifyList);
  const refresher = useRecoilValue(mateRefresh);
  const [notifyArr, setNotifyArr] = useState<IRequestMatesData>(
    {} as IRequestMatesData,
  );
  const [visible, setVisible] = useRecoilState(bottomVisible);

  useEffect(() => {
    alardinApi.get('/mate/requests').then(res => {
      setNotifyArr(res.data.data);
    });
  }, [refresher]);

  return (
    <>
      {notifyArr.requestISent &&
        notifyArr.requestISent.map(
          (item: IMateNotifyItemData, index: number) => (
            <MateNotifyItem key={`request_${index}`} type="request" {...item} />
          ),
        )}
      {notifyArr.responseIReceived &&
        notifyArr.responseIReceived.map(
          (item: IMateNotifyItemData, index: number) => (
            <MateNotifyItem
              key={`response_${index}`}
              type="response"
              {...item}
            />
          ),
        )}
      {/* notifyArr.state === 'loading' && <NoItem title="요청" /> */}
      <BottomScreen {...{ visible, setVisible }}>
        <NotifyConfirm />
      </BottomScreen>
    </>
  );
};

export default TRequestMates;
