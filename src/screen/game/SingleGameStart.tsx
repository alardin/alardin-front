/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform, SafeAreaView } from 'react-native';
import PushNotification from 'react-native-push-notification';
import WebView from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Container from '../../components/atoms/container/Container';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';
import NetInfo from '@react-native-community/netinfo';
import alardinApi from '../../utils/alardinApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GameStartProps = StackScreenProps<
  RootStackParamList,
  'SingleGameStart'
>;

interface WebViewMessageType {
  type: string;
  message: any;
}

const CustomContianer = styled(Container)`
  height: 100%;
`;

const WebBox = styled(Box)`
  width: 100%;
`;

const SingleGameStart = ({ route, navigation }: GameStartProps) => {
  const { alarmId } = route.params;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  let webViewRef = useRef<WebView>();

  const handleSetRef = (_ref: any) => {
    webViewRef.current = _ref;
  };

  const handleMessage = async ({
    nativeEvent: { data },
  }: WebViewMessageEvent) => {
    const { type, message }: WebViewMessageType = JSON.parse(data);
    switch (type) {
      case 'OUTPUT_DATA':
        console.log(`game id`);
        console.log(message.gameId);
        NetInfo.fetch().then(
          async state =>
            state.isConnected &&
            (await alardinApi.post('/game/save', {
              ...message,
              Alarm_id: alarmId,
            })),
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'SingleGameEnd', params: { gameId: 2 } }],
        });
        return;
      case 'TIME_OUT':
        console.log('time out!!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SingleGameEnd', params: { gameId: 2 } }],
        });
        return;
      default:
        console.log(message);
        return;
    }
  };

  useEffect(() => {
    const unsubscribeAppState = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }

        if (nextAppState === 'background') {
          PushNotification.localNotification({
            title: '앗! 게임이 아직 진행중입니다!!',
            message:
              '사용자께서 게임에 참여하고 있는 않는 상황을 감지했습니다. 다시 게임에 참여해주세요!',
          });
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      },
    );
    return () => unsubscribeAppState.remove();
  }, []);

  const sourcePath =
    Platform.OS === 'ios'
      ? require('../../assets/games/single/test/index.html')
      : {
          uri: 'file:///android_asset/games/single/twigitizer_game/index.html',
          baseUrl: 'file:///android_asset/games/single',
        };

  return (
    <SafeAreaView>
      <CustomContianer options="zero">
        <WebBox width="100%" height="100%">
          <WebView
            originWhitelist={['*']}
            ref={handleSetRef}
            onMessage={handleMessage}
            scrollEnabled={false}
            javaScriptEnabled
            domStorageEnabled
            source={sourcePath}
            style={{
              flex: 1,
            }}
          />
        </WebBox>
      </CustomContianer>
    </SafeAreaView>
  );
};

export default SingleGameStart;
