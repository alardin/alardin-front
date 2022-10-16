import React, { useEffect, useState } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import themeColor from '../../../theme/theme';

interface IMenuInfoProps {
  title: string;
  value: boolean;
  handler?: (args: any) => void;
}

const CustomBox = styled(Box)`
  height: 60px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const MenuSwitch = ({ title, value, handler }: IMenuInfoProps) => {
  const [switchValue, setSwitchValue] = useState<boolean>(value);

  useEffect(() => {
    if (handler) {
      handler(switchValue);
    }
  }, [switchValue]);

  return (
    <CustomBox row>
      <Text>{title}</Text>
      <Switch
        trackColor={{
          false: themeColor.color.gray_200,
          true: themeColor.color.primary_500,
        }}
        thumbColor={themeColor.color.white}
        onValueChange={() => setSwitchValue(!switchValue)}
        value={!switchValue}
      />
    </CustomBox>
  );
};

export default MenuSwitch;
