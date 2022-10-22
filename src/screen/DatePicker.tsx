import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components/native';
import Container from '../components/atoms/container/Container';
import theme from '../theme/theme';
import { convertTime, dateToTimeString } from '../utils/home/convertDateTime';

interface IDatePickerProps {
  selectedValue: any;
  inputLabel: any;
  setSelectedValue: SetterOrUpdater<any>;
  setInputLabel: SetterOrUpdater<any>;
}

const CustomDatePicker = styled(Container)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const DatePickerModal = ({
  setSelectedValue,
  setInputLabel,
}: IDatePickerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    const convertString = dateToTimeString(date);
    setSelectedValue((prevState: any) => ({
      ...prevState,
      time: convertString,
    }));
    setInputLabel((prevState: any) => ({
      ...prevState,
      time: convertTime(convertString),
    }));
  }, [date]);
  return (
    <CustomDatePicker>
      <DatePicker
        mode="time"
        date={date}
        onDateChange={setDate}
        textColor={theme.color.black}
      />
    </CustomDatePicker>
  );
};

export default DatePickerModal;
