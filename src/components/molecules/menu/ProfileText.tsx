import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';

export interface IProfileTextProps {
  grade: boolean;
  name: string;
  id: number;
  email: string;
}

const TextBox = styled(Box)`
  align-items: center;
`;

const SubText = styled(Text)`
  font-size: 13px;
`;

const ProfileText = ({ grade, name, id, email }: IProfileTextProps) => {
  return (
    <Box>
      <SubText>{grade ? '프리미엄 유저' : '일반 유저'}</SubText>
      <TextBox row>
        <Text textType="subTitle" options="semiBold">
          {name}
        </Text>
        <Text textType="subTitle" options="semiBold">{` #${id}`}</Text>
      </TextBox>
      <SubText>{email}</SubText>
    </Box>
  );
};

export default ProfileText;
