import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../../theme/theme';
import {
  convertIsoStringTime,
  convertTotalGameTime,
} from '../../../../utils/home/convertDateTime';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import { IRecTimeItem } from '../../../templates/record/TRecordTime';

const ItemBox = styled(Box)`
  padding: 18px 4px 12px 4px;
  flex-direction: column;
`;

const ProfileBox = styled(Box)`
  flex: 1;
  justify-content: center;
`;

const TextBox = styled(Box)`
  flex: 3;
  padding-left: 12px;
  justify-content: center;
`;

const GameBox = styled(Box)`
  flex: 1;
  align-items: flex-end;
`;

const PaddingText = styled(Text)`
  padding-bottom: 12px;
  justify-content: center;
  align-self: center;
`;

const TopBox = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;

const BottomBox = styled(Box)`
  flex-direction: row;
`;

const CustomText = styled(Text)`
  padding: 2px 0;
`;

const RecTimeItem = ({ Alarm_result }: IRecTimeItem) => {
  const { Alarm, start_time, end_time, play_time, data } = Alarm_result;
  const opponentName = Alarm && Alarm.Members[0].nickname;
  const opponentImage = Alarm && Alarm.Members[0].thumbnail_image_url;

  const gameIcon = Alarm_result.Game && Alarm_result.Game.thumbnail_url;
  return (
    <ItemBox row>
      <TopBox>
        <PaddingText options="semiBold">{opponentName}</PaddingText>
        <PaddingText
          size="s"
          colorName={theme.color.primary_600}
          options="semiBold">
          {convertTotalGameTime(data.play_time)}
        </PaddingText>
      </TopBox>
      <BottomBox>
        <ProfileBox>
          <ProfileIcon size={56} uri={opponentImage} />
        </ProfileBox>
        <TextBox>
          <CustomText
            size="s"
            colorName={
              theme.color.gray_600
            }>{`시작 시간: ${convertIsoStringTime(start_time)}`}</CustomText>
          <CustomText
            size="s"
            colorName={
              theme.color.gray_600
            }>{`종료 시간: ${convertIsoStringTime(end_time)}`}</CustomText>
        </TextBox>
        <GameBox>
          <ProfileIcon size={56} uri={gameIcon} />
        </GameBox>
      </BottomBox>
    </ItemBox>
  );
};

export default RecTimeItem;
