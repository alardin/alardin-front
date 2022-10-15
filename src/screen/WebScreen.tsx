/* eslint-disable react-native/no-inline-styles */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../navigation/stack/StackNavigation';

export type WebScreenProps = StackScreenProps<RootStackParamList, 'WebScreen'>;

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

const WebScreen = ({ route }: WebScreenProps) => {
  const { mode, uri } = route.params;

  console.log(mode);

  const checkResult =
    mode === 'POLICY'
      ? require('../assets/AlardinPolicy.html')
      : { uri: uri ? uri : 'https://www.google.com' };

  return (
    <View style={styles.webViewContainer}>
      <WebView
        style={{
          flex: 1,
        }}
        source={checkResult}
      />
    </View>
  );
};

export default WebScreen;
