import React from 'react';
import Box from '../../../atoms/box/Box';
import CalendarIcon from '../../../../assets/icons/ic-calendar.svg';
import themeColor from '../../../../theme/theme';
import Text from '../../../atoms/text/Text';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface IFilterButtonProps {
  handlePress?: () => void;
}

const CustomBox = styled(Box)`
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.color.gray_300};
`;

const CustomText = styled(Text)`
  margin-left: 4px;
`;

const FilterButton = ({ handlePress }: IFilterButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <CustomBox row center radius={64}>
        <CalendarIcon width={18} height={18} fill={themeColor.color.gray_900} />
        <CustomText size="s">날짜 선택</CustomText>
      </CustomBox>
    </TouchableOpacity>
  );
};

export default FilterButton;
