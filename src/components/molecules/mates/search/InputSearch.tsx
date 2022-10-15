import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { IMembersDataType } from '../../../../recoil/home/members';
import alardinApi from '../../../../utils/alardinApi';
import InputText from '../../../atoms/input/InputText';

interface IInputSearchProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setSearchResult: React.Dispatch<React.SetStateAction<IMembersDataType[]>>;
  children?: JSX.Element;
}

const InputSearch = ({ text, setText, setSearchResult }: IInputSearchProps) => {
  const handleSearch = async (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = event.nativeEvent.text;
    setText(value);
    // const response = await alardinApi.get('/mate/search', { id })
    // setSearchResult(res.data.data);
    console.log(value);
  };
  return (
    <InputText
      width="100%"
      height="56px"
      value={text}
      onChange={handleSearch}
      placeholder="메이트의 소셜ID를 입력해주세요"
    />
  );
};

export default InputSearch;
