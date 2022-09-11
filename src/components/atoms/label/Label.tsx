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
  marginRight?: boolean;
  shadow?: boolean;
  children?: ReactNode;
}

const LabelView = styled.View<ILabelProps>`
  ${({ marginRight }) => marginRight && `margin-right: 2px`};
  justify-content: center;
  align-items: center;
  border-radius: ${({ rounded }) => (rounded ? '100px' : '14px')};
  padding: 4px 10px;
  background-color: ${({ theme, colorName }) => theme.color[colorName]};
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  ${({ theme, shadow }) =>
    shadow &&
    `
    shadow-color: ${theme.shadow.default.color};
    shadow-offset: ${theme.shadow.default.offest.x} ${theme.shadow.default.offest.y};
    shadow-opacity: ${theme.shadow.default.opacity};
    shadow-radius: ${theme.shadow.default.radius}; 
  `};
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
  marginRight,
  shadow,
  rounded,
  children,
}: ILabelProps) => (
  <LabelView {...{ colorName, width, height, shadow, marginRight, rounded }}>
    <LabelText>{children}</LabelText>
  </LabelView>
);

export default Label;
