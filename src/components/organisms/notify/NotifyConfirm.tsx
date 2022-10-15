import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import bottomVisible from '../../../recoil/bottomVisible';
import bottomNotifyInfo from '../../../recoil/notify/bottomNotifyInfo';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';

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

const NotifyConfirm = () => {
  const setVisible = useSetRecoilState(bottomVisible);
  const { type, nickname, thumbnail_image_url } =
    useRecoilValue(bottomNotifyInfo);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setVisible(false);
  };

  return (
    <CustomBox height="100%">
      <ProfileIcon size={82} uri={thumbnail_image_url} />
      <TextBox>
        <Text options="semiBold">
          {type === 'alarm'
            ? `${nickname}님께서 알라미 메이트로 신청했습니다.`
            : `${nickname}님께서 OO 알람방에 초대했습니다.`}
        </Text>
        <Text options="semiBold">요청을 수락하시겠습니까?</Text>
      </TextBox>
      <Box row>
        <CustomButton
          width="45%"
          height="m"
          options="destructive"
          center
          onPress={handleCancel}>
          거절
        </CustomButton>
        <CustomButton
          width="45%"
          height="m"
          options="primary"
          center
          onPress={handleConfirm}>
          수락
        </CustomButton>
      </Box>
    </CustomBox>
  );
};

export default NotifyConfirm;
