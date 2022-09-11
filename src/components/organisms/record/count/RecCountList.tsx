import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import RecCountItem from '../../../molecules/record/count/RecCountItem';
import RecCountTitle from '../../../molecules/record/count/RecCountTitle';

export interface IRecCountDataType {
  thumbnail_image_url: string;
  nickname: string;
  success_count: number;
  fail_count: number;
  created_at: string;
}

interface IRecCountListProps {
  data: IRecCountDataType[];
}

const TimeBox = styled(Box)`
  padding: 8px 12px;
  margin-bottom: 16px;
`;

const RecCountList = ({ data }: IRecCountListProps) => {
  const renderItem: ListRenderItem<IRecCountDataType> = ({ item }) => (
    <TimeBox colorName="white">
      <RecCountTitle />
      <RecCountItem {...item} />
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

export default RecCountList;
