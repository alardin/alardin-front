import React from 'react';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

export interface INextAlarmProps {
  date: string | undefined;
  time: string | undefined;
}

const NextAlarm = ({ date, time }: INextAlarmProps) => {
  console.log(date, time);
  return (
    <Container options="zero">
      <Text textType="title" options="bold">
        {date ? date : `지금 알람을`}
      </Text>
      <Text textType="title" options="bold">
        {time ? `${time}입니다` : `생성하세요`}
      </Text>
    </Container>
  );
};

export default NextAlarm;
