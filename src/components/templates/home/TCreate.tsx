/* eslint-disable @typescript-eslint/naming-convention */

import { StackScreenProps } from '@react-navigation/stack';
import React, { Suspense, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { alarmListRefresh } from '../../../recoil/home/alarmList';
import {
  apiSettingState,
  initialSetting,
  initialSettingLabel,
  settingData,
  settingLabel,
} from '../../../recoil/home/alarmSettings';
import { summaryData } from '../../../recoil/home/summary';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import alardinApi from '../../../utils/alardinApi';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import Summary from '../../organisms/home/create/Summary';

type IAlarmCreateScreen = StackScreenProps<RootStackParamList, 'AlarmCreate'>;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 80px;
`;

const TCreate = ({ route, navigation }: IAlarmCreateScreen) => {
  // Summary State, Effect 생성
  // AlarmSettings에 대한 데이터 전달/처리 및 Event 확인
  const { type } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const [summary, setSummary] = useRecoilState(summaryData);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  // const apiState = useRecoilValueLoadable(apiSettingState);
  const refreshData = useSetRecoilState(alarmListRefresh);

  const requestData = () => {
    alardinApi
      .post('/alarm', { ...setting })
      .then(() => {
        refreshData(v => v + 1);
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   if (apiState.state === 'hasValue') {
  //     console.log('hasValue');
  //     setSetting({ ...apiState.contents.data });
  //     setInputLabel({ ...apiState.contents.label });
  //   }
  // }, []);

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
    return () => {
      setSetting({ ...initialSetting });
      setInputLabel({ ...initialSettingLabel });
    };
  }, []);

  return (
    <SafeAreaView>
      <Header title="알람방 생성" id={1} />
      <ScrollView>
        <Container>
          <Summary {...{ type }} />
          <AlarmSettings {...{ setVisible }} />
          {/* {apiState.state === 'hasValue' ? (
            <>
              <Summary {...{ type }} />
              <AlarmSettings {...{ setVisible }} />
            </>
          ) : apiState.state === 'loading' ? (
            <Text>Loading....</Text>
          ) : (
            <Text>Error</Text>
          )} */}
          <ConfirmButton
            width="100%"
            height="48px"
            colorName="black"
            center
            onPress={requestData}>
            알람 등록
          </ConfirmButton>
          <BottomScreen {...{ visible, setVisible }}>
            <Pickers
              selectedValue={setting}
              setSelectedValue={setSetting}
              {...{ setVisible, inputLabel, setInputLabel }}
            />
          </BottomScreen>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TCreate;
