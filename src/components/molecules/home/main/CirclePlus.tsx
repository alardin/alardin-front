import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import AddIcon from '../../../../assets/icons/ic-add.svg';
import themeColor from '../../../../theme/theme';
import { IAlarmCreateNavigation } from './AlarmPlus';
import NetInfo from '@react-native-community/netinfo';
import { toastEnable } from '../../../../utils/Toast';

const CircleButton = styled.TouchableHighlight`
  border-radius: 60px;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.color.primary_400};
  z-index: 100;
  position: absolute;
  right: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const CirclePlus = () => {
  const navigation = useNavigation<IAlarmCreateNavigation>();

  return (
    <CircleButton
      onPress={() => {
        NetInfo.fetch().then(state =>
          state.isConnected
            ? navigation.navigate('AlarmCreate', { type: 'plus' })
            : toastEnable({
                text: '오프라인 모드에서는 사용하실 수 없는 기능입니다',
                duration: 'LONG',
              }),
        );
      }}
      activeOpacity={1}
      underlayColor={themeColor.color.primary_600}>
      <AddIcon width={42} height={42} fill={themeColor.color.white} />
    </CircleButton>
  );
};

export default CirclePlus;
