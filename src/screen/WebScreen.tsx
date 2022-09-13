import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

const WebScreen = () => {
  return (
    <View style={styles.webViewContainer}>
      <WebView
        style={{
          flex: 1,
        }}
        source={{
          uri: 'https://www.google.com',
        }}
      />
    </View>
  );
};

export default WebScreen;
