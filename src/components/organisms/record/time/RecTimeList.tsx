import React, { useCallback, useState } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import RecTimeItem from '../../../molecules/record/time/RecTimeItem';
import RecTimeTitle from '../../../molecules/record/time/RecTimeTitle';
import { IRecTimeItem } from '../../../templates/record/TRecordTime';

interface IRecTimeListProps {
  data: IRecTimeItem[];
  setData: React.Dispatch<React.SetStateAction<IRecTimeItem[]>>;
}

const TimeBox = styled(Box)`
  padding: 8px 12px;
  margin-bottom: 16px;
`;

const RecTimeList = ({ data, setData }: IRecTimeListProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      alardinApi.get('/users/history').then(res => {
        setData(res.data.data);
      });
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem: ListRenderItem<IRecTimeItem> = ({ item }) => (
    <TimeBox colorName="white">
      <RecTimeTitle date={item.created_at} />
      <RecTimeItem {...item} />
    </TimeBox>
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
      />
    </Container>
  );
};

export default RecTimeList;
