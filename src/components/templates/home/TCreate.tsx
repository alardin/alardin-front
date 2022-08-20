import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import { settingData, settingLabel } from '../../../recoil/home/alarmSettings';
import { IMembersDataType } from '../../../recoil/home/members';
import { summaryData } from '../../../recoil/home/summary';
import BottomScreen from '../../../screen/BottomScreen';
import Pickers from '../../../screen/Pickers';
import alardinApi from '../../../utils/alardinApi';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import MateInfo from '../../organisms/home/create/MateInfo';
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

  // const [members, setMembers] = useState<IMembersDataType[]>([]);

  const requestData = () => {
    // alardinApi
    //   .post('/alarm', { ...summary })
    //   .then(() => navigation.goBack())
    //   .catch(err => Alert.alert(`${err}`));
  };

  useEffect(() => {
    setSummary({
      host_id: 0,
      is_repeated: '0',
      time: inputLabel.time,
      game: inputLabel.game,
      is_private: false,
      player: '',
    });
  }, [inputLabel]);

  return (
    <SafeAreaView>
      <Header title="알람방 생성" id={1} />
      <ScrollView>
        <Container>
          <Summary type="create" />
          <AlarmSettings {...{ setVisible }} />
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
