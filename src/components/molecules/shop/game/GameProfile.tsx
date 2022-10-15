import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';

interface IGameProfileProps {
  name: string;
  thumbnail_url: string;
  price: number;
}

const CustomBox = styled(Box)`
  align-items: center;
  padding: 20px 0;
`;

const LeftContainer = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  flex: 2;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 8px;
`;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const GameProfile = ({ name, thumbnail_url, price }: IGameProfileProps) => {
  return (
    <CustomBox row>
      <LeftContainer>
        <ProfileIcon size={80} uri={thumbnail_url} />
      </LeftContainer>
      <TextBox>
        <Text options="semiBold">{name}</Text>
        <Text size="s">{`알람코인 : ${price}`}</Text>
        <ConfirmButton width="80px" height="s" options="primary" center>
          게임 구매
        </ConfirmButton>
      </TextBox>
    </CustomBox>
  );
};

export default GameProfile;
