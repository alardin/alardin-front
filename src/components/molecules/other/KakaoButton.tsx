/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import KakaoSimble from '../../../assets/icons/ic-chat.svg';

const LoginButton = styled.TouchableOpacity`
  width: 98%;
  height: 56px;
  margin-bottom: 12px;
  background-color: #fee500;
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CustomText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const KakaoButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <LoginButton onPress={onPress}>
      <KakaoSimble
        width={28}
        height={28}
        fill="#000000"
        style={{ marginHorizontal: 4 }}
      />
      <CustomText>카카오 로그인</CustomText>
    </LoginButton>
  );
};

export default KakaoButton;
