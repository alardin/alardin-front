/* eslint-disable react-native/no-inline-styles */
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
  apiGameMetaData,
  initialRecoilSetting,
  pickerMetaData,
  settingData,
  settingLabel,
} from '../../../recoil/home/alarmSettings';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import alardinApi from '../../../utils/alardinApi';
import { convertIsRepeat } from '../../../utils/home/convertDateTime';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import StatusScreen from '../../organisms/home/create/StatusScreen';

type IAlarmRetouchScreen = StackScreenProps<RootStackParamList, 'AlarmRetouch'>;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const TRetouch = ({ route, navigation }: IAlarmRetouchScreen) => {
  const {
    id,
    time,
    is_repeated,
    is_private,
    music_name,
    max_member,
    Game,
    name,
  } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  const gameList = useRecoilValueLoadable(apiGameMetaData);

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
      await alardinApi.put(`/alarm/${id}`, { ...setting });
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
        name,
        max_member,
        music_name,
        is_repeated:
          is_repeated === '없음' ? '0' : convertIsRepeat(is_repeated),
        Game_id: Game.id,
        music_volume: 90,
      });
      setInputLabel({
        time: initialRecoilSetting.time,
        is_private,
        name,
        is_repeated,
        music_name: pickerMetaData[0].data.filter(
          item => item.value === music_name,
        )[0].label,
        Game_id: Game.name,
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
          <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
            <Container>
              <AlarmSettings {...{ setVisible }} />
              <ConfirmButton
                width="100%"
                height="xl"
                options="primary"
                center
                onPress={requestData}>
                알람 수정
              </ConfirmButton>
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
