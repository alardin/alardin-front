import React from 'react';
import styled from 'styled-components';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { alarmListRefresh } from '../../../../recoil/home/alarmList';

interface IHeaderProps {
  title: string;
  id: number;
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

const Header = ({ title, id }: IHeaderProps) => {
  const navigation = useNavigation();
  // const refresh = useSetRecoilState(alarmListRefresh);

  return (
    <Box row>
      <LeftContainer>
        <Button
          width="48px"
          height="48px"
          rounded
          center
          colorName="black"
          onPress={() => {
            // refresh(v => v + 1);
            navigation.goBack();
          }}>
          <Icon name="chevron-back-outline" color="white" size={32} />
        </Button>
      </LeftContainer>
      <RightContainer>
        <Text options="semiBold">{`방번호 #${id}`}</Text>
        <Text textType="title" options="bold">
          {title}
        </Text>
      </RightContainer>
    </Box>
  );
};

export default Header;
