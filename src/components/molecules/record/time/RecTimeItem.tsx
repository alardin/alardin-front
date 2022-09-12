import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import { IRecTimeDataType } from '../../../organisms/record/time/RecTimeList';

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

const RecTimeItem = ({
  thumbnail_image_url,
  start_time,
  end_time,
  nickname,
  game_image_url,
}: IRecTimeDataType) => {
  return (
    <ItemBox row>
      <ProfileBox center>
        <ProfileIcon size={52} />
      </ProfileBox>
      <TextBox>
        <PaddingText size="small" options="semiBold">
          {nickname}
        </PaddingText>
        <Text
          size="xsmall"
          colorName="lightGray">{`시작 시간: ${start_time}`}</Text>
        <Text
          size="xsmall"
          colorName="lightGray">{`종료 시간: ${end_time}`}</Text>
      </TextBox>
      <GameBox center>
        <ProfileIcon size={36} />
        <PaddingText size="xsmall" colorName="lightGray" options="semiBold">
          종료 시간
        </PaddingText>
      </GameBox>
    </ItemBox>
  );
};

export default RecTimeItem;
