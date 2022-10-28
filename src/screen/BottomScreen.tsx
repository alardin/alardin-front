import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Container from '../components/atoms/container/Container';

interface IBottomScreenProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomContainer = styled(Container)`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  position: absolute;
  background-color: ${({ theme }) => theme.color.gray_200};
  width: 100%;
  height: 320px;
  right: 0px;
  bottom: 0px;
`;

const BottomScreen = ({
  visible,
  setVisible,
  children,
}: IBottomScreenProps) => {
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
            {children}
          </TouchableOpacity>
        </CustomContainer>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomScreen;
