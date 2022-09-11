import React from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import RecTimeItem from '../../../molecules/record/time/RecTimeItem';
import RecTimeTitle from '../../../molecules/record/time/RecTimeTitle';

export interface IRecTimeDataType {
  thumbnail_image_url: string;
  start_time: string;
  end_time: string;
  nickname: string;
  game_image_url: string;
}

interface IRecTimeListProps {
  data: IRecTimeDataType[];
}

const TimeBox = styled(Box)`
  padding: 8px 12px;
  margin-bottom: 16px;
`;

const RecTimeList = ({ data }: IRecTimeListProps) => {
  const renderItem: ListRenderItem<IRecTimeDataType> = ({ item }) => (
    <TimeBox colorName="white">
      <RecTimeTitle />
      <RecTimeItem {...item} />
      <RecTimeItem {...item} />
    </TimeBox>
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default RecTimeList;
