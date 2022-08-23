import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Container from '../../atoms/container/Container';
import {
  matesAttendAlarmList,
  myAttendAlarmList,
  nextAlarm,
} from '../../../recoil/home/alarmList';
import Header from '../../organisms/home/main/Header';
import MatesAlarm from '../../organisms/home/main/MatesAlarm';
import MyAlarm from '../../organisms/home/main/MyAlarm';
import { useRecoilValueLoadable } from 'recoil';

const TMain = () => {
  const lastestAlarm = useRecoilValueLoadable(nextAlarm);

  const myAttendAlarm = useRecoilValueLoadable(myAttendAlarmList);
  const matesAttendAlarm = useRecoilValueLoadable(matesAttendAlarmList);

  return (
    <SafeAreaView>
      <ScrollView>
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
