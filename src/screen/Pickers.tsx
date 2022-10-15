import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import Button from '../components/atoms/button/Button';
import { pickerClicked, pickerMode } from '../recoil/picker';
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
  const clicked = useRecoilValue(pickerClicked);
  return (
    <>
      <Suspense>
        <ItemPicker
          {...{
            clicked,
            selectedValue,
            setSelectedValue,
            inputLabel,
            setInputLabel,
          }}
        />
      </Suspense>
      <ConfirmButton
        width="90%"
        height="l"
        options="primary"
        center
        onPress={() => setVisible && setVisible(false)}>
        등록
      </ConfirmButton>
    </>
  );
};

export default Pickers;
