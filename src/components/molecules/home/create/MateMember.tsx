import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Button from '../../../atoms/button/Button';
import { IMembersDataType } from '../../../../recoil/home/members';

const CustomContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const CustomProfileIcon = styled(ProfileIcon)`
  margin-bottom: 14px;
`;

const StateCircle = styled(Box)`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.green};
`;

const StateBox = styled(Box)`
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const MateMember = ({
  id,
  nickname,
  thumbnail_image_url,
}: IMembersDataType) => {
  return (
    <Button width="140px" height="180px">
      <Box width="100%" height="100%" colorName="white" shadow center>
        <CustomContainer>
          <CustomProfileIcon size={50} uri={thumbnail_image_url} />
          <Text textType="comment" options="semiBold">
            {`#${id}`}
          </Text>
          <Text textType="subTitle" options="bold">
            {nickname}
          </Text>
          <StateBox row>
            <StateCircle />
            <Text textType="comment">참여중</Text>
          </StateBox>
        </CustomContainer>
      </Box>
    </Button>
  );
};

export default MateMember;