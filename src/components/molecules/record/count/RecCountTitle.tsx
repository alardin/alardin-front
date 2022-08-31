import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';

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

const RecCountTitle = () => {
  return (
    <TitleBox row>
      <LeftBox row center>
        <ProfileIcon size={36} />
        <NameText size="small" options="semiBold">
          홍길동
        </NameText>
      </LeftBox>
      <RightBox center>
        <Text size="xsmall" colorName="lightGray" options="semiBold">
          2022.06.30 ~
        </Text>
      </RightBox>
    </TitleBox>
  );
};

export default RecCountTitle;
