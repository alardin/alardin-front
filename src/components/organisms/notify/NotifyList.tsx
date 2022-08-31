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
}

const CustomContianer = styled(Container)`
  margin: 24px 0;
  height: 95%;
`;

const ItemBox = styled(Box)`
  margin-bottom: 12px;
`;

const NotifyList = ({ notifyData }: INotifyListProps) => {
  const renderItem: ListRenderItem<INotifyDataType> = ({ item }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return (
      <ItemBox>
        {item.type === 'mate' ? (
          <MateNotifyItem {...{ ...item }} />
        ) : (
          <EventNotifyItem {...{ ...item }} />
        )}
      </ItemBox>
    );
  };
  return (
    <CustomContianer options="zero">
      <FlatList data={notifyData} renderItem={renderItem} />
    </CustomContianer>
  );
};

export default NotifyList;
