/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useEffect, useState } from 'react';
import DevMenu from 'react-native-dev-menu';
import { RecoilRoot } from 'recoil';

import Storybook from '../storybook';
import App from './App';

const Root = () => {
  // const [storybookActive, setStorybookActive] = useState(false);
  // const toggleStorybook = useCallback(
  //   () => setStorybookActive(active => !active),
  //   [],
  // );

  // useEffect(() => {
  //   if (__DEV__) {
  //     DevMenu.addItem('Toggle Storybook', toggleStorybook);
  //   }
  // }, [toggleStorybook]);

  // return <Storybook />;
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default Root;
