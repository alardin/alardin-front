/* eslint-disable react-native/no-inline-styles */
// src/components/button/CustomButton.stories.jsx

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Button, { ButtonHeight } from './Button';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import DefaultDecorator from '../../../../storybook/stories/DefaultDecorator';

const buttonStories = storiesOf('Button', module);

buttonStories.addDecorator(withKnobs);
buttonStories.addDecorator(story => <DefaultDecorator story={story} />);

const handlePress = () => {
  console.log('button clicked');
};

const heightOptions = {
  tiny: 'xxs',
  xSmall: 'xs',
  small: 's',
  medium: 'm',
  large: 'l',
};

buttonStories
  .add('primary', () => (
    <Button
      width={text('width', '100px')}
      height={select('height', heightOptions, 'l') as ButtonHeight}
      options="primary"
      center
      disabled={boolean('disabled', false)}
      onPress={handlePress}>
      {text('text', '텍스트')}
    </Button>
  ))
  .add('secondary', () => (
    <Button
      width={text('width', '100px')}
      height={select('height', heightOptions, 'l') as ButtonHeight}
      options="secondary"
      center
      disabled={boolean('disabled', false)}
      onPress={handlePress}>
      {text('text', '텍스트')}
    </Button>
  ))
  .add('sub', () => (
    <Button
      width={text('width', '100px')}
      height={select('height', heightOptions, 'l') as ButtonHeight}
      options="sub"
      center
      disabled={boolean('disabled', false)}
      onPress={handlePress}>
      {text('text', '텍스트')}
    </Button>
  ))
  .add('destructive', () => (
    <Button
      width={text('width', '100px')}
      height={select('height', heightOptions, 'l') as ButtonHeight}
      options="destructive"
      center
      disabled={boolean('disabled', false)}
      onPress={handlePress}>
      {text('text', '텍스트')}
    </Button>
  ))
  .add('primary_fill', () => (
    <Button
      width={text('width', '100px')}
      height={select('height', heightOptions, 'l') as ButtonHeight}
      options="primary_fill"
      center
      disabled={boolean('disabled', false)}
      onPress={handlePress}>
      {text('text', '텍스트')}
    </Button>
  ));
