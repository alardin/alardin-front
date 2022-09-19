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
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';

interface IAttendConfirmProps {
  thumbnail_image_url: string;
}

const CustomBox = styled(Box)`
  justify-content: space-evenly;
  align-items: center;
`;

const CustomButton = styled(Button)`
  margin: 0 4px;
`;

const TextBox = styled(Box)`
  align-items: center;
`;

const AttendConfirm = ({ thumbnail_image_url }: IAttendConfirmProps) => {
  const navigation = useNavigation();
  const setVisible = useSetRecoilState(bottomVisible);
  const { id, player } = useRecoilValue(summaryData);
  const refreshAlarmList = useSetRecoilState(alarmListRefresh);

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    alardinApi.post('/alarm/join', { alarmId: id }).then(() => {
      setVisible(false);
      refreshAlarmList(v => v + 1);
      navigation.goBack();
    });
  };

  return (
    <CustomBox height="100%">
      <ProfileIcon size={82} uri={thumbnail_image_url} />
      <TextBox>
        <Text textType="subTitle" options="semiBold">
          {`방장인 ${player} 메이트의`}
        </Text>
        <Text textType="subTitle" options="semiBold">
          알람방에 참가하시겠습니까?
        </Text>
      </TextBox>
      <Box row>
        <CustomButton
          width="45%"
          height="46px"
          colorName="red"
          center
          onPress={handleCancel}>
          거절
        </CustomButton>
        <CustomButton
          width="45%"
          height="46px"
          colorName="green"
          center
          onPress={handleConfirm}>
          수락
        </CustomButton>
      </Box>
    </CustomBox>
  );
};

export default AttendConfirm;
