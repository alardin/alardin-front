/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import KakaoIcon from '../../../assets/icons/ic-kakao.svg';

export interface IProfileTextProps {
  grade: boolean;
  name: string;
  id: number;
  email: string;
}

const CustomBox = styled(Box)`
  padding-left: 4px;
`;

const TextBox = styled(Box)`
  margin-bottom: 8px;
`;

const EmailBox = styled(Box)`
  margin-top: 4px;
  align-items: center;
`;

const ProfileText = ({ grade, name, email }: IProfileTextProps) => {
  return (
    <CustomBox>
      <TextBox row>
        <Text options="semiBold">{name}</Text>
      </TextBox>
      <Text size="s">{grade ? '프리미엄 유저' : '일반 유저'}</Text>
      <EmailBox row>
        <KakaoIcon width={20} height={20} style={{ marginRight: 4 }} />
        <Text size="s">{email}</Text>
      </EmailBox>
    </CustomBox>
  );
};

export default ProfileText;
