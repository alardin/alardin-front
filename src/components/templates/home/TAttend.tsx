/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { myProfile } from '../../../recoil/authorization';
import bottomVisible from '../../../recoil/bottomVisible';
import { summaryData } from '../../../recoil/home/summary';
import BottomScreen from '../../../screen/BottomScreen';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AttendConfirm from '../../organisms/home/attend/AttendConfirm';
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

  const { id, is_repeated, is_private, Game, time, Members, name } =
    route.params;
  const setSummary = useSetRecoilState(summaryData);
  const profileData = useRecoilValue(myProfile);
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const checkMeAttendRoom = Members.filter(
    memeber => memeber.id === profileData.id,
  );

  useEffect(() => {
    setSummary(prevState => ({
      ...prevState,
      id,
      is_repeated,
      is_private,
      time,
      Game_id: Game.name,
      player: Members[0].nickname,
    }));
  }, [route]);

  return (
    <SafeAreaView>
      <Container>
        <TopBox>
          <Header title={name} id={id} />
          <Summary type="attend" />
          <MateInfo members={Members} />
        </TopBox>
        <BottomBox>
          <Button
            width="100%"
            height="48px"
            colorName="black"
            center
            onPress={() =>
              checkMeAttendRoom.length ? console.log('수정') : setVisible(true)
            }>
            {checkMeAttendRoom.length ? `알람 수정` : `알람 참가`}
          </Button>
        </BottomBox>
        <BottomScreen {...{ visible, setVisible }}>
          <AttendConfirm thumbnail_image_url={Members[0].thumbnail_image_url} />
        </BottomScreen>
      </Container>
    </SafeAreaView>
  );
};

export default TAttend;
