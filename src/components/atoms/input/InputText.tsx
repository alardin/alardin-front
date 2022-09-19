import React from 'react';
import { useImperativeHandle } from 'react';
import { TextInputProps } from 'react-native';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
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
  border-radius: ${({ theme }) => theme.shape.rectangle};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme, colorName }) =>
    colorName ? theme.color[colorName] : 'transparent'};
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
