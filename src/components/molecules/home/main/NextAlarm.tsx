import React from 'react';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

export interface INextAlarmProps {
  date: string;
  time: string;
}

const NextAlarm = ({ date, time }: INextAlarmProps) => {
  return (
    <Container options="zero">
      <Text textType="title" options="bold">
        {date}
      </Text>
      <Text textType="title" options="bold">
        {`${time}입니다`}
      </Text>
    </Container>
  );
};

export default NextAlarm;
