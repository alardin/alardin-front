/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../recoil/home/members';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import themeColor from '../../../theme/theme';

import KakaoIcon from '../../../assets/icons/ic-kakao.svg';
import Button from '../../atoms/button/Button';
import { useSetRecoilState } from 'recoil';
import { mateRefresh } from '../../../recoil/mates/mateRefresh';
import { Alert } from 'react-native';

interface IFriendInfoProps {
  mate: IMembersDataType;
  myId?: number;
}

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

const UnregisterUser = ({ mate }: IFriendInfoProps) => {
  const mateRefresher = useSetRecoilState(mateRefresh);
  const { id, kakao_id, thumbnail_image_url, nickname } = mate;

  const requestBody = id
    ? `?receiverId=${id}`
    : `/kakao?receiverKakaoId=${kakao_id}`;

  const handlePress = async () => {
    try {
      const result = await alardinApi.post(`/mate${requestBody}`);
      console.log(result);
      Alert.alert(
        '메이트 요청 성공',
        `${nickname}님한테 메이트를 요청하셨습니다.`,
      );
    } catch (err) {
      Alert.alert(
        '메이트 요청 실패',
        `${nickname}님한테 메이트를 요청을 실패하셨습니다.`,
      );
    }
    mateRefresher(v => v + 1);
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
          onPress={handlePress}>
          메이트 요청
        </Button>
        <DeleteButton
          width="88px"
          height="s"
          options="destructive"
          center
          disabled>
          목록내 삭제
        </DeleteButton>
      </RightBox>
    </InfoBox>
  );
};

export default UnregisterUser;
