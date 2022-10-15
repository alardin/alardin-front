import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../../recoil/home/members';
import Button from '../../../atoms/button/Button';
import UnregisterUser from '../UnregisterUser';
import InputSearch from './InputSearch';

const CustomFlatList = styled.FlatList`
  min-height: 400px;
`;

const SearchList = () => {
  const [searchResult, setSearchResult] = useState<IMembersDataType[]>([]);
  const [text, setText] = useState<string>('');

  const renderItem: ListRenderItem<IMembersDataType> = ({ item }) => {
    return <UnregisterUser mate={item} />;
  };

  return (
    <>
      <InputSearch {...{ text, setText, setSearchResult }} />
      <CustomFlatList data={searchResult} renderItem={renderItem} />
      <Button width="100%" height="m" options="primary" center>
        닫기
      </Button>
    </>
  );
};

export default SearchList;
