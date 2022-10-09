import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import EventNotifyItem from '../../molecules/notify/EventNotifyItem';
import MateNotifyItem from '../../molecules/notify/MateNotifyItem';

interface INotifyListProps {
  notifyData: INotifyDataType[];
}

export interface INotifyDataType {
  type: 'event' | 'mate' | 'announce' | 'local';
  content: string;
  date: string;
  senderId?: number;
  nickname?: string;
  thumbnail_image_url?: string;
}

const NotifyList = ({ notifyData }: INotifyListProps) => {
  const renderItem: ListRenderItem<INotifyDataType> = ({ item }) => {
    return (
      <>
        {item.type === 'mate' ? (
          <MateNotifyItem {...{ ...item }} />
        ) : (
          <EventNotifyItem {...{ ...item }} />
        )}
      </>
    );
  };
  return <FlatList data={notifyData} renderItem={renderItem} />;
};

export default NotifyList;
