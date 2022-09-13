import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components/native';
import { ISettingData } from '../../../../recoil/home/alarmSettings';
import theme from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import InputText from '../../../atoms/input/InputText';
import Text from '../../../atoms/text/Text';

interface IItemProps<T> {
  name: string;
  text: string;
  icon: string;
  onChangeText: T;
}

const CustomBox = styled(Box)`
  justify-content: space-between;
  padding: 12px 18px;
`;

const CustomInputBox = styled(Box)`
  justify-content: flex-end;
  align-items: flex-end;
`;

const SetItemInput = ({
  name,
  icon,
  text,
  onChangeText,
}: IItemProps<SetterOrUpdater<ISettingData>>) => {
  const handleChangeText = (inputStr: string) => {
    onChangeText(prevState => ({ ...prevState, name: inputStr }));
  };
  return (
    <CustomBox row>
      <Box row center>
        <Icon
          style={{ marginRight: 12 }}
          name={icon}
          color={theme.color.black}
          size={32}
        />
        <Text>{name}</Text>
      </Box>
      <CustomInputBox height="100%" row>
        <InputText
          textAlign="right"
          width="180px"
          height="100%"
          colorName="lightSlate"
          value={text}
          onChangeText={handleChangeText}
        />
      </CustomInputBox>
    </CustomBox>
  );
};

export default SetItemInput;
