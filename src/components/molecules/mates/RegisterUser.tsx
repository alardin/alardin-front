/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../recoil/home/members';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import themeColor from '../../../theme/theme';
import { Alert, TouchableOpacity } from 'react-native';

import MoreIcon from '../../../assets/icons/ic-more.svg';
import OptionIcon from '../../../assets/icons/ic-option.svg';
import DeleteButton from '../other/DeleteButton';
import { mateRefresh } from '../../../recoil/mates/mateRefresh';
import { useSetRecoilState } from 'recoil';

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
  margin-top: 12px;
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

const CustomProfileIcon = styled(ProfileIcon)`
  align-self: center;
`;

const RegisterUser = ({ mate, myId }: IFriendInfoProps) => {
  const mateRefresher = useSetRecoilState(mateRefresh);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { id, thumbnail_image_url, nickname } = mate;

  const handleOpenButton = () => {
    setOpenDelete(true);
    setTimeout(() => {
      setOpenDelete(false);
    }, 5000);
  };

  const handlePress = async () => {
    try {
      await alardinApi.delete('/mate', { data: { id: myId, mateId: id } });
      Alert.alert(
        '메이트 삭제 성공',
        `${nickname}님을 사용자의 메이트 목록에서 삭제하였습니다.`,
      );
    } catch (err) {
      Alert.alert(
        '메이트 삭제 실패',
        `${nickname}님을 사용자의 메이트 목록에서 삭제를 실패하였습니다.`,
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
            <Text size="s">같이 참여 중인 알람 </Text>
            <Text
              size="s"
              options="semiBold"
              colorName={themeColor.color.primary_600}>
              N
            </Text>
            <MoreIcon
              width={16}
              height={16}
              fill={themeColor.color.primary_600}
            />
          </CurrentTextBox>
        </TextBox>
      </LeftBox>
      <RightBox>
        {openDelete ? (
          <DeleteButton handlePress={handlePress} />
        ) : (
          <TouchableOpacity onPress={handleOpenButton}>
            <OptionIcon
              width={28}
              height={28}
              fill={themeColor.color.gray_900}
            />
          </TouchableOpacity>
        )}
      </RightBox>
    </InfoBox>
  );
};

export default RegisterUser;
