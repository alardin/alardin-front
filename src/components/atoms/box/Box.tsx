import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface IBoxProps extends ViewProps {
  width?: string;
  height?: string;
  isPadding?: boolean;
  shadow?: boolean;
  row?: boolean;
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
  children?: ReactNode;
}

const DefaultBox = styled.View<IBoxProps>`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  border-radius: ${({ theme }) => theme.shape.rectangle};
  background-color: ${({ theme, colorName }) =>
    colorName ? theme.color[colorName] : 'transparent'};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ center }) => center && `justify-content: center align-items: center`};
  ${({ isPadding }) => isPadding && `padding: 4px 4px`};
  ${({ theme, shadow }) =>
    shadow &&
    `
    shadow-color: ${theme.shadow.default.color} 
    shadow-offset: ${theme.shadow.default.offest.x} ${theme.shadow.default.offest.y}} 
    shadow-opacity: ${theme.shadow.default.opacity} 
    shadow-radius: ${theme.shadow.default.radius}; 
  `}
`;

const Box = ({
  width,
  height,
  shadow,
  isPadding,
  center,
  children,
  ...rest
}: IBoxProps) => (
  <DefaultBox {...{ width, height, isPadding, center, shadow, ...rest }}>
    {children}
  </DefaultBox>
);

export default Box;
