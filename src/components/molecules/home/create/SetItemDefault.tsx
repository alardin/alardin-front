/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import Button from '../../../atoms/button/Button';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../../theme/theme';
import { ISettingData } from '../../../../recoil/home/alarmSettings';

interface IItemProps {
  name: string;
  icon: string;
  keyValue: keyof ISettingData;
  inputLabel: ISettingData;
  onPress: () => void;
}

const LeftBox = styled(Box)`
  flex: 1;
  align-items: center;
`;

const RightBox = styled(Button)`
  flex: 1.5;
  align-items: flex-end;
`;

const CustomBox = styled(Box)`
  justify-content: space-between;
  padding: 12px 18px;
`;

const SetItemDefault = ({
  name,
  icon,
  keyValue,
  inputLabel,
  onPress,
}: IItemProps) => {
  const textValue = inputLabel[keyValue];
  return (
    <CustomBox row>
      <LeftBox row>
        <Icon
          style={{ marginRight: 12 }}
          name={icon}
          color={theme.color.black}
          size={32}
        />
        <Text>{name}</Text>
      </LeftBox>
      <RightBox height="100%" onPress={onPress}>
        <Box center row>
          <Text options="semiBold">{textValue}</Text>
          <Icon
            style={{ marginLeft: 8 }}
            name="chevron-down-outline"
            color={theme.color.black}
            size={32}
          />
        </Box>
      </RightBox>
    </CustomBox>
  );
};

export default SetItemDefault;
