import React from 'react';
import styled from 'styled-components/native';
import { IMyProfile } from '../../../recoil/authorization';
import theme from '../../../theme/theme';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import ProfileText from '../../molecules/menu/ProfileText';
import LoadingComponent from './LoadingComponent';

interface IProfileBox {
  premium: boolean;
  profile: IMyProfile;
}

const LeftBox = styled(Box)`
  flex: 1.5;
  justify-content: center;
  align-items: center;
`;

const RightBox = styled(Box)`
  flex: 4;
  flex-direction: row;
  align-items: center;
`;

const ProfileBox = ({ premium, profile }: IProfileBox) => {
  return (
    <Box width="100%" height="120px" row bgColor={theme.color.white}>
      {Object.keys(profile).length !== 0 ? (
        <>
          <LeftBox>
            <ProfileIcon size={64} uri={profile.thumbnail_image_url} />
          </LeftBox>
          <RightBox>
            <ProfileText
              grade={premium}
              name={profile.nickname}
              id={profile.id}
              email={profile.email}
            />
          </RightBox>
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export default ProfileBox;
