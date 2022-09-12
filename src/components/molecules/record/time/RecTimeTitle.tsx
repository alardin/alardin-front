import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

const TitleBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.lightGray};
`;

const RecTimeTitle = () => {
  return (
    <TitleBox row>
      <Text size="small">2022.06.28(수)</Text>
      <Text size="xsmall" colorName="lightGray" options="semiBold">
        경과 시간
      </Text>
    </TitleBox>
  );
};

export default RecTimeTitle;
