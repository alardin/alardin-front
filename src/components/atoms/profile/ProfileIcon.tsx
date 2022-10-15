/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import styled from 'styled-components/native';
import Box from '../box/Box';
import ProfileIc from '../../../assets/icons/ic-profile.svg';
import themeColor from '../../../theme/theme';
import { SvgUri } from 'react-native-svg';
import SvgImage from 'react-native-svg/lib/typescript/elements/Image';

export interface IProfileIconProps {
  size: number;
  position?: 'absolute';
  arrow?: { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
  isMargin?: boolean;
  uri?: string;
  local?: any;
}

const CircleBox = styled(Box)<IProfileIconProps>`
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.color.gray_100};
  position: ${({ position }) =>
    position === 'absolute' ? 'absolute' : 'relative'};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  ${({ isMargin }) => isMargin && 'margin: 2px'};
  ${({ zIndex }) => zIndex && `zIndex: ${zIndex}`};
`;

const ImageFile = styled.Image<IProfileIconProps>`
  border-radius: ${({ local }) => (local ? '0px' : '18px')};
  width: ${({ size, local }) => `${local ? '30' : size}px`};
  height: ${({ size, local }) => `${local ? '30' : size}px`};
  position: absolute;
`;

const ProfileIcon = ({
  position,
  arrow,
  zIndex,
  isMargin,
  size,
  local,
  uri,
  ...rest
}: IProfileIconProps) => {
  const imagePath = uri
    ? { uri }
    : local
    ? local
    : require('../../../assets/icons/ic-users.svg');
  return (
    <CircleBox {...{ position, arrow, zIndex, local, isMargin, size, ...rest }}>
      {uri || local ? (
        <ImageFile source={imagePath} local={local} {...{ size }} />
      ) : (
        <ProfileIc
          width={Math.floor(size * 0.6)}
          height={Math.floor(size * 0.6)}
          fill={themeColor.color.gray_900}
        />
      )}
    </CircleBox>
  );
};

export default ProfileIcon;
