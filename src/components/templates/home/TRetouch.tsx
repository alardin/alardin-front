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
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import Summary from '../../organisms/home/create/Summary';

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
    max_members,
    Game,
    Members,
    name,
  } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const setSummary = useSetRecoilState(summaryData);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);
  const gameList = useRecoilValueLoadable(gameMetaData);

  const requestData = () => {
    alardinApi
      .put('/alarm', { ...setting })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomNavigation' }],
        });
      })
      .catch(err => console.log(err.response.code));
  };

  useEffect(() => {
    setSummary({
      id,
      is_repeated,
      time,
      is_private,
      player: Members[0].nickname,
      Game_id: Game.name,
    });
  }, [inputLabel]);

  useEffect(() => {
    if (gameList.state === 'hasValue') {
      console.log(Members);
      setSetting({
        time,
        is_private,
        is_repeated,
        name,
        music_volume,
        max_members,
        music_name,
        Game_id: Game.id,
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
      <Header title="알람방 수정" id={id} />
      <ScrollView>
        {gameList.state === 'loading' ? (
          <Text>Loading...</Text>
        ) : gameList.state === 'hasError' ? (
          <Text>Error...</Text>
        ) : (
          <Container>
            <Summary type="create" />
            <AlarmSettings {...{ setVisible }} />
            <ButtonBox center>
              <ConfirmButton
                width="100%"
                height="48px"
                colorName="black"
                center
                onPress={requestData}>
                알람 수정
              </ConfirmButton>
            </ButtonBox>
            <BottomScreen {...{ visible, setVisible }}>
              <Pickers
                selectedValue={setting}
                setSelectedValue={setSetting}
                {...{ setVisible, inputLabel, setInputLabel }}
              />
            </BottomScreen>
          </Container>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TRetouch;
