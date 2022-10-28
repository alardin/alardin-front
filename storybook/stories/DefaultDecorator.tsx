import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../src/theme/theme';
import { StoryFn } from '@storybook/addons';

interface IStoryFunction {
  story: StoryFn<React.ReactNode>;
}

const DefaultDecorator = ({ story }: IStoryFunction) => {
  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {story()}
      </View>
    </ThemeProvider>
  );
};

export default DefaultDecorator;
