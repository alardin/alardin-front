import React, { useCallback, useState } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import NoItem from '../../../molecules/other/NoItem';
import RecTimeItem from '../../../molecules/record/time/RecTimeItem';
import RecTimeTitle from '../../../molecules/record/time/RecTimeTitle';
import { IRecTimeState } from '../../../templates/record/TRecordTime';
import themeColor from '../../../../theme/theme';

interface IRecTimeListProps {
  data: IRecTimeState[];
  setData: React.Dispatch<React.SetStateAction<IRecTimeState[]>>;
}

const TimeBox = styled(Box)`
  padding: 14px 16px;
  margin-bottom: 16px;
  border: ${({ theme }) => `1px solid ${theme.color.gray_200}`};
`;

const LineBox = styled(Box)``;

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

  const renderItem: ListRenderItem<IRecTimeState> = ({ item }) => (
    <TimeBox bgColor={themeColor.color.white}>
      <RecTimeTitle date={item.date} />
      <LineBox bgColor={themeColor.color.gray_300} width="100%" height="1px" />
      {item.records.map((record, index) => (
        <RecTimeItem key={`record_${index}`} {...record} />
      ))}
    </TimeBox>
  );

  return (
    <Container>
      {data.length === 0 ? (
        <NoItem title="알람 기록" />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 40 }}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `records_${index}`}
          refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
        />
      )}
    </Container>
  );
};

export default RecTimeList;
