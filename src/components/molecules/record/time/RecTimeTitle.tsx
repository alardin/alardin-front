import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

interface IRecTitleProps {
  date: string;
}
const TitleBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.lightGray};
`;

const RecTimeTitle = ({ date }: IRecTitleProps) => {
  const convertDate = date.split('T')[0];
  return (
    <TitleBox row>
      <Text size="small">{convertDate}</Text>
      <Text size="xsmall" colorName="lightGray" options="semiBold">
        경과 시간
      </Text>
    </TitleBox>
  );
};

export default RecTimeTitle;
