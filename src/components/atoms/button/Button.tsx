import styled from 'styled-components/native';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface IButtonProps extends TouchableOpacityProps {
  size:
    | 'full'
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
  options?: 'circle';
  buttonType?: 'ok' | 'cancel';
  children?: JSX.Element | string | number;
}

const DefaultButton = styled.TouchableOpacity<IButtonProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, buttonType }) =>
    buttonType === 'ok'
      ? theme.color.green
      : buttonType === 'cancel'
      ? theme.color.red
      : theme.color.black};
  ${({ theme, options, size }) =>
    options === 'circle'
      ? `border-radius: ${theme.shape.circle} width: ${theme.shapeSize.circle[size]} height: ${theme.shapeSize.circle[size]}`
      : `border-radius: ${theme.shape.rectangle} width: ${theme.shapeSize.rectangle[size]} height: 48px`}
`;

const ButtonText = styled.Text`
  ${({ theme }) =>
    `font-size: ${theme.fontSize.medium} font-weight: ${theme.fontWeight.default} color: ${theme.color.white}`}
`;

const Button = ({
  size,
  options,
  buttonType,
  children,
  ...rest
}: IButtonProps) => (
  <DefaultButton {...{ size, options, buttonType, ...rest }}>
    {React.isValidElement(children) ? (
      children
    ) : (
      <ButtonText>{children}</ButtonText>
    )}
  </DefaultButton>
);

export default Button;
