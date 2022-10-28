import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import MoreIcon from '../../../assets/icons/ic-more.svg';
import theme from '../../../theme/theme';

interface IMenuButtonProps {
  type: string;
  title: string;
  handlePress?: () => void;
}

const CustomBox = styled(Box)`
  height: 60px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const MenuButton = ({ title, type, handlePress }: IMenuButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <CustomBox row>
        <Text>{title}</Text>
        {type === 'button_no-icon' && (
          <MoreIcon width={20} height={20} fill={theme.color.gray_900} />
        )}
      </CustomBox>
    </TouchableOpacity>
  );
};

export default MenuButton;
