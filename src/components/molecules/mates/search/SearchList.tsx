import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../../recoil/home/members';
import centerVisible from '../../../../recoil/mates/centerVisible';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import UnregisterUser from '../UnregisterUser';
import InputSearch from './InputSearch';

const CustomFlatList = styled.FlatList`
  min-height: 280px;
`;

const CustomBox = styled(Box)`
  background-color: ${({ theme }) => theme.color.gray_200};
`;

const CustomButton = styled(Button)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const SearchList = () => {
  const setVisible = useSetRecoilState(centerVisible);
  const [searchResult, setSearchResult] = useState<IMembersDataType[]>([]);
  const [text, setText] = useState<string>('');

  const renderItem: ListRenderItem<IMembersDataType> = ({ item }) => {
    return <UnregisterUser mate={item} />;
  };

  return (
    <CustomBox>
      <InputSearch {...{ text, setText, setSearchResult }} />
      <CustomFlatList data={searchResult} renderItem={renderItem} />
      <CustomButton
        width="100%"
        height="xl"
        options="primary"
        center
        onPress={() => setVisible(false)}>
        닫기
      </CustomButton>
    </CustomBox>
  );
};

export default SearchList;
