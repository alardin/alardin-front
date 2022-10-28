import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import {
  settingData,
  settingLabel,
} from '../../../../recoil/home/alarmSettings';
import { pickerClicked, pickerMode } from '../../../../recoil/picker';
import {
  alarmItemtoDate,
  convertIsRepeat,
  dateToTimeString,
} from '../../../../utils/home/convertDateTime';
import {
  asPickerFormat,
  BUTTON_HEIGHT,
  VIEW_WIDTH,
} from '../../../../utils/timePickerUtils';
import Container from '../../../atoms/container/Container';
import SetItemBoolean from '../../../molecules/home/create/SetItemBoolean';
import SetItemDays from '../../../molecules/home/create/SetItemDays';
import SetItemDefault from '../../../molecules/home/create/SetItemDefault';
import SetItemInput from '../../../molecules/home/create/SetItemInput';
import TimePicker from './TimePicker';

interface IAlarmSettingsProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomContainer = styled(Container)`
  margin: 20px 0;
`;

const AlarmSettings = ({ setVisible }: IAlarmSettingsProps) => {
  const [androidPicker, setAndroidPicker] = useRecoilState(pickerClicked);
  const setPickerMode = useSetRecoilState(pickerMode);
  const [setting, setSetting] = useRecoilState(settingData);
  const inputLabel = useRecoilValue(settingLabel);

  const [time, setTime] = useState(asPickerFormat(new Date()));

  const metaData = [
    { name: '알람방 이름', keyValue: 'name', icon: 'happy-outline' },
    { name: '', keyValue: 'days', icon: '' },
    {
      name: '알람음',
      keyValue: 'music_name',
      icon: 'musical-notes-outline',
    },
    { name: '게임', keyValue: 'Game_id', icon: 'game-controller-outline' },
    { name: '', keyValue: 'is_private', icon: '' },
  ];

  const handlePicker = (mode: string) => {
    setPickerMode(mode);
    if (Platform.OS === 'ios') {
      setVisible(true);
    } else {
      setAndroidPicker(androidPicker + 1);
    }
  };

  useEffect(() => {
    setSetting(prevState => ({
      ...prevState,
      time: dateToTimeString(time),
      expired_at: alarmItemtoDate({
        is_repeated: setting.is_repeated,
        time: dateToTimeString(time),
      }),
    }));
  }, [time]);

  return (
    <CustomContainer>
      <TimePicker
        value={time}
        onChange={setTime}
        width={VIEW_WIDTH}
        buttonHeight={BUTTON_HEIGHT}
        visibleCount={3}
      />
      {metaData.map((item, index) =>
        index === 0 ? (
          <SetItemInput
            key={`item_${index}`}
            text={setting.name}
            onChangeText={setSetting}
            {...{ ...item }}
          />
        ) : index === 1 ? (
          <SetItemDays
            key={`item_${index}`}
            display={convertIsRepeat(inputLabel.is_repeated) as string}
            setSetting={setSetting}
          />
        ) : index === 4 ? (
          <SetItemBoolean
            key={`item_${index}`}
            isPrivate={setting.is_private}
            setSetting={setSetting}
            disabled
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
    </CustomContainer>
  );
};

export default AlarmSettings;
