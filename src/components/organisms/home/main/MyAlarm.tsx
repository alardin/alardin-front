import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import AlarmInfo, { IAlarmInfoData } from '../../../molecules/home/AlarmInfo';

interface IMyAlarmProps {
  data: IAlarmInfoData[];
}

const CustomContainer = styled(Container)`
  margin: 24px 0;
`;

const Title = styled(Text)`
  padding-bottom: 12px;
`;

const MyAlarm = ({ data }: IMyAlarmProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        참여하고 있는 알람
      </Title>
      {data.map((props, index) => (
        <View
          key={`alarm_${index}`}
          style={index !== data.length - 1 && { marginBottom: 8 }}>
          <AlarmInfo {...props} />
        </View>
      ))}
    </CustomContainer>
  );
};

export default MyAlarm;
