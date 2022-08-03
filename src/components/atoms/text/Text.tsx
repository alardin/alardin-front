import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export interface ITextProps extends TextProps {
  textType?: 'title' | 'subTitle' | 'comment' | 'reference';
  options?: 'bold' | 'semiBold' | 'light';
  shadow?: boolean;
  children?: string | number;
}

const DefaultText = styled.Text<ITextProps>`
  font-weight: ${({ theme, options }) =>
    options ? theme.fontWeight[options] : theme.fontWeight.default};
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

const Text = ({ textType, options, shadow, children, ...rest }: ITextProps) => (
  <DefaultText {...{ textType, options, shadow, ...rest }}>
    {children}
  </DefaultText>
);

export default Text;
