import React from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components/native';
import { ISettingData } from '../../../../recoil/home/alarmSettings';
import Box from '../../../atoms/box/Box';
import InputText from '../../../atoms/input/InputText';
import Text from '../../../atoms/text/Text';

interface IItemProps<T> {
  name: string;
  text: string;
  icon: string;
  onChangeText: T;
}

const CustomBox = styled(Box)`
  height: 120px;
  justify-content: center;
`;

const Title = styled(Text)`
  margin: 12px 0;
`;

const SetItemInput = ({
  name,
  text,
  onChangeText,
}: IItemProps<SetterOrUpdater<ISettingData>>) => {
  const handleChangeText = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = event.nativeEvent.text;
    if (value.length > 10) {
      onChangeText(prevState => ({ ...prevState, name: '' }));
      Alert.alert('10글자 이하로 작성해주세요');
      return;
    }
    onChangeText(prevState => ({ ...prevState, name: value }));
  };
  return (
    <CustomBox>
      <Title>{name}</Title>
      <InputText
        width="100%"
        height="52px"
        value={text}
        onChange={handleChangeText}
      />
    </CustomBox>
  );
};

export default SetItemInput;
