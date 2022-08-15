import React from 'react';
import styled from 'styled-components';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import { useNavigation } from '@react-navigation/native';

interface IHeaderProps {
  title: string;
  host: string;
}

const LeftContainer = styled(Container)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const RightContainer = styled(Container)`
  flex: 4;
  align-items: flex-end;
`;

const Header = ({ title, host }: IHeaderProps) => {
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
        <Text options="semiBold">{`방장인 ${host}`}</Text>
        <Text textType="title" options="bold">
          {title}
        </Text>
      </RightContainer>
    </Box>
  );
};

export default Header;
