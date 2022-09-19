import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import RecCountItem from '../../../molecules/record/count/RecCountItem';
import RecCountTitle from '../../../molecules/record/count/RecCountTitle';
import { IRecCountItem } from '../../../templates/record/TRecordCount';

interface IRecCountListProps {
  data: IRecCountItem[];
  setData: React.Dispatch<React.SetStateAction<IRecCountItem[]>>;
}

const TimeBox = styled(Box)`
  padding: 8px 12px;
  margin-bottom: 16px;
`;

const RecCountList = ({ data, setData }: IRecCountListProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      alardinApi.get('/users/history-count').then(res => {
        setData(res.data.data);
      });
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem: ListRenderItem<IRecCountItem> = ({ item }) => (
    <TimeBox colorName="white">
      <RecCountTitle
        name={item.nickname}
        playCount={item.playCount}
        profileImage={item.thumbnail_image_url}
      />
      <RecCountItem {...item} />
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

export default RecCountList;
