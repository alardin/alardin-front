/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultNotify, mateNotifyList } from '../../../recoil/notify/notify';
import { isTrashMode } from '../../../recoil/notify/trashMode';
import EventNotifyItem from '../../molecules/notify/EventNotifyItem';
import MateNotifyItem from '../../molecules/notify/MateNotifyItem';

interface INotifyListProps {
  type: 'default' | 'mate';
}

export interface INotifyDataType {
  type: 'event' | 'mate' | 'announce' | 'local';
  content: string;
  date: string;
  senderId?: number;
  nickname?: string;
  thumbnail_image_url?: string;
  isHidden?: boolean;
}

const NotifyList = ({ type }: INotifyListProps) => {
  const [notifyData, setNotifyData] = useRecoilState(
    type === 'default' ? defaultNotify : mateNotifyList,
  );
  const [checkingArray, setCheckingArray] = useState<boolean[]>(
    Array(100).fill(false),
  );
  const trashMode = useRecoilValue(isTrashMode);

  useEffect(() => {
    if (isTrashMode && type === 'default') {
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
      <>
        {item.type === 'mate' ? (
          <MateNotifyItem {...{ ...item }} />
        ) : (
          <EventNotifyItem
            keyNumber={index}
            value={checkingArray[index]}
            handler={setCheckingArray}
            isHidden={trashMode}
            {...{ ...item }}
          />
        )}
      </>
    );
  };
  return (
    <FlatList
      data={notifyData}
      renderItem={renderItem}
      contentContainerStyle={{ height: '100%' }}
    />
  );
};

export default NotifyList;
