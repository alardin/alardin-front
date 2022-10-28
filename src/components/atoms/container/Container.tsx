import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface IViewProps extends ViewProps {
  options?: 'zero';
  children?: ReactNode;
}

const DefaultBox = styled.View<IViewProps>`
  display: flex;
  padding: ${({ options }) => (options === 'zero' ? `0px` : `8px`)};
`;

const Container = ({ options, children, ...rest }: IViewProps) => (
  <DefaultBox {...{ options, ...rest }}>{children}</DefaultBox>
);

export default Container;
