import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import { IMembersDataType } from '../../../../recoil/home/members';
import { TouchableOpacity } from 'react-native';
import themeColor from '../../../../theme/theme';

const CustomContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const CustomProfileIcon = styled(ProfileIcon)`
  margin-bottom: 14px;
`;

const CustomBox = styled(Box)`
  padding: 32px;
  border: ${({ theme }) => `2px solid ${theme.color.gray_200}`};
`;

const MateMember = ({ nickname, thumbnail_image_url }: IMembersDataType) => {
  return (
    <TouchableOpacity disabled>
      <CustomBox
        width="100%"
        height="160px"
        bgColor={themeColor.color.white}
        center>
        <CustomContainer>
          <CustomProfileIcon size={50} uri={thumbnail_image_url} />
          <Text options="semiBold">{nickname}</Text>
        </CustomContainer>
      </CustomBox>
    </TouchableOpacity>
  );
};

export default MateMember;
