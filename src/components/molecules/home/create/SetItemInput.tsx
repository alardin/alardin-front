import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components/native';
import { ISettingData } from '../../../../recoil/home/alarmSettings';
import Box from '../../../atoms/box/Box';
import InputText from '../../../atoms/input/InputText';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';

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

const ErrorText = styled(Text)`
  margin-top: 4px;
  margin-left: 8px;
`;

const SetItemInput = ({
  name,
  text,
  onChangeText,
}: IItemProps<SetterOrUpdater<ISettingData>>) => {
  const [errorComment, setErrorComment] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const handleChangeText = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = event.nativeEvent.text;
    if (value.length === 0) {
      setIsError(true);
      setErrorComment('알람방 이름이 공백입니다.');
    } else if (value.length > 10) {
      setIsError(true);
      onChangeText(prevState => ({ ...prevState, name: '' }));
      setErrorComment('최대 10자까지 가능 (※ 띄어쓰기 포함)');
    } else {
      setIsError(false);
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
        placeholder="최대 10자까지 가능 (※ 띄어쓰기 포함)"
        onChange={handleChangeText}
        error={isError}
      />
      {isError && (
        <ErrorText size="s" colorName={theme.color.function_error}>
          {errorComment}
        </ErrorText>
      )}
    </CustomBox>
  );
};

export default SetItemInput;
