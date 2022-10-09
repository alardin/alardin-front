import React from 'react';
import styled from 'styled-components/native';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';
import themeColor from '../../../theme/theme';

import KakaoIcon from '../../../assets/icons/ic-kakao.svg';

const InfoBox = styled(Box)`
  padding: 20px;
`;

const LeftBox = styled(Box)`
  flex: 3;
`;

const RightBox = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const TextBox = styled(Box)`
  padding-left: 16px;
  justify-content: center;
`;

const CurrentTextBox = styled(Box)`
  align-items: center;
`;

const NameText = styled(Text)`
  margin-bottom: 6px;
`;

const FriendTypeText = styled(Text)`
  margin-left: 4px;
`;

const DeleteButton = styled(Button)`
  margin-top: 8px;
`;

const CustomProfileIcon = styled(ProfileIcon)`
  align-self: center;
`;

const MateNotifyItem = ({
  content,
  date,
  senderId,
  thumbnail_image_url,
  nickname,
}: INotifyDataType) => {
  const handlePress = async (response: 'ACCEPT' | 'REJECT') => {
    const data = { senderId: Number(senderId), response };
    await alardinApi.post('/mate/response', data);
  };

  return (
    <InfoBox
      width="100%"
      height="120px"
      bgColor={themeColor.color.white}
      noRadius
      row>
      <LeftBox row>
        <CustomProfileIcon size={60} uri={thumbnail_image_url} />
        <TextBox>
          <NameText options="semiBold">{nickname}</NameText>
          <CurrentTextBox row>
            <KakaoIcon />
            <FriendTypeText size="s">카카오톡 친구</FriendTypeText>
          </CurrentTextBox>
        </TextBox>
      </LeftBox>
      <RightBox>
        <Button
          width="88px"
          height="s"
          options="primary"
          center
          onPress={() => handlePress('ACCEPT')}>
          메이트 요청중, 수락
        </Button>
        <DeleteButton
          width="88px"
          height="s"
          options="destructive"
          center
          onPress={() => handlePress('REJECT')}>
          요청 취소, 거절
        </DeleteButton>
      </RightBox>
    </InfoBox>
  );
};

export default MateNotifyItem;
