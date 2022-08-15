import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Root from './src/Root';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    `message handled in the background ${JSON.stringify(remoteMessage)}`,
  );
});

AppRegistry.registerComponent(appName, () => Root);
