import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';

interface IMenuIconProps {
  text: string;
  icon: string;
}

const MenuImage = styled.Image`
  width: 36px;
  height: 36px;
`;

const MenuText = styled(Text)`
  padding-top: 8px;
  text-align: center;
`;

const MenuIcon = ({ text, icon }: IMenuIconProps) => {
  return (
    <TouchableOpacity>
      <Box center>
        <MenuImage source={{ uri: icon }} />
        <MenuText options="semiBold">{text}</MenuText>
      </Box>
    </TouchableOpacity>
  );
};

export default MenuIcon;
