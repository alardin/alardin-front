import { addFriendsAccess } from '@react-native-seoul/kakao-login';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { renewalTokenByAgreement } from '../../../recoil/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import theme from '../../../theme/theme';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Text from '../../atoms/text/Text';

const CustomBox = styled(Box)`
  justify-content: center;
  align-items: center;
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
`;

const InviteFriends = () => {
  const handlePress = () => {
    console.log('invite function');
  };
  return (
    <CustomBox width="100%" height="100%">
      <Text options="semiBold" colorName={theme.color.gray_500}>
        앗! 아직 등록된 메이트가 없어요.
      </Text>
      <Text size="s" colorName={theme.color.gray_500}>
        새로운 메이트를 만나러 가볼까요?
      </Text>
      <CustomButton
        width="160px"
        height="m"
        options="secondary"
        center
        onPress={handlePress}>
        메이트 초대하러 가기
      </CustomButton>
    </CustomBox>
  );
};

export default InviteFriends;
