import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';

interface IMenuInfoProps {
  title: string;
  value: string | undefined;
}

const CustomBox = styled(Box)`
  height: 60px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const MenuInfo = ({ title, value }: IMenuInfoProps) => {
  return (
    <CustomBox row>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </CustomBox>
  );
};

export default MenuInfo;
