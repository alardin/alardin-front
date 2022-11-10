import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Text from '../../atoms/text/Text';

interface IBuyConfirmProps {
  id: number;
  name: string;
  price: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBox = styled(Box)`
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
`;

const CustomButton = styled(Button)`
  margin: 0 4px;
`;

const TopBox = styled(Box)`
  width: 80%;
  align-items: center;
`;

const BottomBox = styled(Box)`
  width: 80%;
  padding: 20px 14px;
`;

const TextBox = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0;
`;

const BuyConfirm = ({ id, name, price, setVisible }: IBuyConfirmProps) => {
  const navigation = useNavigation();
  console.log(id);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirm = async () => {
    if (id === 3) {
      Alert.alert('미지원 게임', '해당 게임을 구매하실 수 없습니다.');
      return;
    }
    try {
      await alardinApi.post(`/game/${id}`);
      Alert.alert('게임 구매', '게임 구매 완료');
      navigation.goBack();
    } catch (err) {
      Alert.alert('게임 구매', '게임 구매 실패');
    }
    setVisible(false);
  };

  const leftLabels = ['게임명', '가격'];
  const rightLabels = [name, `${price}G`];

  return (
    <CustomBox
      width="95%"
      height="300px"
      radius={12}
      bgColor={theme.color.white}>
      <TopBox>
        <Text options="semiBold">게임을 구매하시겠습니까?</Text>
      </TopBox>
      <BottomBox bgColor={theme.color.gray_100}>
        {rightLabels.map((value, index) => (
          <TextBox key={`label_${index}`}>
            <Text size="s" colorName={theme.color.gray_600}>
              {leftLabels[index]}
            </Text>
            <Text size="s">{value}</Text>
          </TextBox>
        ))}
      </BottomBox>
      <Box row>
        <CustomButton
          width="140px"
          height="xl"
          options="destructive"
          center
          onPress={handleCancel}>
          취소
        </CustomButton>
        <CustomButton
          width="140px"
          height="xl"
          options="primary"
          center
          onPress={handleConfirm}>
          구매
        </CustomButton>
      </Box>
    </CustomBox>
  );
};

export default BuyConfirm;
