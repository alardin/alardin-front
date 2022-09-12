/* eslint-disable react-native/no-inline-styles */
// src/components/button/CustomButton.stories.jsx

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Button from './Button';
import { withKnobs } from '@storybook/addon-knobs';
import DefaultDecorator from '../../../../storybook/stories/DefaultDecorator';

const buttonStories = storiesOf('Button', module);

buttonStories.addDecorator(withKnobs);
buttonStories.addDecorator(story => <DefaultDecorator story={story} />);

buttonStories
  .add('full', () => <Button size="full">Hello Button</Button>)
  .add('xxlarge', () => <Button size="xlarge">Hello Button</Button>)
  .add('xlarge', () => <Button size="xlarge">Hello Button</Button>)
  .add('large', () => <Button size="large">Hello Button</Button>)
  .add('medium', () => <Button size="medium">Hello Button</Button>)
  .add('small', () => <Button size="small">Hello Button</Button>)
  .add('xsmall', () => <Button size="xsmall">Hello Button</Button>)
  .add('xxsmall', () => <Button size="xxsmall">Hello Button</Button>);

