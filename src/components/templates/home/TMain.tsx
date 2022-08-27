import React, { useCallback, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import Container from '../../atoms/container/Container';
import {
  alarmListRefresh,
  matesAttendAlarmList,
  myAttendAlarmList,
  nextAlarm,
} from '../../../recoil/home/alarmList';
import Header from '../../organisms/home/main/Header';
import MatesAlarm from '../../organisms/home/main/MatesAlarm';
import MyAlarm from '../../organisms/home/main/MyAlarm';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

const TMain = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const lastestAlarm = useRecoilValueLoadable(nextAlarm);
  const myAttendAlarm = useRecoilValueLoadable(myAttendAlarmList);
  const matesAttendAlarm = useRecoilValueLoadable(matesAttendAlarmList);
  const refreshData = useSetRecoilState(alarmListRefresh);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshData(v => v + 1);
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}>
        <Container>
          <Header lastestAlarm={lastestAlarm} />
          <MyAlarm data={myAttendAlarm} />
          <MatesAlarm data={matesAttendAlarm} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TMain;
