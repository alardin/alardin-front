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

interface IAcceptFriendsProps {
  setIsKakaoAgree: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBox = styled(Box)`
  justify-content: center;
  align-items: center;
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
`;

const AcceptFriends = ({ setIsKakaoAgree }: IAcceptFriendsProps) => {
  const renewalToken = useSetRecoilState(renewalTokenByAgreement);
  const requestKakaoAgreement = () => {
    addFriendsAccess().then(async newToken => {
      console.log(newToken);
      if (typeof newToken !== 'string') {
        await EncryptedStorage.setItem(
          'scopes',
          JSON.stringify(newToken.scopes),
        );
        renewalToken(newToken);
        setIsKakaoAgree(newToken.scopes.includes('friends'));
      }
    });
  };

  return (
    <CustomBox width="100%" height="100%">
      <Text options="semiBold" colorName={theme.color.gray_500}>
        앗! 카카오 소셜 권한이 필요합니다.
      </Text>
      <Text size="s" colorName={theme.color.gray_500}>
        카카오톡 친구목록을 통해 쉽게 메이트를 찾아볼까요?
      </Text>
      <CustomButton
        width="160px"
        height="m"
        options="secondary"
        center
        onPress={requestKakaoAgreement}>
        카카오 친구목록 권한
      </CustomButton>
    </CustomBox>
  );
};

export default AcceptFriends;
