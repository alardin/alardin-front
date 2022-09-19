import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import {
  settingData,
  settingLabel,
} from '../../../../recoil/home/alarmSettings';
import { pickerMode } from '../../../../recoil/picker';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import SetItemDays from '../../../molecules/home/create/SetItemDays';
import SetItemDefault from '../../../molecules/home/create/SetItemDefault';
import SetItemInput from '../../../molecules/home/create/SetItemInput';

interface IAlarmSettingsProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomContainer = styled(Container)`
  margin: 20px 0;
`;

const Title = styled(Text)`
  padding-bottom: 12px;
`;

const AlarmSettings = ({ setVisible }: IAlarmSettingsProps) => {
  const setPickerMode = useSetRecoilState(pickerMode);
  const [setting, setSetting] = useRecoilState(settingData);
  const inputLabel = useRecoilValue(settingLabel);

  const metaData = [
    { name: '시간', keyValue: 'time', icon: 'alarm-outline' },
    {
      name: '알람 소리',
      keyValue: 'music_name',
      icon: 'musical-notes-outline',
    },
    { name: '게임', keyValue: 'Game_id', icon: 'game-controller-outline' },
    { name: '반복', keyValue: 'is_repeated', icon: 'repeat-outline' },
    { name: '', keyValue: 'days', icon: '' },
    { name: '제목', keyValue: 'name', icon: 'happy-outline' },
  ];

  const handlePicker = (mode: string) => {
    setPickerMode(mode);
    setVisible(true);
  };

  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        알람 설정
      </Title>
      <Box colorName="white" isPadding>
        {metaData.map((item, index) =>
          index === 5 ? (
            <SetItemInput
              key={`item_${index}`}
              text={setting.name}
              onChangeText={setSetting}
              {...{ ...item }}
            />
          ) : index === 4 ? (
            <SetItemDays
              key={`item_${index}`}
              display={inputLabel.is_repeated as string}
              setSetting={setSetting}
            />
          ) : (
            <SetItemDefault
              key={`item_${index}`}
              onPress={() => handlePicker(item.keyValue)}
              inputLabel={inputLabel}
              {...{ ...item }}
            />
          ),
        )}
      </Box>
    </CustomContainer>
  );
};

export default AlarmSettings;
