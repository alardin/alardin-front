import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import NextAlarm from '../../../molecules/home/NextAlarm';
import Box from '../../../atoms/box/Box';
import { IAlarmInfoData } from '../../../molecules/home/AlarmInfo';
import {
  convertDate,
  convertTime,
} from '../../../../utils/home/convertDateTime';

interface IHeaderProps {
  lastestAlarm: IAlarmInfoData;
}

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
  // 가장 최신 데이터 1개를 가져온 상태에서 텍스트로 변환
  // date를 보고 내일, 내일 모레, 이번주 O요일, 다음주 O요일, O월 O일(O) 순으로 우선 표기
  // time를 보고 오전, 오후 구분 후에 00:00 타입으로 표기 -> common util로

  const [nextDate, setNextDate] = useState<string>('');
  const [nextTime, setNextTime] = useState<string>('');

  useEffect(() => {
    setNextDate(convertDate(lastestAlarm.date));
    setNextTime(convertTime(lastestAlarm.time));
  }, [lastestAlarm]);

  return (
    <Box row>
      <LeftContainer>
        <Title options="semiBold">다음 알람</Title>
        <NextAlarm nextDate={nextDate} nextTime={nextTime} />
      </LeftContainer>
      <RightContainer>
        <TouchableOpacity>
          <Icon name="user-plus" size={28} />
        </TouchableOpacity>
      </RightContainer>
    </Box>
  );
};

export default Header;
