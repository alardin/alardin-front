import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import NextAlarm, {
  INextAlarmProps,
} from '../../../molecules/home/main/NextAlarm';
import Box from '../../../atoms/box/Box';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import {
  convertDate,
  convertTime,
} from '../../../../utils/home/convertDateTime';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';

interface IHeaderProps {
  lastestAlarm: IAlarmInfoData;
}

type IMatesNavigation = StackNavigationProp<RootStackParamList, 'Mates'>;

const LeftContainer = styled(Container)`
  flex: 4;
`;

const RightContainer = styled(Container)`
  flex: 1;
  align-items: center;
`;

const Title = styled(Text)`
  padding-bottom: 8px;
`;

const Header = ({ lastestAlarm }: IHeaderProps) => {
  const navigation = useNavigation<IMatesNavigation>();
  const [nextData, setNextData] = useState<INextAlarmProps>({
    date: '',
    time: '',
  });

  const naivgateMates = () => {
    navigation.navigate('Mates');
  };

  useEffect(() => {
    setNextData({
      date: convertDate(lastestAlarm.created_at),
      time: convertTime(lastestAlarm.time),
    });
  }, [lastestAlarm]);

  return (
    <Box row>
      <LeftContainer>
        <Title options="semiBold">다음 알람</Title>
        <NextAlarm date={nextData.date} time={nextData.time} />
      </LeftContainer>
      <RightContainer>
        <TouchableOpacity onPress={naivgateMates}>
          <Icon name="user-plus" size={28} />
        </TouchableOpacity>
      </RightContainer>
    </Box>
  );
};

export default Header;
