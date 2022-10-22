import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Container from '../components/atoms/container/Container';

interface ICenterScreenProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomContainer = styled(Container)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const CenterScreen = ({
  visible,
  setVisible,
  children,
}: ICenterScreenProps) => {
  return (
    <Modal
      animationType="fade"
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

export default CenterScreen;
