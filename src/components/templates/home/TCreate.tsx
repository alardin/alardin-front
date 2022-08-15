import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import { settingData, settingLabel } from '../../../recoil/home/alarmSettings';
import { summaryData } from '../../../recoil/home/summary';
import BottomScreen from '../../../screen/BottomScreen';
import Container from '../../atoms/container/Container';
import { IMateMemberData } from '../../molecules/home/create/MateMember';
import AlarmSettings from '../../organisms/home/create/AlarmSettings';
import Header from '../../organisms/home/create/Header';
import MateInfo from '../../organisms/home/create/MateInfo';
import Summary from '../../organisms/home/create/Summary';

const TCreate = ({ route }) => {
  // Summary State, Effect 생성
  // AlarmSettings에 대한 데이터 전달/처리 및 Event 확인
  const { type } = route.params;
  const [visible, setVisible] = useState<boolean>(false);
  const [summary, setSummary] = useRecoilState(summaryData);
  const [setting, setSetting] = useRecoilState(settingData);
  const [inputLabel, setInputLabel] = useRecoilState(settingLabel);

  const [members, setMembers] = useState<IMateMemberData[]>([]);

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
      <Header title="알람방 생성" host="홍길동" />
      <ScrollView>
        <Container>
          <Summary type="create" />
          <AlarmSettings {...{ setVisible }} />
          <MateInfo {...{ members, setMembers }} />
          <BottomScreen
            {...{ visible, setVisible, inputLabel, setInputLabel }}
            selectedValue={setting}
            setSelectedValue={setSetting}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TCreate;
