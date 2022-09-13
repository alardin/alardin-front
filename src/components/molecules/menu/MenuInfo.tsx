import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';

interface IMenuInfoProps {
  title: string;
  value: string | undefined;
}

const CustomBox = styled(Box)`
  padding: 12px 8px;
  justify-content: space-between;
  align-items: center;
`;

const CustomText = styled(Text)`
  font-size: 18px;
`;

const MenuInfo = ({ title, value }: IMenuInfoProps) => {
  return (
    <CustomBox row>
      <CustomText>{title}</CustomText>
      <CustomText>{value}</CustomText>
    </CustomBox>
  );
};

export default MenuInfo;
