import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
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
import { Loadable } from 'recoil';
import theme from '../../../../theme/theme';
import LoadingComponent from './LoadingComponent';

interface IHeaderProps {
  lastestAlarm: Loadable<IAlarmInfoData>;
}

const LeftContainer = styled(Container)`
  flex: 4;
`;

const LabelBox = styled(Box)`
  border-radius: 32px;
  padding: 6px 10px;
  margin-bottom: 12px;
`;

const Header = ({ lastestAlarm }: IHeaderProps) => {
  const [nextData, setNextData] = useState<INextAlarmProps>({
    date: undefined,
    time: undefined,
  });

  useEffect(() => {
    setNextData({
      date: convertDate(
        lastestAlarm.state === 'hasValue'
          ? lastestAlarm.contents.created_at
          : '',
      ),
      time: convertTime(
        lastestAlarm.state === 'hasValue' ? lastestAlarm.contents.time : '',
      ),
    });
  }, [lastestAlarm]);

  return (
    <Box row>
      <LeftContainer>
        <LabelBox
          width="90px"
          height="32px"
          bgColor={theme.color.primary_50}
          center>
          <Text size="s" colorName={theme.color.primary_500} options="semiBold">
            다음 알람
          </Text>
        </LabelBox>
        {lastestAlarm.state === 'loading' ? (
          <LoadingComponent type="text" />
        ) : (
          <NextAlarm
            date={
              lastestAlarm.state === 'hasError'
                ? '정보를 불러오는데'
                : nextData.date
            }
            time={
              lastestAlarm.state === 'hasError'
                ? '문제가 생겼습니다'
                : nextData.time
            }
          />
        )}
      </LeftContainer>
    </Box>
  );
};

export default Header;
