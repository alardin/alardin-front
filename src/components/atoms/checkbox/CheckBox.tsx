/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import { TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';
import themeColor from '../../../theme/theme';

export interface ICheckBoxProps extends TouchableHighlightProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  center?: boolean;
  checked: boolean;
  type: string;
  index: number;
  border?: boolean;
  setChecked: React.Dispatch<React.SetStateAction<any>>;
  children?: JSX.Element | JSX.Element[] | string | number;
  storyChecked?: boolean;
}

const DefaultButton = styled.TouchableHighlight<ICheckBoxProps>`
  padding: 4px;
  border-radius: 9px;
  ${({ width }) => width && `width: ${width}`}
  ${({ height }) => height && `height: ${height}`}
  ${({ center }) => center && `justify-content: center align-items: center`};
  ${({ theme, border }) =>
    border && `border: 1px solid ${theme.color.gray_500}`}
  background-color: ${({ theme, checked }) =>
    checked ? theme.color.primary_400 : theme.color.gray_100};
`;

const ButtonText = styled.Text<ICheckBoxProps>`
  font-family: 'Pretendard-Regular';
  ${({ theme }) =>
    `font-size: ${theme.size.font.m} font-weight: ${theme.fontWeight.default}`};
  color: ${({ theme, checked, index, type }) =>
    type === 'array' && checked
      ? theme.color.white
      : index === 6
      ? theme.color.tag_red
      : index === 7
      ? theme.color.tag_blue
      : theme.color.gray_900};
`;

const CheckBox = ({
  width,
  height,
  center,
  rounded,
  children,
  checked,
  border,
  index,
  type,
  setChecked,
  ...rest
}: ICheckBoxProps) => {
  return (
    <DefaultButton
      {...{
        width,
        height,
        center,
        rounded,
        type,
        border,
        checked,
        index,
        setChecked,
        ...rest,
      }}
      activeOpacity={0.6}
      underlayColor={themeColor.color.primary_200}
      onPress={() => {
        type === 'array'
          ? setChecked((prevState: any) => {
              const changeState = [...prevState];
              changeState[index] = !changeState[index];
              return changeState;
            })
          : setChecked(!checked);
      }}>
      {React.isValidElement(children) ? (
        children
      ) : (
        <ButtonText checked={checked} index={index} type={type}>
          {children}
        </ButtonText>
      )}
    </DefaultButton>
  );
};

export default CheckBox;
