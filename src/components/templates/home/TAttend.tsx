/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { IMyProfile } from '../../../recoil/authorization';
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
import EncryptedStorage from 'react-native-encrypted-storage';

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
    Host,
    Host_id,
    Members,
    name,
    max_member,
  } = route.params;
  const setSummary = useSetRecoilState(summaryData);
  const refreshData = useSetRecoilState(alarmListRefresh);
  const [visible, setVisible] = useRecoilState(bottomVisible);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({} as IMyProfile);
  const [checkMeAttend, setCheckMeAttend] = useState<number>(0);
  const isFull = Members.length === max_member;

  console.log(Host);

  const ProfileCallback = useCallback(async () => {
    const profileJson = await EncryptedStorage.getItem('myProfile');
    if (profileJson) {
      const convertProfile = JSON.parse(profileJson);
      setProfileData(convertProfile);
    }
  }, []);

  const navigateRetouch = () => {
    Host_id === profileData.id
      ? NetInfo.fetch().then(state =>
          state.isConnected
            ? navigation.navigate('AlarmRetouch', {
                ...route.params,
              })
            : toastEnable({
                text: '오프라인 모드에서는 사용하실 수 없는 기능입니다',
                duration: 'LONG',
              }),
        )
      : toastEnable({
          text: '해당 기능을 사용할 수 있는 권한이 없습니다',
          duration: 'LONG',
        });
  };

  const requestDelete = () => {
    console.log('alarmId');
    console.log(id);
    alardinApi
      .delete(`/alarm/${id}`)
      .then(async () => {
        refreshData(v => v + 1);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomNavigation' }],
        });
        // await alardinApi
        //   .post(`/alarm/message/host/${id}`, {
        //     title: `${time} 알람 삭제 발생`,
        //     body: `${Host.nickname}님께서 ${time} 알람방을 삭제했습니다.`,
        //     data: {
        //       type: 'ROOM_ALARM',
        //       message: JSON.stringify({
        //         type: 'room',
        //         content: `${Host.nickname}님께서 ${time} 알람방을 삭제했습니다.`,
        //         date: new Date(Date.now()).toISOString(),
        //       }),
        //     },
        //   })
      })
      .catch(err => {
        if (err.response.status === 403) {
          toastEnable({
            text: '해당 기능을 사용할 수 있는 권한이 없습니다',
            duration: 'LONG',
          });
        }
        console.log(err);
      });
  };

  useEffect(() => {
    ProfileCallback();
    console.log(id);
  }, []);

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
    setIsHost(Host_id === profileData.id);
    setCheckMeAttend(
      Members.filter(memeber => memeber.id === profileData.id).length,
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
            {Object.keys(profileData).length !== 0 && (
              <MateInfo members={Members} />
            )}
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
                        `최대 참가할 수 있는 인원이 ${max_member}명입니다`,
                      )
                    : setVisible(true)
                }>
                {isHost && checkMeAttend === 1 ? `알람 수정` : `알람 참가`}
              </Button>
              {isHost && (
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
              myName={profileData.nickname}
            />
          </CenterScreen>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default TAttend;
