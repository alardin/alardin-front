import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { summaryData } from '../../../recoil/home/summary';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Header from '../../organisms/home/create/Header';
import MateInfo from '../../organisms/home/create/MateInfo';
import Summary from '../../organisms/home/create/Summary';

type IAlarmAttendScreen = StackScreenProps<RootStackParamList, 'AlarmAttend'>;

const TopBox = styled(Box)`
  height: 60%;
`;

const BottomBox = styled(Box)`
  height: 40%;
  justify-content: flex-end;
`;

const TAttend = ({ route }: IAlarmAttendScreen) => {
  // Summary State, Effect 생성
  // Navigation으로 전달받은 data 중 summary, mateinfo 데이터 처리

  const { id, is_repeated, is_private, Game, time, Members } = route.params;
  const setSummary = useSetRecoilState(summaryData);

  useEffect(() => {
    setSummary(prevState => ({
      ...prevState,
      id,
      is_repeated,
      is_private,
      time,
      game: Game.name,
      player: Members[0].nickname,
    }));
  }, [route]);

  return (
    <SafeAreaView>
      <Container>
        <TopBox>
          <Header title="테스트" id={id} />
          <Summary type="attend" />
          <MateInfo members={Members} />
        </TopBox>
        <BottomBox>
          <Button width="100%" height="48px" colorName="black" center>
            알람 수정
          </Button>
        </BottomBox>
      </Container>
    </SafeAreaView>
  );
};

export default TAttend;
