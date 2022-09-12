import React from 'react';
import { TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';

export interface ICheckBoxProps extends TouchableHighlightProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  center?: boolean;
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
  index: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  children?: JSX.Element | JSX.Element[] | string | number;
}

const DefaultButton = styled.TouchableHighlight<ICheckBoxProps>`
  ${({ center }) => center && `justify-content: center align-items: center`};
  ${({ width }) => width && `width: ${width}`}
  ${({ height }) => height && `height: ${height}`}
  background-color: ${({ theme, colorName, checked }) =>
    checked ? theme.color[colorName] : 'transparent'};
  border: ${({ theme, colorName }) => `1px solid ${theme.color[colorName]}`};
  border-radius: ${({ theme, rounded }) =>
    rounded ? theme.shape.circle : theme.shape.rectangle};
`;

const ButtonText = styled.Text<ICheckBoxProps>`
  ${({ theme }) =>
    `font-size: ${theme.fontSize.medium} font-weight: ${theme.fontWeight.default}`};
  color: ${({ theme, colorName, checked }) =>
    checked ? theme.color.white : theme.color[colorName]};
`;

const CheckBox = ({
  width,
  height,
  center,
  rounded,
  colorName,
  children,
  index,
  checked,
  setChecked,
  ...rest
}: ICheckBoxProps) => {
  return (
    <DefaultButton
      {...{
        width,
        height,
        center,
        rounded,
        colorName,
        checked,
        ...rest,
      }}
      onPress={() =>
        setChecked(prevState => {
          const changeState = [...prevState];
          changeState[index] = !changeState[index];
          return changeState;
        })
      }>
      {React.isValidElement(children) ? (
        children
      ) : (
        <ButtonText colorName={colorName} checked={checked}>
          {children}
        </ButtonText>
      )}
    </DefaultButton>
  );
};

export default CheckBox;
