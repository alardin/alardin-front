import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import useNextAlarm from '../../../hooks/useNextAlarm';
import {
  convertRepeatDay,
  convertTime,
} from '../../../utils/home/convertDateTime';
import Container from '../../atoms/container/Container';
import { IAlarmInfoData } from '../../molecules/home/AlarmInfo';
import Header from '../../organisms/home/main/Header';
import MatesAlarm from '../../organisms/home/main/MatesAlarm';
import MyAlarm from '../../organisms/home/main/MyAlarm';

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
  // MyAlarm 데이터 중 가장 빠른 날짜 보여주기 custom hook
  // AlarmInfo에 대한 데이터 리스트 처리(MyAlarm, MatesAlarm 둘 다)
  const [convertData, setConvertData] = useState<{
    user: IAlarmInfoData[];
    mates: IAlarmInfoData[];
  }>({ user: [...exampleData], mates: [...exampleData] });
  const lastestAlarm = useNextAlarm(exampleData);

  useEffect(() => {
    if (convertData.user.length !== 0) {
      const cUser = convertData.user.map(data => ({
        ...data,
        is_repeated: convertRepeatDay(data.is_repeated),
        time: convertTime(data.time),
      }));
      setConvertData(prevState => ({ ...prevState, user: [...cUser] }));
    }

    if (convertData.mates.length !== 0) {
      const cMates = convertData.mates.map(data => ({
        ...data,
        is_repeated: convertRepeatDay(data.is_repeated),
        time: convertTime(data.time),
      }));
      setConvertData(prevState => ({ ...prevState, mates: [...cMates] }));
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header lastestAlarm={lastestAlarm} />
          <MyAlarm data={convertData.user} />
          <MatesAlarm data={convertData.mates} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TMain;
