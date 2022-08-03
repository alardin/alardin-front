import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextInputProps extends TextInputProps {
  size:
    | 'full'
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
  children?: JSX.Element;
}

const DefaultTextInput = styled.TextInput<ITextInputProps>`
  ${({ theme, size }) => `border-radius: ${theme.shape.rectangle} 
                        width: ${theme.shapeSize.rectangle[size]}   
                        height: 48px`}
  border: 2px solid ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.black};
  padding-left: 8px;
`;

const InputText = ({ size, children, ...rest }: ITextInputProps) => (
  <DefaultTextInput {...{ size, ...rest }}>{children}</DefaultTextInput>
);

export default InputText;
