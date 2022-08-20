import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { settingData } from '../../../../recoil/home/alarmSettings';
import { summaryData } from '../../../../recoil/home/summary';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import SummaryText from '../../../molecules/home/create/SummaryText';

interface ISummaryProps {
  type: string;
}

const TitleBox = styled(Box)`
  margin-bottom: 12px;
  justify-content: space-between;
`;

const RoomMode = styled(Box)`
  width: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.skyBlue};
`;

const RoomModeButton = styled(Button)`
  width: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.skyBlue};
`;

const RoomModeText = styled(Text)`
  font-size: 15px;
  color: ${({ theme }) => theme.color.white};
`;

const Summary = ({ type }: ISummaryProps) => {
  const [summary, setSummary] = useRecoilState(summaryData);
  const setSetting = useSetRecoilState(settingData);

  const handlePress = () => {
    setSetting(prevState => ({
      ...prevState,
      is_private: !prevState.is_private,
    }));
    setSummary(prevState => ({
      ...prevState,
      is_private: !prevState.is_private,
    }));
    console.log('click!');
  };

  return (
    <Container>
      <TitleBox row>
        <Text textType="subTitle" options="bold">
          요약
        </Text>
        {type === 'create' ? (
          <RoomModeButton onPress={handlePress}>
            <RoomModeText options="semiBold">
              {summary.is_private ? '비공개' : '공개'}
            </RoomModeText>
          </RoomModeButton>
        ) : (
          <RoomMode shadow>
            <RoomModeText options="semiBold">
              {summary.is_private ? '비공개' : '공개'}
            </RoomModeText>
          </RoomMode>
        )}
      </TitleBox>
      <SummaryText {...{ ...summary, type }} />
    </Container>
  );
};

export default Summary;
