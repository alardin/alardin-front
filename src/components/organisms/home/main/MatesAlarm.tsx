/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import AlarmInfo from '../../../molecules/home/main/AlarmInfo';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import { Loadable } from 'recoil';
import MoreIcon from '../../../../assets/icons/ic-more.svg';
import Box from '../../../atoms/box/Box';
import AlarmInvite from '../../../molecules/home/main/AlarmInvite';
import theme from '../../../../theme/theme';
import LoadingComponent from './LoadingComponent';

interface IMyAlarmProps {
  data: Loadable<IAlarmInfoData[]>;
}

const CustomContainer = styled(Container)`
  margin: 20px 0;
  min-height: 240px;
`;

const Title = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MatesAlarm = ({ data }: IMyAlarmProps) => {
  return (
    <CustomContainer>
      <Title>
        <Text options="semiBold">메이트 등록한 알람</Text>
        <MoreIcon width={24} height={24} fill={theme.color.gray_600} />
      </Title>
      {data.state === 'hasValue' ? (
        data.contents.length !== 0 ? (
          data.contents.map((props, index) => (
            <View key={`alarm_${index}`} style={{ marginBottom: 8 }}>
              <AlarmInfo {...props} />
            </View>
          ))
        ) : (
          <AlarmInvite />
        )
      ) : data.state === 'loading' ? (
        <>
          <LoadingComponent type="item" />
          <LoadingComponent type="item" />
        </>
      ) : (
        <AlarmInvite />
      )}
    </CustomContainer>
  );
};

export default MatesAlarm;
