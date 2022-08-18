/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import styled from 'styled-components/native';
import Box from '../box/Box';

export interface IProfileIconProps {
  size: number;
  position?: 'absolute';
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
}

const CircleBox = styled(Box)<IProfileIconProps>`
  position: ${({ position }) =>
    position === 'absolute' ? 'absolute' : 'relative'};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size - 4}px`};
  border: 2px solid ${({ theme }) => theme.color.skyBlue};
  ${({ zIndex }) => zIndex && `zIndex: ${zIndex}`};
  ${({ arrow }) => {
    let result: string = '';
    if (arrow) {
      arrow.top && (result += `top: ${arrow.top}px `);
      arrow.right && (result += `right: ${arrow.right}px `);
      arrow.left && (result += `left: ${arrow.left}px `);
      arrow.bottom && (result += `bottom: ${arrow.bottom}px `);
    }
    return result;
  }}
`;

const ImageFile = styled.Image<IProfileIconProps>`
  width: ${({ size }) => `${size - 7}px`};
  height: ${({ size }) => `${size - 7}px`};
  position: absolute;
  border-radius: ${({ size }) => `${size - 4}px`};
  top: 1.5px;
  left: 1.5px;
`;

const ProfileIcon = ({
  position,
  arrow,
  zIndex,
  size,
  ...rest
}: IProfileIconProps) => {
  return (
    <CircleBox shadow {...{ position, arrow, zIndex, size, ...rest }}>
      <ImageFile
        size={size}
        source={require('../../../assets/images/sample-profile.jpeg')}
      />
    </CircleBox>
  );
};

export default ProfileIcon;
