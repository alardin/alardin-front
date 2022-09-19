import React from 'react';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../recoil/home/members';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import FriendInfo from '../../molecules/mates/FriendInfo';

interface IRegisteredMateProps {
  matesList: IMembersDataType[];
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

const RegisteredMate = ({ matesList }: IRegisteredMateProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        등록된 메이트
      </Title>
      <Box>
        {matesList?.map((mate, index) => (
          <MarginBox key={`friend_${index}`}>
            <FriendInfo {...mate} />
          </MarginBox>
        ))}
      </Box>
    </CustomContainer>
  );
};

export default RegisteredMate;
