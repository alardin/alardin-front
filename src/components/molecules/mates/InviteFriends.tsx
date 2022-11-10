import React from 'react';
import { Dimensions } from 'react-native';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import centerVisible from '../../../recoil/mates/centerVisible';
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
  const windowHeight = Math.floor(Dimensions.get('screen').height * 0.7);
  const setMateVisible = useSetRecoilState(centerVisible);
  const handlePress = () => {
    setMateVisible(true);
  };
  return (
    <CustomBox width="100%" height={`${windowHeight}px`}>
      <Text options="semiBold" colorName={theme.color.gray_500}>
        앗! 아직 등록된 메이트가 없나요?
      </Text>
      <Text size="s" colorName={theme.color.gray_500}>
        새로운 메이트를 만나러 갑시다!
      </Text>
      <CustomButton
        width="160px"
        height="m"
        options="secondary"
        center
        onPress={handlePress}>
        메이트 찾기
      </CustomButton>
    </CustomBox>
  );
};

export default InviteFriends;
