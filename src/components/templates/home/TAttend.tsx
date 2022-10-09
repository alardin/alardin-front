/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { myProfile } from '../../../recoil/authorization';
import bottomVisible from '../../../recoil/bottomVisible';
import { alarmListRefresh } from '../../../recoil/home/alarmList';
import { summaryData } from '../../../recoil/home/summary';
import CenterScreen from '../../../screen/CenterScreen';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AttendConfirm from '../../organisms/home/attend/AttendConfirm';
import MateInfo from '../../organisms/home/create/MateInfo';
import Summary from '../../organisms/home/create/Summary';
import NetInfo from '@react-native-community/netinfo';
import { toastEnable } from '../../../utils/Toast';

type IAlarmAttendScreen = StackScreenProps<RootStackParamList, 'AlarmAttend'>;

const TopBox = styled(Box)`
  margin-top: 32px;
`;

const BottomBox = styled(Box)`
  justify-content: flex-end;
`;

const ConfirmButton = styled(Button)`
  margin: 10px 0;
`;

const TAttend = ({ route, navigation }: IAlarmAttendScreen) => {
  const {
    id,
    is_repeated,
    is_private,
    Game,
    time,
    Members,
    name,
    max_members,
  } = route.params;
  const setSummary = useSetRecoilState(summaryData);
  const refreshData = useSetRecoilState(alarmListRefresh);
  const profileData = useRecoilValueLoadable(myProfile);
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [checkMeAttend, setCheckMeAttend] = useState<number>(0);
  const isFull = Members.length === max_members;

  const navigateRetouch = () => {
    NetInfo.fetch().then(state =>
      state.isConnected
        ? Alert.alert(
            '미지원 기능',
            '해당 기능은 아직 미지원 상태입니다. 추후에 개선하겠습니다.',
          )
        : // ? navigation.navigate('AlarmRetouch', {
          //     ...route.params,
          //  ㅈ })
          toastEnable({
            text: '오프라인 모드에서는 사용하실 수 없는 기능입니다',
            duration: 'LONG',
          }),
    );
  };

  const requestDelete = () => {
    alardinApi
      .delete(`/alarm/${id}`)
      .then(async () => {
        await alardinApi.post(`/alarm/message/${id}`, {
          title: '알람방 삭제',
          body: `방장의 권한으로 ${time} 알람이 삭제되었습니다.`,
          data: {},
        });
        refreshData(v => v + 1);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomNavigation' }],
        });
      })
      .catch(err => {
        if (err.response.status === 403) {
          toastEnable({
            text: '해당 기능을 사용할 수 있는 권한이 없습니다',
            duration: 'LONG',
          });
        } else {
          toastEnable({
            text: '오프라인 모드에서는 사용하실 수 없는 기능입니다',
            duration: 'LONG',
          });
        }
      });
  };

  useEffect(() => {
    setSummary(prevState => ({
      ...prevState,
      id,
      is_repeated,
      is_private,
      time,
      Game_id: Game.name,
      player: Members.length > 0 ? Members[0].nickname : '',
      name,
    }));
  }, [route]);

  useEffect(() => {
    setCheckMeAttend(
      Members.filter(memeber => memeber.id === profileData.contents.id).length,
    );
  }, [profileData]);

  return (
    <SafeAreaView>
      <Container>
        <ScrollView>
          <TopBox>
            <Summary type="attend" />
          </TopBox>
          <BottomBox>
            {profileData.state === 'hasValue' && <MateInfo members={Members} />}
            <Box>
              <Button
                width="100%"
                height="xl"
                options="primary"
                center
                onPress={() =>
                  checkMeAttend
                    ? navigateRetouch()
                    : isFull
                    ? Alert.alert(
                        `최대 참가할 수 있는 인원이 ${max_members}명입니다`,
                      )
                    : setVisible(true)
                }>
                {checkMeAttend === 1 ? `알람 수정` : `알람 참가`}
              </Button>
              {Members[Members.length - 1].id === profileData.contents.id && (
                <ConfirmButton
                  width="100%"
                  height="xl"
                  options="destructive"
                  center
                  onPress={requestDelete}>
                  알람 삭제
                </ConfirmButton>
              )}
            </Box>
          </BottomBox>
          <CenterScreen {...{ visible, setVisible }}>
            <AttendConfirm
              mateNickname={Members[0].nickname}
              name={name}
              time={String(time)}
              isRepeated={is_repeated}
              gameName={Game.name}
              myName={profileData.contents.nickname}
            />
          </CenterScreen>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default TAttend;
