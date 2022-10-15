import 'styled-components';
import { ButtonTheme, Color, FontWeight, Size } from './src/theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: readonly Size;
    fontWeight: readonly FontWeight;
    color: readonly Color;
    button: readonly ButtonTheme;
    padding: readonly Padding;
  }
}
