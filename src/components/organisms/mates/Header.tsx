import React from 'react';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Container from '../../atoms/container/Container';
import { useNavigation } from '@react-navigation/native';
import Text from '../../atoms/text/Text';

const LeftContainer = styled(Container)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const RightContainer = styled(Container)`
  flex: 4;
  justify-content: center;
  align-items: flex-end;
`;

const Header = () => {
  const navigation = useNavigation();
  return (
    <Box row>
      <LeftContainer>
        <Button
          width="48px"
          height="48px"
          rounded
          center
          colorName="black"
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="white" size={32} />
        </Button>
      </LeftContainer>
      <RightContainer>
        <Text textType="title" options="bold">
          메이트 목록
        </Text>
      </RightContainer>
    </Box>
  );
};

export default Header;
