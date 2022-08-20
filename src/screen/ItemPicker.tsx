import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { summaryData } from '../recoil/home/summary';
import { pickerList } from '../recoil/picker';

interface IItemPickerProps {
  selectedValue: any;
  inputLabel: any;
  setSelectedValue: SetterOrUpdater<any>;
  setInputLabel: SetterOrUpdater<any>;
}

const ItemPicker = ({
  selectedValue,
  setSelectedValue,
  inputLabel,
  setInputLabel,
}: IItemPickerProps) => {
  const recoilResult = useRecoilValue(pickerList);
  const setSummary = useSetRecoilState(summaryData);

  return (
    <Picker
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
