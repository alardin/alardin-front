/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView } from 'react-native';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { alarmListRefresh } from '../../../recoil/home/alarmList';
import {
  gameMetaData,
  initialRecoilSetting,
  settingData,
  settingLabel,
} from '../../../recoil/home/alarmSettings';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import alardinApi from '../../../utils/alardinApi';
import { convertTime } from '../../../utils/home/convertDateTime';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import StatusScreen from '../../organisms/home/create/StatusScreen';

type IAlarmRetouchScreen = StackScreenProps<RootStackParamList, 'AlarmRetouch'>;

const ConfirmButton = styled(Button)`
  margin: 10px 0;
`;

const ButtonBox = styled(Box)`
  margin-bottom: 80px;
`;

const TRetouch = ({ route, navigation }: IAlarmRetouchScreen) => {
  const {
    id,
    time,
    is_repeated,
    is_private,
    music_name,
    music_volume,
    max_member,
    Host,
    Game,
    name,
  } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  const gameList = useRecoilValueLoadable(gameMetaData);

  const refreshData = useSetRecoilState(alarmListRefresh);

  const requestData = async () => {
    if (setting.name === '') {
      Alert.alert(
        '알람방 생성 실패',
        '알람방 제목명을 10자 이하로 작성해주세요.',
      );
      return;
    }
    console.log(setting);
    try {
      await alardinApi.put('/alarm', { ...setting });
      // await alardinApi.post(`/alarm/message/member/${id}`, {
      //   title: `${time} 알람 수정 발생`,
      //   body: `${Host.nickname}님께서 ${time} 알람방을 수정했습니다.`,
      //   data: {
      //     type: 'ROOM_ALARM',
      //     message: JSON.stringify({
      //       type: 'room',
      //       content: `${Host.nickname}님께서 ${time} 알람방을 수정했습니다.`,
      //       date: new Date(Date.now()).toISOString(),
      //     }),
      //   },
      // });
    } catch (err) {
      console.log('did not upload!');
    } finally {
      refreshData(v => v + 1);
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomNavigation' }],
      });
    }
  };

  useEffect(() => {
    if (gameList.state === 'hasValue') {
      setSetting({
        time,
        is_private,
        is_repeated,
        name,
        music_volume,
        max_member,
        music_name,
        Game_id: Game.id,
      });
      setInputLabel({
        time: convertTime(initialRecoilSetting.time),
        is_private,
        name,
        is_repeated: is_repeated,
        music_name,
        Game_id: Game.id,
      });
    }
  }, [gameList]);

  return (
    <SafeAreaView>
      {gameList.state === 'loading' ? (
        <StatusScreen type="loading" />
      ) : gameList.state === 'hasError' ? (
        <StatusScreen type="error" />
      ) : (
        <>
          <ScrollView>
            <Container>
              <AlarmSettings {...{ setVisible }} />
              <ButtonBox center>
                <ConfirmButton
                  width="100%"
                  height="xl"
                  options="primary"
                  center
                  onPress={requestData}>
                  알람 수정
                </ConfirmButton>
              </ButtonBox>
            </Container>
          </ScrollView>
          {Platform.OS === 'ios' ? (
            <BottomScreen {...{ visible, setVisible }}>
              <Pickers
                selectedValue={setting}
                setSelectedValue={setSetting}
                {...{ setVisible, inputLabel, setInputLabel }}
              />
            </BottomScreen>
          ) : (
            <Pickers
              selectedValue={setting}
              setSelectedValue={setSetting}
              {...{ setVisible, inputLabel, setInputLabel }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default TRetouch;
