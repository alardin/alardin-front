import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useRef } from 'react';
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { summaryData } from '../recoil/home/summary';
import { pickerClicked, pickerList } from '../recoil/picker';

interface IItemPickerProps {
  clicked: any;
  selectedValue: any;
  inputLabel: any;
  setSelectedValue: SetterOrUpdater<any>;
  setInputLabel: SetterOrUpdater<any>;
}

const ItemPicker = ({
  clicked,
  selectedValue,
  setSelectedValue,
  inputLabel,
  setInputLabel,
}: IItemPickerProps) => {
  const recoilResult = useRecoilValue(pickerList);
  const pickerReset = useSetRecoilState(pickerClicked);
  const setSummary = useSetRecoilState(summaryData);
  const pickerRef = useRef<any>();

  useEffect(() => {
    if (clicked) {
      console.log(clicked);
      pickerRef.current?.focus();
    }
    return () => pickerReset(0);
  }, [clicked]);

  return (
    <Picker
      mode="dialog"
      ref={pickerRef}
      selectedValue={
        typeof selectedValue === 'object'
          ? selectedValue[recoilResult.type]
          : selectedValue
      }
      onValueChange={(value, index) => {
        if (typeof selectedValue === 'object') {
          setInputLabel({
            ...inputLabel,
            [recoilResult.type]: recoilResult.data[index].label,
          });
          setSummary(prevState => ({
            ...prevState,
            [recoilResult.type]: recoilResult.data[index].label,
          }));
          setSelectedValue((prevState: any) => ({
            ...prevState,
            [recoilResult.type]: value,
          }));
        }
        if (typeof selectedValue === 'string') {
          setSelectedValue(value);
        }
      }}>
      {recoilResult?.data.map(({ label, value }, index) => (
        <Picker.Item key={`picker_${index}`} label={label} value={value} />
      ))}
    </Picker>
  );
};

export default ItemPicker;
