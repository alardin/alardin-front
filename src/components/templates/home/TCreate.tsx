/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
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
import alardinApi from '../../../utils/alardinApi';
import { convertTime } from '../../../utils/home/convertDateTime';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import Summary from '../../organisms/home/create/Summary';

type IAlarmCreateScreen = StackScreenProps<RootStackParamList, 'AlarmCreate'>;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const TCreate = ({ route, navigation }: IAlarmCreateScreen) => {
  const { type } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const setSummary = useSetRecoilState(summaryData);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  const gameList = useRecoilValueLoadable(gameMetaData);

  const refreshData = useSetRecoilState(alarmListRefresh);

  const requestData = () => {
    console.log(setting);
    alardinApi
      .post('/alarm', { ...setting })
      .then(() => {
        refreshData(v => v + 1);
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setSummary({
      id: 0,
      is_repeated: '0',
      time: inputLabel.time,
      Game_id: inputLabel.Game_id,
      is_private: false,
      player: '',
    });
  }, [inputLabel]);

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
      });
    }
  }, [gameList]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header title="알람방 생성" id={1} />
          {gameList.state === 'loading' ? (
            <Text>Loading...</Text>
          ) : gameList.state === 'hasError' ? (
            <Text>Error...</Text>
          ) : (
            <>
              <Summary {...{ type }} />
              <AlarmSettings {...{ setVisible }} />
              <ConfirmButton
                width="100%"
                height="48px"
                colorName="black"
                center
                onPress={requestData}>
                알람 등록
              </ConfirmButton>
            </>
          )}
        </Container>
      </ScrollView>
      <BottomScreen {...{ visible, setVisible }}>
        <Pickers
          selectedValue={setting}
          setSelectedValue={setSetting}
          {...{ setVisible, inputLabel, setInputLabel }}
        />
      </BottomScreen>
    </SafeAreaView>
  );
};

export default TCreate;
