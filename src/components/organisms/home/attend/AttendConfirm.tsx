import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import bottomVisible from '../../../../recoil/bottomVisible';
import { alarmListRefresh } from '../../../../recoil/home/alarmList';
import { summaryData } from '../../../../recoil/home/summary';
import alardinApi from '../../../../utils/alardinApi';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';

interface IAttendConfirmProps {
  gameName: string;
  isRepeated: string;
  time: string;
  mateNickname: string;
  name: string;
  myName: string;
}

const CustomBox = styled(Box)`
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
`;

const CustomButton = styled(Button)`
  margin: 0 4px;
`;

const TopBox = styled(Box)`
  width: 80%;
  align-items: center;
`;

const BottomBox = styled(Box)`
  width: 80%;
  padding: 20px 14px;
`;

const TextBox = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0;
`;

const RoomText = styled(Text)`
  margin-bottom: 8px;
`;

const AttendConfirm = ({
  isRepeated,
  name,
  mateNickname,
  time,
  gameName,
  myName,
}: IAttendConfirmProps) => {
  const navigation = useNavigation();
  const setVisible = useSetRecoilState(bottomVisible);
  const { id } = useRecoilValue(summaryData);
  const refreshAlarmList = useSetRecoilState(alarmListRefresh);

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirm = () => {
    alardinApi.post('/alarm/join', { alarmId: id }).then(async () => {
      setVisible(false);
      refreshAlarmList(v => v + 1);
      navigation.goBack();
      await alardinApi.post(`/alarm/message/${id}`, {
        title: '알람방 참가',
        body: `${myName}님께서 ${time} 알람에 참가하였습니다.`,
        data: {},
      });
    });
  };

  return (
    <CustomBox
      width="95%"
      height="400px"
      radius={12}
      bgColor={theme.color.white}>
      <TopBox>
        <Text options="semiBold">{`${mateNickname} 메이트와 함께`}</Text>
        <Text options="semiBold">알람방에 참가하시겠습니까?</Text>
      </TopBox>
      <BottomBox bgColor={theme.color.gray_100}>
        <RoomText options="semiBold">{name}</RoomText>
        <TextBox>
          <Text size="s" colorName={theme.color.gray_600}>
            시간
          </Text>
          <Text size="s">{time}</Text>
        </TextBox>
        <TextBox>
          <Text size="s" colorName={theme.color.gray_600}>
            반복
          </Text>
          <Text size="s">{isRepeated}</Text>
        </TextBox>
        <TextBox>
          <Text size="s" colorName={theme.color.gray_600}>
            게임
          </Text>
          <Text size="s">{gameName}</Text>
        </TextBox>
      </BottomBox>
      <Box row>
        <CustomButton
          width="140px"
          height="xl"
          options="destructive"
          center
          onPress={handleCancel}>
          거절
        </CustomButton>
        <CustomButton
          width="140px"
          height="xl"
          options="primary"
          center
          onPress={handleConfirm}>
          수락
        </CustomButton>
      </Box>
    </CustomBox>
  );
};

export default AttendConfirm;
