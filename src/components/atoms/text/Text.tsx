/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ReactNode } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextProps extends TextProps {
  position?: 'absolute';
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  textType?: 'title' | 'subTitle' | 'comment' | 'reference';
  options?: 'bold' | 'semiBold' | 'light';
  shadow?: boolean;
  children?: ReactNode;
}

const DefaultText = styled.Text<ITextProps>`
  font-weight: ${({ theme, options }) =>
    options ? theme.fontWeight[options] : theme.fontWeight.default};
  position: ${({ position }) =>
    position === 'absolute' ? 'absolute' : 'relative'};
  ${({ arrow }) => {
    let result: string = '';
    if (arrow) {
      arrow.top && (result += `top: ${arrow.top}px `);
      arrow.right && (result += `right: ${arrow.right}px `);
      arrow.left && (result += `left: ${arrow.left}px `);
      arrow.bottom && (result += `bottom: ${arrow.bottom}px `);
    }
    return result;
  }}
  ${({ theme, textType }) => {
    let value = 'font-size: ';
    switch (textType) {
      case 'title':
        value += theme.fontSize.xlarge;
        break;
      case 'subTitle':
        value += theme.fontSize.large;
        break;
      case 'comment':
        value += theme.fontSize.small;
        break;
      case 'reference':
        value += theme.fontSize.medium + ` color: ${theme.color.lightGray}`;
        break;
      default:
        value += theme.fontSize.medium;
        break;
    }
    return value;
  }}
  ${({ theme, shadow }) =>
    shadow &&
    `
    shadow-color: ${theme.shadow.text.color} 
    shadow-offset: ${theme.shadow.text.offest.x} ${theme.shadow.text.offest.y}} 
    shadow-opacity: ${theme.shadow.text.opacity} 
    shadow-radius: ${theme.shadow.text.radius}; 
  `}
`;

const Text = ({
  textType,
  options,
  position,
  arrow,
  shadow,
  children,
  ...rest
}: ITextProps) => (
  <DefaultText {...{ textType, options, position, arrow, shadow, ...rest }}>
    {children}
  </DefaultText>
);

export default Text;
