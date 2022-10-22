/* eslint-disable react-native/no-inline-styles */

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import DefaultDecorator from '../../../../storybook/stories/DefaultDecorator';
import CheckBox from './CheckBox';

const checkBoxStories = storiesOf('CheckBox', module);

checkBoxStories.addDecorator(withKnobs);
checkBoxStories.addDecorator(story => <DefaultDecorator story={story} />);

checkBoxStories
  .add('circle', () => {
    const [checked, setChecked] = useState<boolean>(false);
    return <CheckBox rounded {...{ checked, setChecked }} />;
  })
  .add('rectangle', () => {
    const [checked, setChecked] = useState<boolean>(false);
    return <CheckBox {...{ checked, setChecked }} />;
  });
