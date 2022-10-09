/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import styled from 'styled-components/native';
import { ISettingData } from '../../../../recoil/home/alarmSettings';
import themeColor from '../../../../theme/theme';

import DownIcon from '../../../../assets/icons/ic-down.svg';
// import UpIcon from '../../../../assets/icons/ic-up.svg';

import { Platform, TouchableOpacity } from 'react-native';
import ItemPicker from '../../../../screen/ItemPicker';

interface IItemProps {
  name: string;
  keyValue: keyof ISettingData;
  inputLabel: ISettingData;
  onPress: () => void;
}

const CustomBox = styled(Box)`
  height: 120px;
  justify-content: center;
`;

const Title = styled(Text)`
  margin: 12px 0;
`;

const BottomBox = styled(Box)`
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.color.gray_200}`};
`;

const SetItemDefault = ({
  name,
  keyValue,
  inputLabel,
  onPress,
}: IItemProps) => {
  const textValue = inputLabel[keyValue];
  return (
    <CustomBox>
      <Title>{name}</Title>
      <TouchableOpacity onPress={onPress}>
        <BottomBox
          width="100%"
          height="56px"
          bgColor={themeColor.color.white}
          row>
          <Text>{textValue}</Text>
          <DownIcon width={24} height={24} fill={themeColor.color.gray_600} />
        </BottomBox>
      </TouchableOpacity>
    </CustomBox>
  );
};

export default SetItemDefault;
