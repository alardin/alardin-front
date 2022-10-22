/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView } from 'react-native';
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { alarmListRefresh } from '../../../recoil/home/alarmList';
import {
  apiGameMetaData,
  gameMetaData,
  initialRecoilSetting,
  pickerMetaData,
  settingData,
  settingLabel,
} from '../../../recoil/home/alarmSettings';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import alardinApi from '../../../utils/alardinApi';
import { convertTime } from '../../../utils/home/convertDateTime';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import StatusScreen from '../../organisms/home/create/StatusScreen';

type IAlarmCreateScreen = StackScreenProps<RootStackParamList, 'AlarmCreate'>;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const TCreate = ({ navigation }: IAlarmCreateScreen) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  const [gameList, setGameList] = useRecoilStateLoadable(gameMetaData);

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
      await alardinApi.post('/alarm', { ...setting });
    } catch (err) {
      console.log('did not upload!');
    } finally {
      refreshData(v => v + 1);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (gameList.state === 'hasValue') {
      console.log('hasValue');
      console.log(gameList.contents);
      setSetting({
        ...initialRecoilSetting,
        is_repeated: pickerMetaData[2].data[0].value,
        music_name: pickerMetaData[0].data[0].value,
        Game_id:
          gameList.contents.length === 0 ? 0 : gameList.contents[0].value,
      });
      setInputLabel({
        ...initialRecoilSetting,
        time: convertTime(initialRecoilSetting.time),
        is_repeated: pickerMetaData[2].data[0].label,
        music_name: pickerMetaData[0].data[0].label,
        Game_id:
          gameList.contents.length === 0
            ? '보유하신 게임이 없습니다'
            : gameList.contents[0].label,
        name: '',
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
                알람 등록
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

export default TCreate;
