import { addFriendsAccess } from '@react-native-seoul/kakao-login';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import FriendInfo from '../../molecules/mates/FriendInfo';
import { IMateListDataType } from '../../templates/mates/TMates';

interface IUnregisteredMateProps {
  matesList: IMateListDataType[];
}

const CustomContainer = styled(Container)`
  margin: 24px 0;
`;

const Title = styled(Text)`
  padding-bottom: 12px;
`;

const MarginBox = styled(Box)`
  margin-bottom: 8px;
`;

const UnregisteredMate = ({ matesList }: IUnregisteredMateProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        등록된 메이트
      </Title>
      <Box>
        {matesList.map((mate, index) => (
          <MarginBox key={`friend_${index}`}>
            <FriendInfo {...mate} />
          </MarginBox>
        ))}
      </Box>
    </CustomContainer>
  );
};

export default UnregisteredMate;
