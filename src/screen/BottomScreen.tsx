import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import Button from '../components/atoms/button/Button';
import Container from '../components/atoms/container/Container';
import { pickerMode } from '../recoil/picker';
import DatePickerModal from './DatePicker';
import ItemPicker from './ItemPicker';

interface IBottomScreenProps<T, V> {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: T;
  inputLabel: T;
  setSelectedValue: V;
  setInputLabel: V;
}

const CustomContainer = styled(Container)`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  position: absolute;
  background-color: aliceblue;
  width: 100%;
  height: 300px;
  right: 0px;
  bottom: 0px;
`;

const ConfirmButton = styled(Button)`
  align-self: center;
`;

const BottomScreen = ({
  visible,
  setVisible,
  selectedValue,
  setSelectedValue,
  inputLabel,
  setInputLabel,
}: IBottomScreenProps<any, any>) => {
  const mode = useRecoilValue(pickerMode);
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        activeOpacity={1}
        onPress={() => setVisible(false)}>
        <CustomContainer>
          <TouchableOpacity onPress={() => {}} activeOpacity={1}>
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
            <ConfirmButton
              colorName="black"
              width="90%"
              height="48px"
              center
              onPress={() => setVisible(false)}>
              등록
            </ConfirmButton>
          </TouchableOpacity>
        </CustomContainer>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomScreen;
