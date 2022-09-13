import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Text from '../../atoms/text/Text';

interface IMenuButtonProps {
  type: string;
  title: string;
  handlePress?: () => void;
}

const CustomBox = styled(Box)`
  padding: 12px 8px;
  justify-content: space-between;
  align-items: center;
`;

const CustomText = styled(Text)`
  font-size: 18px;
`;

const MenuButton = ({ title, type, handlePress }: IMenuButtonProps) => {
  return (
    <Button onPress={handlePress}>
      <CustomBox row>
        <CustomText>{title}</CustomText>
        {type === 'button_no-icon' && (
          <Icon name="chevron-forward-outline" size={20} color="black" />
        )}
      </CustomBox>
    </Button>
  );
};

export default MenuButton;
