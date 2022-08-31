/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextProps extends TextProps {
  size?:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
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
  position?: 'absolute';
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  textType?: 'title' | 'subTitle' | 'comment' | 'reference';
  options?: 'bold' | 'semiBold' | 'light';
  shadow?: boolean;
  children?: React.ReactNode;
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
  }};
  ${({ theme, textType }) => {
    let value = 'font-size: ';
    switch (textType) {
      case 'title':
        value += theme.fontSize.large;
        break;
      case 'subTitle':
        value += theme.fontSize.medium;
        break;
      case 'comment':
        value += theme.fontSize.xsmall;
        break;
      case 'reference':
        value += theme.fontSize.xsmall + ` color: ${theme.color.lightGray}`;
        break;
      default:
        value += theme.fontSize.small;
        break;
    }
    return value;
  }};
  ${({ theme, size }) => size && `font-size: ${theme.fontSize[size]}`};
  ${({ theme, colorName }) => colorName && `color: ${theme.color[colorName]}`};
  ${({ theme, shadow }) =>
    shadow &&
    `
    shadow-color: ${theme.shadow.text.color} 
    shadow-offset: ${theme.shadow.text.offest.x} ${theme.shadow.text.offest.y}} 
    shadow-opacity: ${theme.shadow.text.opacity} 
    shadow-radius: ${theme.shadow.text.radius}; 
  `};
`;

const Text = ({
  size,
  colorName,
  textType,
  options,
  position,
  arrow,
  shadow,
  children,
  ...rest
}: ITextProps) => (
  <DefaultText
    {...{
      size,
      colorName,
      textType,
      options,
      position,
      arrow,
      shadow,
      ...rest,
    }}>
    {children}
  </DefaultText>
);

export default Text;
