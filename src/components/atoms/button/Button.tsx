import styled from 'styled-components/native';
import React, { ReactNode } from 'react';
import { TouchableHighlightProps } from 'react-native';
import themeName from '../../../theme/theme';

export type ButtonHeight = 'xs' | 'xxs' | 'm' | 'l' | 's' | 'xl';

export interface IButtonProps extends TouchableHighlightProps {
  width?: string;
  height: ButtonHeight;
  center?: boolean;
  options: 'primary' | 'secondary' | 'sub' | 'destructive' | 'primary_fill';
  value?: string;
  fontSize?: number;
  disabled?: boolean;
  children?: ReactNode;
}

const DefaultButton = styled.TouchableHighlight<IButtonProps>`
  ${({ center }) => center && `justify-content: center; align-items: center;`}
  ${({ width }) => `width: ${width}`}
  ${({ theme, height }) => theme.padding[height]}
  ${({ theme, options, disabled }) =>
    `${
      disabled ? theme.button[options].disabled : theme.button[options].default
    }`}
  border-radius: ${({ options, height }) =>
    options === 'primary_fill'
      ? '0px'
      : height === 's' || height === 'xs' || height === 'xxs'
      ? '4px'
      : '8px'};
`;

const ButtonText = styled.Text<IButtonProps>`
  font-family: 'Pretendard-Regular';
  ${({ theme, options, disabled }) =>
    `${
      disabled
        ? theme.button.text[options].disabled
        : theme.button.text[options].default
    }`}
  ${({ theme, fontSize, height }) =>
    fontSize
      ? `font-size: ${fontSize}px`
      : height
      ? theme.button.font[height]
      : theme.button.font.xs}
`;

const Button = ({
  width,
  height,
  center,
  value,
  fontSize,
  options,
  disabled,
  children,
  ...rest
}: IButtonProps) => {
  const pressedColor = themeName.button[options].pressed.split(' ')[1];
  return (
    <DefaultButton
      {...{ width, height, center, options, disabled, ...rest }}
      activeOpacity={1}
      underlayColor={pressedColor.substring(0, pressedColor.length - 1)}
      value={value}>
      {React.isValidElement(children) ? (
        children
      ) : (
        <ButtonText {...{ fontSize, options, height, disabled }}>
          {children}
        </ButtonText>
      )}
    </DefaultButton>
  );
};

export default Button;
