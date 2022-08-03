import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface IBoxProps extends ViewProps {
  boxType: string;
  shadow?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const DefaultBox = styled.View<IBoxProps>`
  display: flex;
  flex-direction: row;
  padding: 8px 4px;
  border-radius: ${({ theme }) => theme.shape.rectangle};
  background-color: ${({ theme }) => theme.color.white};
  ${({ theme, shadow }) =>
    shadow &&
    `shadow-color: ${theme.shadow.default.color} shadow-offset: ${theme.shadow.default.offest.x} ${theme.shadow.default.offest.y}} shadow-opacity: ${theme.shadow.default.opacity} shadow-radius: ${theme.shadow.default.radius}; 
  `}
`;

const Box = ({ boxType, shadow, children, ...rest }: IBoxProps) => (
  <DefaultBox {...{ boxType, shadow, ...rest }}>{children}</DefaultBox>
);

export default Box;
