import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface IBoxProps extends ViewProps {
  width?: string;
  height?: string;
  isPadding?: boolean;
  row?: boolean;
  center?: boolean;
  bgColor?: string;
  noRadius?: boolean;
  radius?: number;
  children?: ReactNode;
}

const DefaultBox = styled.View<IBoxProps>`
  display: flex;
  border-radius: ${({ noRadius, radius }) =>
    noRadius ? '0px' : radius ? String(radius) + 'px' : '8px'};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ center }) => center && `justify-content: center; align-items: center;`};
  ${({ isPadding }) => isPadding && `padding: 4px 4px`};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor}`}
`;

const Box = ({
  width,
  height,
  isPadding,
  center,
  bgColor,
  noRadius,
  radius,
  children,
  ...rest
}: IBoxProps) => (
  <DefaultBox
    {...{
      width,
      height,
      isPadding,
      noRadius,
      radius,
      bgColor,
      center,
      ...rest,
    }}>
    {children}
  </DefaultBox>
);

export default Box;
