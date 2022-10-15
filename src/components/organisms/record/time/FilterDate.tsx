import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import FilterButton from './FilterButton';

interface IFilterDateProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectDate: {
    start: number;
    end: number;
    startText: string;
    endText: string;
  };
  setSelectDate: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
      startText: string;
      endText: string;
    }>
  >;
}

const FilterBox = styled(Box)`
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
`;

const FilterText = styled(Text)`
  font-size: 14px;
`;

const FilterDate = ({
  setVisible,
  selectDate,
  setSelectDate,
}: IFilterDateProps) => {
  const handlePress = () => {
    setSelectDate({
      start: 0,
      end: 0,
      startText: '',
      endText: '',
    });
    setVisible(true);
  };
  return (
    <FilterBox width="100%" row>
      <FilterText>{`필터 : ${
        selectDate.startText !== '' && selectDate.endText !== ''
          ? `${selectDate.startText} ~ ${selectDate.endText}`
          : `모두`
      }`}</FilterText>
      <FilterButton handlePress={handlePress} />
    </FilterBox>
  );
};

export default FilterDate;
