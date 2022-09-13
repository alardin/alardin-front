import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
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
    <Button>
      <Box center>
        <MenuImage source={{ uri: icon }} />
        <MenuText textType="comment" options="semiBold">
          {text}
        </MenuText>
      </Box>
    </Button>
  );
};

export default MenuIcon;
