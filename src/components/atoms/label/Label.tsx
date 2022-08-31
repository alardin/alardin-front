import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

export interface ILabelProps {
  colorName:
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
  width?: number;
  height?: number;
  rounded?: boolean;
  marginHorizontal?: boolean;
  shadow?: boolean;
  children?: ReactNode;
}

const LabelView = styled.View<ILabelProps>`
  justify-content: center;
  align-items: center;
  border-radius: ${({ rounded }) => (rounded ? '100px' : '14px')};
  padding: 4px 10px;
  ${({ width }) => width && `width: ${width}px`}
  ${({ height }) => height && `height: ${height}px`}
  ${({ marginHorizontal }) => marginHorizontal && `margin-right: 2px`}
  background-color: ${({ theme, colorName }) => theme.color[colorName]};
  ${({ theme, shadow }) =>
    shadow &&
    `shadow-color: ${theme.shadow.default.color} shadow-offset: ${theme.shadow.default.offest.x} ${theme.shadow.default.offest.y}} shadow-opacity: ${theme.shadow.default.opacity} shadow-radius: ${theme.shadow.default.radius}; 
  `}
`;

const LabelText = styled.Text<ILabelProps>`
  font-size: 12px;
  color: ${({ theme, colorName }) =>
    colorName !== 'white' ? theme.color.white : theme.color.black};
`;

const Label = ({
  colorName,
  width,
  height,
  marginHorizontal,
  shadow,
  rounded,
  children,
}: ILabelProps) => (
  <LabelView
    {...{ colorName, width, height, shadow, marginHorizontal, rounded }}>
    <LabelText>{children}</LabelText>
  </LabelView>
);

export default Label;
