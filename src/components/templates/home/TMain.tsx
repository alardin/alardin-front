import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import useNextAlarm from '../../../hooks/useNextAlarm';
import Container from '../../atoms/container/Container';
import {
  IAlarmInfoData,
  matesAttendAlarmList,
  myAttendAlarmList,
  nextAlarm,
} from '../../../recoil/home/alarmList';
import Header from '../../organisms/home/main/Header';
import MatesAlarm from '../../organisms/home/main/MatesAlarm';
import MyAlarm from '../../organisms/home/main/MyAlarm';
import { useRecoilValue } from 'recoil';

const exampleData: IAlarmInfoData[] = [
  {
    id: 1,
    time: '15:30',
    is_repeated: '123',
    is_private: false,
    music_volume: 70,
    max_members: 2,
    game: '숫자 맞추기',
    host_id: 1,
    date: new Date(),
    members: [
      {
        id: 1,
        email: 'hongdong@gmail.com',
        name: '홍길동',
        nickname: 'hongdong',
        bio: "Hello, I'm hongdong!",
        profile_image_url:
          'https://cdn.kakao.com/img/20190201_iahpdf_168108123.jpg',
        thumbnail_image_url:
          'https://cdn.kakao.com/img/20190201_iahpdf_168108123.jpg',
        age_range: '20-29',
        gender: 'male',
        enroll_date: '2022-07-24',
      },
    ],
  },
  {
    id: 2,
    time: '02:30',
    is_repeated: '0',
    is_private: false,
    music_volume: 70,
    max_members: 2,
    game: '그림 맞추기',
    host_id: 1,
    date: new Date(),
    members: [
      {
        id: 1,
        email: 'hongdong@gmail.com',
        name: '홍길동',
        nickname: 'hongdong',
        bio: "Hello, I'm hongdong!",
        profile_image_url:
          'https://cdn.kakao.com/img/20190201_iahpdf_168108123.jpg',
        thumbnail_image_url:
          'https://cdn.kakao.com/img/20190201_iahpdf_168108123.jpg',
        age_range: '20-29',
        gender: 'male',
        enroll_date: '2022-07-24',
      },
    ],
  },
];

const TMain = () => {
  // const lastestAlarm = useNextAlarm(exampleData);
  const lastestAlarm = useRecoilValue(nextAlarm);

  const myAttendAlarm = useRecoilValue(myAttendAlarmList);
  const matesAttendAlarm = useRecoilValue(matesAttendAlarmList);

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
