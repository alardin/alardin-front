import 'styled-components';
import { Color, FontSize, FontWeight, Shadow, Shape } from './src/theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: readonly FontSize;
    fontWeight: readonly FontWeight;
    color: readonly Color;
    shape: readonly Shape;
    shapeSize: readonly ShapeSize;
    shadow: readonly Shadow;
  }
}
