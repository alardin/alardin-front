import styled from 'styled-components/native';
import React, { ReactNode } from 'react';
import { TouchableHighlightProps } from 'react-native';

export interface IButtonProps extends TouchableHighlightProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  center?: boolean;
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
  value?: string;
  children?: ReactNode;
}

const DefaultButton = styled.TouchableHighlight<IButtonProps>`
  ${({ center }) => center && `justify-content: center align-items: center`};
  ${({ width }) => `width: ${width}`}
  ${({ height }) => `height: ${height}`}
  background-color: ${({ theme, colorName }) =>
    colorName || colorName === 'white'
      ? theme.color[colorName]
      : 'transparent'};
  border-radius: ${({ theme, rounded }) =>
    rounded ? theme.shape.circle : theme.shape.rectangle};
`;

const ButtonText = styled.Text`
  ${({ theme }) =>
    `font-size: ${theme.fontSize.small} font-weight: ${theme.fontWeight.default} color: ${theme.color.white}`}
`;

const Button = ({
  width,
  height,
  center,
  rounded,
  colorName,
  value,
  children,
  ...rest
}: IButtonProps) => (
  <DefaultButton
    {...{ width, height, center, rounded, colorName, ...rest }}
    activeOpacity={0.6}
    underlayColor="transparent"
    value={value}>
    {React.isValidElement(children) ? (
      children
    ) : (
      <ButtonText>{children}</ButtonText>
    )}
  </DefaultButton>
);

export default Button;
