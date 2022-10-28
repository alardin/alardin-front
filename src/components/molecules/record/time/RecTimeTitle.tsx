import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

// import UpIcon from '../../../../assets/icons/ic-up.svg';
import DownIcon from '../../../../assets/icons/ic-down.svg';
import themeColor from '../../../../theme/theme';

interface IRecTitleProps {
  date: string;
}
const TitleBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.color.gray_300};
  padding: 0 8px;
  padding-bottom: 14px;
`;

const RecTimeTitle = ({ date }: IRecTitleProps) => {
  const convertDate = date.split('T')[0];
  return (
    <TitleBox row>
      <Text options="semiBold">{convertDate}</Text>
      <DownIcon width={24} height={24} fill={themeColor.color.gray_600} />
    </TitleBox>
  );
};

export default RecTimeTitle;
