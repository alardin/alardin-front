import Snackbar from 'react-native-snackbar';
import theme from '../theme/theme';

interface IToastEnableProps {
  text: string;
  duration: 'SHORT' | 'LONG' | 'INFINITY';
  onPress?: () => void;
}

export const toastEnable = ({ text, duration, onPress }: IToastEnableProps) => {
  Snackbar.show({
    text,
    duration:
      duration === 'SHORT'
        ? Snackbar.LENGTH_SHORT
        : duration === 'LONG'
        ? Snackbar.LENGTH_LONG
        : Snackbar.LENGTH_INDEFINITE,
    action: {
      text: '확인',
      textColor: theme.color.primary_200,
      onPress,
    },
    fontFamily: 'Pretendard-Regular',
    numberOfLines: 2,
  });
};
