/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import styled from 'styled-components/native';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import themeColor from '../../../theme/theme';

import KakaoIcon from '../../../assets/icons/ic-kakao.svg';
import { useSetRecoilState } from 'recoil';
import { mateRefresh } from '../../../recoil/mates/mateRefresh';
import { Alert } from 'react-native';

interface IMateNotifyItemProps extends IMateNotifyItemData {
  type: 'request' | 'response';
}

export interface IMateNotifyItemData {
  id: number;
  nickname: string;
  sended_at: string;
  thumbnail_image_url: string;
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
  width: 90%;
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

const RequestingText = styled(Text)`
  margin-right: 4px;
`;

const MateNotifyItem = ({
  id,
  nickname,
  thumbnail_image_url,
  type,
}: IMateNotifyItemProps) => {
  const mateRefresher = useSetRecoilState(mateRefresh);
  const handlePress = async (response: `ACCEPT` | `REJECT`) => {
    if (response === 'ACCEPT') {
      await alardinApi
        .post('/mate/response', {
          senderId: Number(id),
          response,
        })
        .then(() =>
          Alert.alert(
            '메이트 수락 성공',
            `${nickname}님과의 메이트를 수락하셨습니다.`,
          ),
        )
        .catch(() =>
          Alert.alert(
            '메이트 수락 실패',
            `${nickname}님과의 메이트 수락을 실패했습니다.`,
          ),
        );
    } else {
      if (type === 'request') {
        console.log('check1');
        await alardinApi
          .delete(`/mate/request?receiverId=${Number(id)}`)
          .then(() =>
            Alert.alert(
              '메이트 요청 취소',
              `${nickname}님과의 메이트 요청을 취소하셨습니다.`,
            ),
          )
          .catch(() =>
            Alert.alert(
              '메이트 요청 취소 실패',
              `${nickname}님과의 메이트 요청 취소에 실패했습니다.`,
            ),
          );
      } else {
        await alardinApi
          .post(`/mate/response`, {
            senderId: Number(id),
            response,
          })
          .then(() =>
            Alert.alert(
              '메이트 거부 성공',
              `${nickname}님과의 메이트를 거부하셨습니다.`,
            ),
          )
          .catch(() =>
            Alert.alert(
              '메이트 거부 실패',
              `${nickname}님과의 메이트 거부를 실패했습니다.`,
            ),
          );
      }
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
        {type === 'request' ? (
          <RequestingText size="xs" options="bold">
            메이트 요청중
          </RequestingText>
        ) : (
          <Button
            width="56px"
            height="s"
            options="primary"
            center
            onPress={() => handlePress('ACCEPT')}>
            수락
          </Button>
        )}
        <DeleteButton
          width={type === 'request' ? '75px' : '56px'}
          height="s"
          options="destructive"
          center
          onPress={() => handlePress('REJECT')}>
          {type === 'request' ? '요청 취소' : '거절'}
        </DeleteButton>
      </RightBox>
    </InfoBox>
  );
};

export default MateNotifyItem;
