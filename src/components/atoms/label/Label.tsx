import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

export interface ILabelProps {
  bgColor: string;
  textColor: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  marginRight?: boolean;
  shadow?: boolean;
  children?: ReactNode;
}

const LabelView = styled.View<ILabelProps>`
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border-radius: 32px;
  background-color: ${({ bgColor }) => bgColor};
  ${({ marginRight }) => marginRight && `margin-right: 2px`};
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
`;

const LabelText = styled.Text<ILabelProps>`
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  color: ${({ textColor }) => textColor};
`;

const Label = ({
  bgColor,
  textColor,
  width,
  height,
  marginRight,
  shadow,
  rounded,
  children,
}: ILabelProps) => (
  <LabelView {...{ bgColor, width, height, shadow, marginRight, rounded }}>
    <LabelText textColor={textColor}>{children}</LabelText>
  </LabelView>
);

export default Label;
