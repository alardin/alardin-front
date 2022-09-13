/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import MenuIcon from '../../molecules/menu/MenuIcon';

const FunctionContainer = styled(Container)`
  margin: 8px 0;
`;

const FunctionBox = styled(Box)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const FunctionList = () => {
  const exampleData = [
    {
      text: '문의하기',
      icon: 'https://cdn-icons-png.flaticon.com/512/1452/1452589.png',
    },
    {
      text: '소개 홈페이지',
      icon: 'https://cdn-icons-png.flaticon.com/512/1452/1452589.png',
    },
  ];

  return (
    <FunctionContainer>
      <FunctionBox width="100%">
        {exampleData.map((item, index) => (
          <View
            key={`icon_${index}`}
            style={{
              width: '25%',
              paddingHorizontal: 4,
              marginBottom: 24,
            }}>
            <MenuIcon {...item} />
          </View>
        ))}
      </FunctionBox>
    </FunctionContainer>
  );
};

export default FunctionList;
