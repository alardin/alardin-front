import React from 'react';
import Box from '../../atoms/box/Box';
import TrashIcon from '../../../assets/icons/ic-trash.svg';
import Text from '../../atoms/text/Text';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface IDeleteButtonProps {
  handlePress?: () => void;
}

const CustomBox = styled(Box)`
  padding: 4px 8px;
  border: ${({ theme }) => `1px solid ${theme.color.gray_400}`};
`;

const CustomText = styled(Text)`
  margin-left: 2px;
`;

const DeleteButton = ({ handlePress }: IDeleteButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <CustomBox row center>
        <TrashIcon width={24} height={24} />
        <CustomText size="s">삭제하기</CustomText>
      </CustomBox>
    </TouchableOpacity>
  );
};

export default DeleteButton;
