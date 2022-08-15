import React from 'react';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';

interface INextAlarmProps {
  nextDate: string;
  nextTime: { amPm: string; time: string };
}

const NextAlarm = ({ nextDate, nextTime }: INextAlarmProps) => {
  return (
    <Container options="zero">
      <Text textType="title" options="bold">
        {nextDate}
      </Text>
      <Text textType="title" options="bold">
        {`${nextTime}입니다`}
      </Text>
    </Container>
  );
};

export default NextAlarm;
