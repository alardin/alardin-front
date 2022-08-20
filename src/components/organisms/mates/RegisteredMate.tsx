import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import FriendInfo from '../../molecules/mates/FriendInfo';
import { IMateListDataType } from '../../templates/mates/TMates';

interface IRegisteredMateProps {
  matesList: IMateListDataType[];
}

const CustomContainer = styled(Container)`
  margin: 24px 0;
`;

const Title = styled(Text)`
  padding-bottom: 12px;
`;

const RegisteredMate = ({ matesList }: IRegisteredMateProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        등록된 메이트
      </Title>
      <Box>
        {matesList.map((mate, index) => (
          <FriendInfo key={`friend_${index}`} {...mate} />
        ))}
      </Box>
    </CustomContainer>
  );
};

export default RegisteredMate;
