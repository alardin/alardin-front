/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import AlarmInfo from '../../../molecules/home/main/AlarmInfo';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import AlarmPlus from '../../../molecules/home/main/AlarmPlus';

interface IMyAlarmProps {
  data: IAlarmInfoData[];
}

const CustomContainer = styled(Container)`
  margin: 20px 0;
`;

const Title = styled(Text)`
  padding-bottom: 12px;
`;

const MatesAlarm = ({ data }: IMyAlarmProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        메이트가 등록한 알람
      </Title>
      {data.map((props, index) => (
        <View key={`alarm_${index}`} style={{ marginBottom: 8 }}>
          <AlarmInfo {...props} />
        </View>
      ))}
      <AlarmPlus />
    </CustomContainer>
  );
};

export default MatesAlarm;
