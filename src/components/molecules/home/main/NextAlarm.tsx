import React from 'react';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

export interface INextAlarmProps {
  date: string | undefined;
  time: string | undefined;
}

const CustomText = styled(Text)`
  padding: 4px 0px;
`;

const NextAlarm = ({ date, time }: INextAlarmProps) => {
  return (
    <Container options="zero">
      <CustomText size="xl" options="semiBold">
        {date ? date : `메이트와 함께`}
      </CustomText>
      <CustomText size="xl" options="semiBold">
        {time ? `${time}입니다` : `알람에 참여해요!`}
      </CustomText>
    </Container>
  );
};

export default NextAlarm;
