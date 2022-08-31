/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import AlarmInfo from '../../../molecules/home/main/AlarmInfo';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import { Loadable } from 'recoil';
import { Placeholder, Fade, PlaceholderLine } from 'rn-placeholder';

interface IMyAlarmProps {
  data: Loadable<IAlarmInfoData[]>;
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
      {data.state === 'hasValue' ? (
        data.contents.map((props, index) => (
          <View
            key={`alarm_${index}`}
            style={index !== data.contents.length - 1 && { marginBottom: 8 }}>
            <AlarmInfo {...props} />
          </View>
        ))
      ) : data.state === 'loading' ? (
        <Placeholder Animation={Fade}>
          <PlaceholderLine
            style={{
              width: '100%',
              height: 88,
              marginBottom: 4,
              borderRadius: 12,
            }}
          />
          <PlaceholderLine
            style={{ width: '100%', height: 88, borderRadius: 12 }}
          />
        </Placeholder>
      ) : (
        <Text>Error!</Text>
      )}
    </CustomContainer>
  );
};

export default MyAlarm;
