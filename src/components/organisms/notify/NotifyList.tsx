/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultNotify } from '../../../recoil/notify/notify';
import { isTrashMode } from '../../../recoil/notify/trashMode';
import EventNotifyItem from '../../molecules/notify/EventNotifyItem';
import NoItem from '../../molecules/other/NoItem';

export interface INotifyDataType {
  type: 'event' | 'mate' | 'announce' | 'local';
  content: string;
  date: string;
  senderId?: number;
  nickname?: string;
  thumbnail_image_url?: string;
  isHidden?: boolean;
}

const NotifyList = () => {
  const [notifyData, setNotifyData] = useRecoilState(defaultNotify);
  const [checkingArray, setCheckingArray] = useState<boolean[]>(
    Array(100).fill(false),
  );
  const trashMode = useRecoilValue(isTrashMode);

  console.log(notifyData);

  useEffect(() => {
    if (isTrashMode) {
      const filterTrashArr = notifyData.filter(
        (_, index) => !checkingArray[index],
      );
      setNotifyData([...filterTrashArr]);
    } else {
      setCheckingArray(Array(100).fill(false));
    }
  }, [trashMode]);

  const renderItem: ListRenderItem<INotifyDataType> = ({ item, index }) => {
    return (
      <EventNotifyItem
        keyNumber={index}
        value={checkingArray[index]}
        handler={setCheckingArray}
        isHidden={trashMode}
        {...{ ...item }}
      />
    );
  };
  return (
    <FlatList
      data={notifyData}
      renderItem={renderItem}
      ListEmptyComponent={() => <NoItem title="알림" />}
      contentContainerStyle={{ height: '100%' }}
    />
  );
};

export default NotifyList;
