import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface IContainerProps extends ViewProps {
  children?: JSX.Element | JSX.Element[];
}

const DefaultBox = styled.View<IContainerProps>`
  display: flex;
  flex-direction: row;
`;

const Box = ({ children, ...rest }: IContainerProps) => (
  <DefaultBox {...rest}>{children}</DefaultBox>
);

export default Box;
