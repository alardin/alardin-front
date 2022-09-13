import React from 'react';
import styled from 'styled-components/native';
import { IMyProfile } from '../../../recoil/authorization';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import ProfileText from '../../molecules/menu/ProfileText';

interface IProfileBox {
  premium: boolean;
  profile: IMyProfile;
}

const LeftBox = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MiddleBox = styled(Box)`
  flex: 2;
  justify-content: center;
  padding-left: 12px;
`;

const RightBox = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ShareIcon = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 64px;
`;

const ProfileBox = ({ premium, profile }: IProfileBox) => {
  return (
    <Container>
      <Box width="100%" height="120px" row colorName="white">
        <LeftBox>
          <ProfileIcon size={64} />
        </LeftBox>
        <MiddleBox>
          <ProfileText
            grade={premium}
            name={profile.nickname}
            id={profile.id}
            email={profile.email}
          />
        </MiddleBox>
        <RightBox>
          <ShareIcon
            resizeMode="center"
            source={{
              uri: 'https://blog.kakaocdn.net/dn/Sq4OD/btqzlkr13eD/dYwFnscXEA6YIOHckdPDDk/img.jpg',
            }}
          />
        </RightBox>
      </Box>
    </Container>
  );
};

export default ProfileBox;
