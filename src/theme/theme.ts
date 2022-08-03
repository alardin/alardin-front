/* Global Theme (Alardin Version) */

const theme = {
  // FontSize
  fontSize: {
    xxlarge: '48px',
    xlarge: '36px',
    large: '24px',
    medium: '18px',
    small: '12px',
    xsmall: '8px',
  },

  // FontWeight
  fontWeight: {
    bold: '800',
    semiBold: '600',
    default: '400',
    light: '200',
  },

  // Color
  color: {
    white: '#FFFFFF',
    lightGray: '#DFE5EA',
    lightSlate: '#ECF0F3',
    black: '#08121A',
    green: '#6EC18B',
    red: '#EF6E85',
  },

  // Shape
  shape: {
    circle: '1000px',
    rectangle: '6px',
  },

  // ShapeSize
  shapeSize: {
    rectangle: {
      full: '100%',
      xxlarge: '90%',
      xlarge: '80%',
      large: '60%',
      medium: '50%',
      small: '30%',
      xsmall: '10%',
      xxsmall: '5%',
    },
    circle: {
      full: '300px',
      xxlarge: '100px',
      xlarge: '64px',
      large: '48px',
      medium: '36px',
      small: '24px',
      xsmall: '16px',
      xxsmall: '10px',
    },
  },

  // Shadow
  shadow: {
    default: {
      opacity: '0.15',
      radius: '8px',
      color: '#000000',
      offest: {
        x: '0px',
        y: '2px',
      },
      elevation: '6',
    },
    text: {
      opacity: '0.3',
      radius: '2px',
      color: '#000000',
      offest: {
        x: '2px',
        y: '4px',
      },
      elevation: '2',
    },
  },
};

export type FontSize = typeof theme.fontSize;
export type FontWeight = typeof theme.fontWeight;
export type Color = typeof theme.color;
export type Shape = typeof theme.shape;
export type ShapeSize = typeof theme.shapeSize;
export type Shadow = typeof theme.shadow;

export default theme;
