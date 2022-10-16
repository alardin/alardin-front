import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../../recoil/home/members';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import InputText from '../../../atoms/input/InputText';
import Text from '../../../atoms/text/Text';

interface IInputSearchProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setSearchResult: React.Dispatch<React.SetStateAction<IMembersDataType[]>>;
  children?: JSX.Element;
}

const CustomBox = styled(Box)`
  padding: 0 8px;
  padding-bottom: 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
`;

const CustomText = styled(Text)`
  padding-left: 10px;
  margin: 16px 0;
  align-self: flex-start;
`;

const InputSearch = ({ text, setText, setSearchResult }: IInputSearchProps) => {
  const handleSearch = async (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = event.nativeEvent.text;
    setText(value);
    if (value.length >= 2) {
      const response = await alardinApi.get('/mate/search', {
        params: { keyword: value },
      });
      setSearchResult(response.data.data);
      console.log(value);
    }
  };
  return (
    <CustomBox>
      <CustomText size="m" options="bold">
        메이트 검색
      </CustomText>
      <InputText
        width="95%"
        height="48px"
        value={text}
        autoFocus
        onChange={handleSearch}
        placeholder="메이트의 소셜ID를 입력해주세요"
      />
    </CustomBox>
  );
};

export default InputSearch;
