import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { ISettingData } from '../../../../recoil/home/alarmSettings';
import themeColor from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';

interface IItemBooleanProps {
  setSetting: React.Dispatch<React.SetStateAction<ISettingData>>;
  isPrivate: boolean;
  disabled?: boolean;
}

const CustomBox = styled(Box)`
  height: 120px;
  justify-content: space-between;
  align-items: center;
`;

const DetailText = styled(Text)`
  margin-top: 8px;
  color: ${({ theme }) => theme.color.gray_700};
`;

const SetItemBoolean = ({
  setSetting,
  isPrivate,
  disabled,
}: IItemBooleanProps) => {
  return (
    <CustomBox row>
      <Box>
        <Text>공개 여부</Text>
        <DetailText size="s" options="light">
          알람방을 메이트한테 공개할까요?
        </DetailText>
      </Box>
      <Switch
        disabled={disabled}
        trackColor={{
          false: themeColor.color.gray_200,
          true: themeColor.color.primary_500,
        }}
        thumbColor={themeColor.color.white}
        onValueChange={() =>
          setSetting(prevState => ({ ...prevState, is_private: !isPrivate }))
        }
        value={!isPrivate}
      />
    </CustomBox>
  );
};

export default SetItemBoolean;
