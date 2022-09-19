import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import { IRecTimeItem } from '../../../templates/record/TRecordTime';

const ItemBox = styled(Box)`
  padding: 16px 0;
`;

const ProfileBox = styled(Box)`
  flex: 1.5;
`;

const TextBox = styled(Box)`
  flex: 4;
  justify-content: center;
`;

const GameBox = styled(Box)`
  flex: 1.5;
`;

const PaddingText = styled(Text)`
  padding: 4px 0;
`;

const RecTimeItem = ({ Alarm_result }: IRecTimeItem) => {
  const opponentName =
    Alarm_result.Alarm && Alarm_result.Alarm.Members[1].nickname;
  const opponentImage =
    Alarm_result.Alarm && Alarm_result.Alarm.Members[1].thumbnail_image_url;

  const gameIcon = Alarm_result.Game && Alarm_result.Game.thumbnail_url;
  return (
    <ItemBox row>
      <ProfileBox center>
        <ProfileIcon size={52} uri={opponentImage} />
      </ProfileBox>
      <TextBox>
        <PaddingText size="small" options="semiBold">
          {opponentName}
        </PaddingText>
        <Text
          size="xsmall"
          colorName="lightGray">{`시작 시간: ${Alarm_result.start_time}`}</Text>
        <Text
          size="xsmall"
          colorName="lightGray">{`종료 시간: ${Alarm_result.end_time}`}</Text>
      </TextBox>
      <GameBox center>
        <ProfileIcon size={36} uri={gameIcon} />
        <PaddingText size="xsmall" colorName="lightGray" options="semiBold">
          수정 필요
        </PaddingText>
      </GameBox>
    </ItemBox>
  );
};

export default RecTimeItem;
