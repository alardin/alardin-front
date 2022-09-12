import React from 'react';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import { IMembersDataType } from '../../../../recoil/home/members';

interface IMateInviteProps {
  setMembers: React.Dispatch<React.SetStateAction<IMembersDataType[]>>;
}

const CustomContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const IconBox = styled(Box)`
  width: 50px;
  height: 50px;
  padding-left: 8px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.shape.circle};
  background-color: ${({ theme }) => theme.color.skyBlue};
  margin-bottom: 12px;
`;

const MateInvite = ({ setMembers }: IMateInviteProps) => {
  const handleInvite = () => {
    setMembers([]);
    console.log('invite pressed!');
  };
  return (
    <Button width="140px" height="180px" onPress={handleInvite}>
      <Box width="100%" height="100%" center shadow colorName="white">
        <CustomContainer>
          <IconBox width="90%" padding>
            <Icon name="user-plus" size={20} color="white" />
          </IconBox>
          <Text textType="comment" options="semiBold">
            친구를 초대하여
          </Text>
          <Text textType="comment" options="semiBold">
            같이 알람에 참여하세요!
          </Text>
        </CustomContainer>
      </Box>
    </Button>
  );
};

export default MateInvite;
