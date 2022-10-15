import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';

interface IStarProps {
  checked: boolean;
  handleChecked: () => void;
}

const StarButton = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  margin: 0 4px;
`;

const Star = ({ checked, handleChecked }: IStarProps) => {
  return (
    <StarButton
      onPress={handleChecked}
      activeOpacity={0.5}
      underlayColor={theme.color.white}>
      {checked ? (
        <Icon name="star" color={theme.color.primary_500} size={40} />
      ) : (
        <Icon name="star-o" color={theme.color.primary_500} size={40} />
      )}
    </StarButton>
  );
};

export default Star;
