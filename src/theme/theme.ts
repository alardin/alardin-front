/* Global Theme (Alardin Version) */

// const theme = {
//   // FontSize
//   fontSize: {
//     xxlarge: '64px',
//     xlarge: '48px',
//     large: '32px',
//     medium: '24px',
//     small: '18px',
//     xsmall: '12px',
//     xxsmall: '8px',
//   },

//   // FontWeight
//   fontWeight: {
//     bold: '800',
//     semiBold: '600',
//     default: '400',
//     light: '200',
//   },

//   // Color
//   color: {
//     white: '#FFFFFF',
//     lightGray: '#868C91',
//     lightSlate: '#E1E6EA',
//     black: '#0C0D0E',
//     green: '#6EC18B',
//     red: '#EF6E85',
//     pink: '#FFADBD',
//     darkGray: '#42381F',
//     lightOrange: '#F8A436',
//     skyBlue: '#3880FF',
//     yellow: '#FDCC0D',
//   },

//   // Shape
//   shape: {
//     circle: '1000px',
//     rectangle: '12px',
//   },

//   // ShapeSize
//   shapeSize: {
//     rectangle: {
//       full: '100%',
//       xxlarge: '90%',
//       xlarge: '80%',
//       large: '60%',
//       medium: '50%',
//       small: '30%',
//       xsmall: '10%',
//       xxsmall: '5%',
//     },
//     circle: {
//       full: '300px',
//       xxlarge: '100px',
//       xlarge: '64px',
//       large: '48px',
//       medium: '36px',
//       small: '24px',
//       xsmall: '16px',
//       xxsmall: '10px',
//     },
//   },

//   // Shadow
//   shadow: {
//     default: {
//       opacity: '0.15',
//       radius: '8px',
//       color: '#000000',
//       offest: {
//         x: '0px',
//         y: '2px',
//       },
//       elevation: '6',
//     },
//     text: {
//       opacity: '0.3',
//       radius: '2px',
//       color: '#000000',
//       offest: {
//         x: '2px',
//         y: '4px',
//       },
//       elevation: '2',
//     },
//   },
// };

const theme = {
  color: {
    primary_600: '#4F4DE1',
    primary_500: '#6260ED',
    primary_400: '#7674FF',
    primary_300: '#9796FF',
    primary_200: '#BCBBFF',
    primary_100: '#E4E3FF',
    primary_50: '#F2F2FF',
    gray_900: '#172E48',
    gray_800: '#314358',
    gray_700: '#6D7884',
    gray_600: '#788492',
    gray_500: '#B9BFC6',
    gray_400: '#CED4DA',
    gray_300: '#EAEEF1',
    gray_200: '#F1F3F5',
    gray_100: '#F8F9FA',
    white: '#FFFFFF',
    function_error: '#F25B5A',
    function_success: '#4BCCAE',
    function_warning: '#FFD84E',
    tag_orange: '#FF9A24',
    tag_green: '#22B8CF',
    tag_blue: '#5C7CFA',
    tag_red: '#F57078',
  },
  size: {
    icon: {
      xxs: '14px',
      xs: '18px',
      s: '24px',
      m: '28px',
      l: '36px',
      xl: '42px',
      xxl: '56px',
      xxxl: '64px',
    },
    font: {
      xxs: '8px',
      xs: '12px',
      s: '14px',
      m: '18px',
      l: '24px',
      xl: '28px',
      xxl: '32px',
    },
  },
  fontWeight: {
    bold: '800',
    semiBold: '600',
    default: '400',
    light: '200',
  },
  button: {
    primary: {
      default: `background-color: #7674FF;`,
      pressed: `background-color: #6260ED;`,
      disabled: `background-color: #F1F3F5;`,
    },
    secondary: {
      default: `background-color: transparent; border: 1px solid #7674FF;`,
      pressed: `background-color: transparent; border: 1px solid #6260ED;`,
      disabled: `background-color: transparent; border: 1px solid #CED4DA;`,
    },
    sub: {
      default: `background-color: transparent;`,
      pressed: `background-color: transparent;`,
      disabled: `background-color: transparent; border: 1px solid #CED4DA;`,
    },
    destructive: {
      default: `background-color: transparent; border: 1px solid #F25B5A;`,
      pressed: `background-color: transparent; border: 1px solid #F25B5A;`,
      disabled: `background-color: transparent; border: 1px solid #CED4DA;`,
    },
    primary_fill: {
      default: `background-color: #7674FF;`,
      pressed: `background-color: #6260ED;`,
      disabled: `background-color: #F1F3F5;`,
    },
    font: {
      xxs: `font-size: 10px; font-weight: 700;`,
      xs: `font-size: 10px; font-weight: 700;`,
      s: `font-size: 12px; font-weight: 700;`,
      m: `font-size: 14px; font-weight: 700;`,
      l: `font-size: 16px; font-weight: 700;`,
      xl: `font-size: 18px; font-weight: 700;`,
    },
    text: {
      primary: {
        default: `color: #ffffff;`,
        pressed: `color: #ffffff;`,
        disabled: `color: #B9BFC6;`,
      },
      secondary: {
        default: `color: #7674FF;`,
        pressed: `color: #6260ED;`,
        disabled: `color: #B9BFC6;`,
      },
      sub: {
        default: `color: #314358;`,
        pressed: `color: #314358;`,
        disabled: `color: #B9BFC6;`,
      },
      destructive: {
        default: `color: #F25B5A;`,
        pressed: `color: #F25B5A;`,
        disabled: `color: #B9BFC6;`,
      },
      primary_fill: {
        default: `color: #ffffff;`,
        pressed: `color: #ffffff;`,
        disabled: `color: #B9BFC6`,
      },
    },
  },
  padding: {
    xxs: 'padding: 4px 8px',
    xs: 'padding: 6px 10px',
    s: 'padding: 8px 14px',
    m: 'padding: 10px 20px',
    l: 'padding: 12px 24px',
    xl: 'padding: 14px 28px',
  },
};

export type Size = typeof theme.size;
// export type FontSize = typeof theme.fontSize;
export type FontWeight = typeof theme.fontWeight;
export type Color = typeof theme.color;
export type ButtonTheme = typeof theme.button;
export type Padding = typeof theme.padding;
// export type Shape = typeof theme.shape;
// export type ShapeSize = typeof theme.shapeSize;
// export type Shadow = typeof theme.shadow;

export default theme;
