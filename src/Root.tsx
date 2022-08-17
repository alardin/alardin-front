import React, { useCallback, useEffect, useState } from 'react';
import DevMenu from 'react-native-dev-menu';

import Storybook from '../storybook';
import App from './App';
import Login from './screen/Login';

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

  // return storybookActive ? <Storybook /> : <Login />;
  return <App />;
};

export default Root;
