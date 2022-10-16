import React from 'react';
import { Keyboard, TextInputProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextInputProps extends TextInputProps {
  textAlign?: 'right' | 'center';
  width?: string;
  height?: string;
  border?: boolean;
  ref?: React.MutableRefObject<any>;
  children?: JSX.Element;
  placeholder?: string;
  error?: boolean;
}

const DefaultTextInput = styled.TextInput<ITextInputProps>`
  font-size: 17px;
  border-radius: 8px;
  font-family: 'Pretendard-Regular';
  border: ${({ theme, error }) =>
    `1px solid ${error ? theme.color.function_error : theme.color.gray_100}`};
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
  color: ${({ theme }) => theme.color.gray_900};
  background-color: ${({ theme, error }) =>
    error ? theme.color.white : theme.color.gray_100};
`;

const InputText = ({
  width,
  height,
  border,
  ref,
  textAlign,
  placeholder,
  error,
  children,
  ...rest
}: ITextInputProps) => {
  return (
    <DefaultTextInput
      placeholder={placeholder}
      {...{ width, height, border, textAlign, error, ...rest, ref }}>
      {children}
    </DefaultTextInput>
  );
};

export default InputText;
