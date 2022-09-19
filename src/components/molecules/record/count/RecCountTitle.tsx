import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';

interface IRecCountTitleProps {
  name: string;
  playCount: number;
  profileImage: string;
}

const TitleBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.lightGray};
`;

const NameText = styled(Text)`
  margin-left: 8px;
`;

const LeftBox = styled(Box)``;

const RightBox = styled(Box)``;

const RecCountTitle = ({
  name,
  playCount,
  profileImage,
}: IRecCountTitleProps) => {
  return (
    <TitleBox row>
      <LeftBox row center>
        <ProfileIcon size={36} uri={profileImage} />
        <NameText size="small" options="semiBold">
          {name}
        </NameText>
      </LeftBox>
      <RightBox center>
        <Text size="xsmall" colorName="lightGray" options="semiBold">
          {`총 ${playCount}회 같이 참여`}
        </Text>
      </RightBox>
    </TitleBox>
  );
};

export default RecCountTitle;
