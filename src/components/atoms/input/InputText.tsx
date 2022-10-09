import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextInputProps extends TextInputProps {
  textAlign?: 'right' | 'center';
  width?: string;
  height?: string;
  border?: boolean;
  ref?: React.MutableRefObject<any>;
  colorName?:
    | 'white'
    | 'lightGray'
    | 'lightSlate'
    | 'black'
    | 'red'
    | 'pink'
    | 'green'
    | 'darkGray'
    | 'lightOrange'
    | 'skyBlue';
  children?: JSX.Element;
}

const DefaultTextInput = styled.TextInput<ITextInputProps>`
  border-radius: 8px;
  font-family: 'Pretendard-Regular';
  border: ${({ theme }) => `1px solid ${theme.color.gray_100}`};
  text-align: ${({ textAlign }) =>
    textAlign === 'right'
      ? 'right'
      : textAlign === 'center'
      ? 'center'
      : 'left'};
  ${({ textAlign }) =>
    textAlign === 'right'
      ? 'padding-right: 8px'
      : textAlign === 'center'
      ? ''
      : 'padding-left: 8px'};
  ${({ width }) => `width: ${width}`};
  ${({ height }) => `height: ${height}`};
  color: ${({ theme }) => theme.color.gray_700};
  background-color: ${({ theme }) => theme.color.gray_100};
`;

const InputText = ({
  width,
  height,
  border,
  ref,
  textAlign,
  colorName,
  children,
  ...rest
}: ITextInputProps) => {
  return (
    <DefaultTextInput
      {...{ width, height, border, textAlign, colorName, ...rest, ref }}>
      {children}
    </DefaultTextInput>
  );
};

export default InputText;
