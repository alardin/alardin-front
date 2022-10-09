/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView } from 'react-native';
import PushNotification from 'react-native-push-notification';
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
  pickerMetaData,
  settingData,
  settingLabel,
} from '../../../recoil/home/alarmSettings';
import { summaryData } from '../../../recoil/home/summary';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import theme from '../../../theme/theme';
import alardinApi from '../../../utils/alardinApi';
import { addAlarmScheduler } from '../../../utils/alarm/alarmScheduler';
import { addAlarmList, getAlarmList } from '../../../utils/alarm/alarmStorage';
import {
  alarmItemtoDate,
  convertTime,
} from '../../../utils/home/convertDateTime';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import SetItemDefault from '../../molecules/home/create/SetItemDefault';
import SetItemInput from '../../molecules/home/create/SetItemInput';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import StatusScreen from '../../organisms/home/create/StatusScreen';
import Summary from '../../organisms/home/create/Summary';

type IAlarmCreateScreen = StackScreenProps<RootStackParamList, 'AlarmCreate'>;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const TCreate = ({ navigation }: IAlarmCreateScreen) => {
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
    console.log(gameList.contents);
    if (gameList.state === 'hasValue') {
      setSetting({
        ...initialRecoilSetting,
        is_repeated: pickerMetaData[2].data[0].value,
        music_name: pickerMetaData[0].data[0].value,
        Game_id: gameList.contents[0].value,
      });
      setInputLabel({
        ...initialRecoilSetting,
        time: convertTime(initialRecoilSetting.time),
        is_repeated: pickerMetaData[2].data[0].label,
        music_name: pickerMetaData[0].data[0].label,
        Game_id: gameList.contents[0].label,
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
