/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import styled from 'styled-components/native';
import Box from '../box/Box';

export interface IProfileIconProps {
  position?: 'absolute';
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
}

const CircleBox = styled(Box)<IProfileIconProps>`
  position: ${({ position }) =>
    position === 'absolute' ? 'absolute' : 'relative'};
  width: 52px;
  height: 52px;
  border-radius: 46px;
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

const ImageFile = styled.Image`
  width: 46px;
  height: 46px;
  position: absolute;
  border-radius: 46px;
  top: 1.5px;
  left: 1.5px;
`;

const ProfileIcon = ({
  position,
  arrow,
  zIndex,
  ...rest
}: IProfileIconProps) => {
  return (
    <CircleBox shadow {...{ position, arrow, zIndex, ...rest }}>
      <ImageFile
        source={require('../../../assets/images/sample-profile.jpeg')}
      />
    </CircleBox>
  );
};

export default ProfileIcon;
