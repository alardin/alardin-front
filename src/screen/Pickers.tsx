import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import Button from '../components/atoms/button/Button';
import { pickerMode } from '../recoil/picker';
import DatePickerModal from './DatePicker';
import ItemPicker from './ItemPicker';

export interface IPickersProps<T, V> {
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: T;
  inputLabel: T;
  setSelectedValue: V;
  setInputLabel: V;
}

const ConfirmButton = styled(Button)`
  align-self: center;
`;

const Pickers = ({
  setVisible,
  selectedValue,
  setSelectedValue,
  inputLabel,
  setInputLabel,
}: IPickersProps<any, any>) => {
  const mode = useRecoilValue(pickerMode);
  return (
    <>
      <Suspense>
        {mode === 'time' ? (
          <DatePickerModal
            {...{
              selectedValue,
              setSelectedValue,
              inputLabel,
              setInputLabel,
            }}
          />
        ) : (
          <ItemPicker
            {...{
              selectedValue,
              setSelectedValue,
              inputLabel,
              setInputLabel,
            }}
          />
        )}
      </Suspense>
      <ConfirmButton
        colorName="black"
        width="90%"
        height="48px"
        center
        onPress={() => setVisible && setVisible(false)}>
        등록
      </ConfirmButton>
    </>
  );
};

export default Pickers;
