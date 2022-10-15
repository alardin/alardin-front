/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { TextProps, View } from 'react-native';
import styled from 'styled-components/native';
import Box from '../box/Box';

export interface ITextProps extends TextProps {
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  position?: 'absolute';
  colorName?: string;
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  options?: 'bold' | 'semiBold' | 'light';
  children?: React.ReactNode;
}

const HighlightView = styled.View`
  background-color: ${({ theme }) => theme.color.primary_100};
  align-self: flex-start;
  position: absolute;
  bottom: 1px;
  left: 0;
  width: 100%;
  height: 14px;
`;

const DefaultText = styled.Text<ITextProps>`
  font-weight: ${({ theme, options }) =>
    options ? theme.fontWeight[options] : theme.fontWeight.default};
  font-family: ${({ options }) =>
    options === 'bold'
      ? 'Pretendard-Bold'
      : options === 'semiBold'
      ? 'Pretendard-SemiBold'
      : options === 'light'
      ? 'Pretendard-Thin'
      : 'Pretendard-Regular'};
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
  ${({ theme, size }) =>
    size
      ? `font-size: ${theme.size.font[size]}`
      : `font-size: ${theme.size.font.m}`};
  ${({ theme, colorName }) =>
    colorName ? `color: ${colorName}` : `color: ${theme.color.gray_900}`};
  z-index: 1000;
`;

const HighlightedText = ({
  size,
  options,
  position,
  arrow,
  colorName,
  children,
  ...rest
}: ITextProps) => (
  <Box row>
    <View>
      <HighlightView />
      <DefaultText
        {...{
          size,
          options,
          position,
          arrow,
          colorName,
          ...rest,
        }}>
        {children}
      </DefaultText>
    </View>
  </Box>
);

export default HighlightedText;
