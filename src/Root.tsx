import React, { useCallback, useEffect, useState } from 'react';
import DevMenu from 'react-native-dev-menu';

import Storybook from '../storybook';
import App from './App';

const Root = () => {
  const [storybookActive, setStorybookActive] = useState(false);
  const toggleStorybook = useCallback(
    () => setStorybookActive(active => !active),
    [],
  );

  useEffect(() => {
    if (__DEV__) {
      DevMenu.addItem('Toggle Storybook', toggleStorybook);
    }
  }, [toggleStorybook]);

  return storybookActive ? <Storybook /> : <App />;
};

export default Root;
