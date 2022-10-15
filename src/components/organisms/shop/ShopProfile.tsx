import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import PremiumLabel from '../../molecules/shop/user/PremiumLabel';
import theme from '../../../theme/theme';
import { IMyProfile } from '../../../recoil/authorization';

export interface IUserAssetData {
  coin: number;
  isPremium: boolean;
  totalGames: number;
}

interface IHeaderProps {
  asset: IUserAssetData;
  profile: IMyProfile;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

const LeftBox = styled(Box)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const RightBox = styled(Box)`
  justify-content: center;
  flex: 4;
  padding-left: 12px;
`;

const TextBox = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GradeBox = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

const LabelBox = styled(Box)`
  padding: 4px 8px;
  margin-left: 8px;
`;

const ShopProfile = ({ asset, profile, setVisible }: IHeaderProps) => {
  const { isPremium } = asset;
  const { nickname, thumbnail_image_url } = profile;
  return (
    <CustomContainer>
      <LeftBox>
        <ProfileIcon size={64} uri={thumbnail_image_url} />
      </LeftBox>
      <RightBox>
        <Text options="semiBold">{nickname}</Text>
        <TextBox>
          <GradeBox>
            <Text size="s">회원등급</Text>
            <LabelBox bgColor={theme.color.white} center>
              <Text
                size="s"
                colorName={theme.color.gray_700}
                options="semiBold">
                {isPremium ? '프리미엄' : '일반'}
              </Text>
            </LabelBox>
          </GradeBox>
          <PremiumLabel isPremium={isPremium} setVisible={setVisible} />
        </TextBox>
      </RightBox>
    </CustomContainer>
  );
};

export default ShopProfile;
