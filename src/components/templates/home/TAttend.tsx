import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { summaryData } from '../../../recoil/home/summary';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Header from '../../organisms/home/create/Header';
import MateInfo from '../../organisms/home/create/MateInfo';
import Summary from '../../organisms/home/create/Summary';

const TAttend = ({ route }) => {
  // Summary State, Effect 생성
  // Navigation으로 전달받은 data 중 summary, mateinfo 데이터 처리

  const { host_id, is_repeated, is_private, game, time, members } =
    route.params;
  const setSummary = useSetRecoilState(summaryData);

  useEffect(() => {
    setSummary(prevState => ({
      ...prevState,
      host_id,
      is_repeated,
      is_private,
      game,
      time,
      player: members[0].name,
    }));
  }, [route]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header title="테스트" host={host_id} />
          <Summary type="attend" />
          <MateInfo members={members} />
          <Button width="100%" height="48px" colorName="black" center>
            알람 등록
          </Button>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TAttend;
