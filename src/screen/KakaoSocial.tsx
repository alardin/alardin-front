import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRecoilValue } from 'recoil';
import modalVisible from '../recoil/webscreen';

const REST_API_KEY = 'ce9152602d80b914c1c949be01c523e2';
const REDIRECT_URI = 'http://localhost:3000/oauth';

const styles = StyleSheet.create({
  webViewContainer: {
    borderRadius: 14,
    borderColor: 'yellow',
    borderWidth: 2,
  },
});

const KakaoSocial = () => {
  const modalVisibleState = useRecoilValue(modalVisible);
  return (
    <Modal animationType="slide" transparent visible={modalVisibleState}>
      <View style={styles.webViewContainer}>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          // onMessage={}
        />
      </View>
    </Modal>
  );
};

export default KakaoSocial;
