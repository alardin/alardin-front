import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../theme/theme';
import Button from '../button/Button';

interface IStarProps {
  checked: boolean;
  handleChecked: () => void;
}

const Star = ({ checked, handleChecked }: IStarProps) => {
  return (
    <Button center onPress={handleChecked}>
      {checked ? (
        <Icon name="star" color={theme.color.yellow} size={48} />
      ) : (
        <Icon name="star-o" color={theme.color.yellow} size={48} />
      )}
    </Button>
  );
};

export default Star;
