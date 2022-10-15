// declaration.d.ts

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const Content: React.FC<SvgProps>;
  export default Content;
}

declare module 'loadsh';

declare module 'react-native-animate-number';
