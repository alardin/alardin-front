import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import themeColor from '../../../../theme/theme';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import NoItem from '../../../molecules/other/NoItem';
import RecCountItem from '../../../molecules/record/count/RecCountItem';
import RecCountTitle from '../../../molecules/record/count/RecCountTitle';
import { IRecCountItem } from '../../../templates/record/TRecordCount';

interface IRecCountListProps {
  data: IRecCountItem[];
  setData: React.Dispatch<React.SetStateAction<IRecCountItem[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomContainer = styled(Container)`
  height: 100%;
`;

const CountBox = styled(Box)`
  padding: 10px;
  margin-bottom: 20px;
  border: ${({ theme }) => `1px solid ${theme.color.gray_200}`};
`;

const RecCountList = ({
  data,
  setData,
  loading,
  setLoading,
}: IRecCountListProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      alardinApi.get('/users/history-count').then(res => {
        setData(res.data.data);
      });
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem: ListRenderItem<IRecCountItem> = ({ item }) => (
    <CountBox bgColor={themeColor.color.white}>
      <RecCountTitle name={item.nickname} playCount={item.playCount} />
      <RecCountItem {...item} />
    </CountBox>
  );

  return (
    <CustomContainer>
      {data.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
        />
      ) : (
        <NoItem title="알람 기록" />
      )}
    </CustomContainer>
  );
};

export default RecCountList;
