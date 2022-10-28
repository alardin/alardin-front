/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import { useRecoilValue } from 'recoil';
import { loginPlatform } from '../../../recoil/authorization';

import KakaoIcon from '../../../assets/icons/ic-kakao.svg';
import AppleIcon from '../../../assets/icons/ic-apple.svg';
import GoogleIcon from '../../../assets/icons/ic-google.svg';

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
  const platform = useRecoilValue(loginPlatform);
  console.log(platform);
  return (
    <CustomBox>
      <TextBox row>
        <Text options="semiBold">{name}</Text>
      </TextBox>
      <Text size="s">{grade ? '프리미엄 유저' : '일반 유저'}</Text>
      <EmailBox row>
        {platform === 'apple' ? (
          <AppleIcon width={16} height={16} style={{ marginRight: 4 }} />
        ) : platform === 'google' ? (
          <GoogleIcon width={16} height={16} style={{ marginRight: 4 }} />
        ) : (
          platform === 'kakao' && (
            <KakaoIcon width={20} height={20} style={{ marginRight: 4 }} />
          )
        )}
        <Text size="s">{email}</Text>
      </EmailBox>
    </CustomBox>
  );
};

export default ProfileText;
