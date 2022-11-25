import React from 'react';
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
  let inputTimer: any = null;

  const requestSearch = async (value: string) => {
    if (value.length >= 2) {
      const response = await alardinApi.get('/mate/search', {
        params: { keyword: value },
      });
      setSearchResult(response.data.data);
    } else {
      setSearchResult([]);
    }
  };

  const handleSearch = async (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    try {
      if (inputTimer) {
        clearTimeout(inputTimer);
      }
      const value = event.nativeEvent.text;
      setText(value);
      if (value) {
        inputTimer = setTimeout(async () => {
          await requestSearch(value);
        }, 500);
      }
    } catch (e) {
      console.log('error');
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
        placeholder="메이트의 이름을 입력해주세요"
      />
    </CustomBox>
  );
};

export default InputSearch;
