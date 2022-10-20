/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Container from '../../components/atoms/container/Container';
import Text from '../../components/atoms/text/Text';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';
import { rtcEngine, rtcState } from '../../recoil/gameState';
import theme from '../../theme/theme';
import alardinApi from '../../utils/alardinApi';
import RtmEngine from 'agora-react-native-rtm';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';
import sendGameData from '../../utils/sendGameData';
import { toastEnable } from '../../utils/Toast';
import systemSetting from 'react-native-system-setting';

export type GameStartProps = StackScreenProps<RootStackParamList, 'GameStart'>;
interface WebViewMessageType {
  type: string;
  message: any;
}

interface IGameTokenData {
  rtcToken: string;
  rtmToken: string;
  uid: string;
  gameId: number;
  gameData: [{ [key: string]: any }];
  channelName: string;
}

const CustomContianer = styled(Container)`
  height: 100%;
`;

const WebBox = styled(Box)`
  width: 100%;
`;

let client: RtmEngine = new RtmEngine();

const GameStart = ({ route, navigation }: GameStartProps) => {
  const { id, alarmId } = route.params;

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [timer, setTimer] = useState<boolean>(false);
  const [userType, setUserType] = useState<number>(0);
  const [gameDataState, setGameDataState] = useState<IGameTokenData>();
  const [allAttend, setAllAttend] = useState<boolean>(false);
  const [steadyMe, setSteadyMe] = useState<boolean | null>(null);
  const [steadyOther, setSteadyOther] = useState<boolean | null>(null);

  const [engine, setEngine] = useRecoilState(rtcEngine);
  const [agora, setAgora] = useRecoilState(rtcState);
  // const [gamePlayState, setGamePlayState] = useRecoilState(gameState);

  const [checkSucess, setCheckSuccess] = useState<boolean>(false);

  console.log(engine);

  let limitUntilStart: any;
  let webViewRef = useRef<WebView>();

  const handleSetRef = (_ref: any) => {
    webViewRef.current = _ref;
  };

  const initialRtmAgoraEngine = async () => {
    await client
      .createInstance(Config.AGORA_APP_ID)
      .catch(err => console.log(`create instance error: ${err}`));

    console.log('create instance');
    console.log(client);

    client?.addListener('ChannelMemberJoined', evt => {
      const { channelId } = evt;
      console.log('someone has joined!');
      client.getMembers(channelId).then(members => {
        setUserType(members.length - 1);
        if (members.length === 2) {
          // total_members로 변경 필요
          //
          client
            ?.sendMessage(channelId, { text: 'ALL_ATTEND' }, {})
            .then(() => setAllAttend(true));
        }
      });
    });

    client?.addListener('ChannelMemberLeft', evt => {
      console.log(`${evt} member has left!`);
    });

    client?.addListener('ChannelMessageReceived', message => {
      if (message.text === 'SUCCESS') {
        console.log('상대방이 성공함');
        setSteadyOther(true);
        return;
      }
      if (message.text === 'FAIL') {
        console.log('상대방이 실패함');
        setSteadyOther(false);
        return;
      }

      if (message.text === 'ALL_ATTEND') {
        console.log(`Attend: ${message.text}`);
        setAllAttend(true);
        clearTimeout(limitUntilStart);
        return;
      }

      console.log('누군가로부터 메세지를 받음');
      const clientMessage = JSON.parse(message.text);
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: 'USER_MESSAGE',
          message: { user: clientMessage.user, text: clientMessage.text },
        }),
      );
      return;
    });

    client?.addListener('MessageReceived', () => {
      console.log(`message received!`);
    });
  };

  const handleInitialGame = () => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'BACKGROUND_COLOR',
        message: { backgroudColor: `${theme.color.gray_100}` },
      }),
    );
  };

  const sendNeedGameStart = () => {
    console.log('userType: ' + userType);
    console.log(gameDataState?.gameData);
    const convertData = sendGameData(
      gameDataState?.gameId,
      gameDataState?.gameData,
      userType,
    );
    console.log('user cehcking');
    console.log(convertData);
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'GAME_START',
        message: convertData ? { ...convertData[userType] } : {}, // Picoke 게임일 경우
      }),
    );
  };

  const requestStartData = async () => {
    const res = await alardinApi.post(`/game/start?alarmId=${alarmId}`);
    console.log(`alarm id`);
    console.log(JSON.stringify(res.data.data));
    const { rtmToken, rtcToken, channelName, gameData, Game_id } =
      res.data.data;
    setGameDataState({
      rtmToken,
      rtcToken,
      gameId: Game_id,
      uid: String(id),
      gameData,
      channelName,
    });
    setAgora(prevState => ({ ...prevState, channelName }));
    console.log(`state: ${channelName}`);
    return {
      rtmToken,
      rtcToken,
      uid: String(id),
      channelName,
      gameId: Game_id,
    };
  };

  const leaveChannel = async (gameNum: number) => {
    engine
      ?.leaveChannel()
      .catch(err => console.log(`error from engine leavechannel: ${err}`));
    client
      ?.leaveChannel(agora.channelName)
      .then(() =>
        client?.logout().catch(err => console.log(`error from logout: ${err}`)),
      )
      .catch(err => console.log(`error from client leavechannel: ${err}`));
    setEngine(undefined);
    setAgora({
      channelName: '',
      joinSucceed: false,
      openMicrophone: true,
      enableSpeakerphone: true,
      playEffect: false,
      peerIds: [],
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameEnd', params: { gameId: gameNum } }],
    });
  };

  const switchMicrophone = () => {
    console.log('check mic');
    console.log(agora.openMicrophone);
    if (agora.openMicrophone === false) {
      engine
        ?.enableLocalAudio(!agora.openMicrophone)
        .then(() => {
          setAgora(prevState => ({
            ...prevState,
            openMicrophone: !agora.openMicrophone,
          }));
        })
        .catch(err => console.log(err));
    }
  };

  const switchSpeakerphone = () => {
    console.log('speaker phone');
    console.log(agora.enableSpeakerphone);
    if (!engine?.isSpeakerphoneEnabled()) {
      engine?.setEnableSpeakerphone(!agora.enableSpeakerphone).then(() => {
        setAgora(prevState => ({
          ...prevState,
          enableSpeakerphone: !agora.openMicrophone,
        }));
      });
    }
  };

  const handleMessage = async ({
    nativeEvent: { data },
  }: WebViewMessageEvent) => {
    const { type, message }: WebViewMessageType = JSON.parse(data);
    switch (type) {
      case 'CORRECT':
        console.log(`message ${message}`);
        if (message === 'TRUE') {
          client?.sendMessage(agora.channelName, { text: 'SUCCESS' }, {});
          setCheckSuccess(true);
          setSteadyMe(true);
        } else {
          client?.sendMessage(agora.channelName, { text: 'FAIL' }, {});
          setCheckSuccess(false);
          setSteadyMe(false);
        }
        return;
      case 'SEND_MESSAGE':
        client?.sendMessage(
          agora.channelName,
          { text: JSON.stringify({ user: message.user, text: message.text }) },
          {},
        );
        return;
      case 'OUTPUT_DATA':
        console.log(`game id`);
        console.log({
          ...message,
          Game_id: gameDataState?.gameId,
          is_cleared: true,
          Alarm_id: alarmId,
        });

        await alardinApi.post('/game/save', {
          ...message,
          Game_id: gameDataState?.gameId,
          is_cleared: true,
          Alarm_id: alarmId,
        });
        await leaveChannel(message.Game_id);
        return;
      case 'TIME_OUT':
        console.log('time out!!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'GameEnd', params: { gameId: message.Game_id } }],
        });
        return;
      default:
        console.log(message);
        return;
    }
  };

  const joinChannel = async () => {
    const { rtcToken, rtmToken, uid, channelName } = await requestStartData();

    console.log('uid');
    console.log(uid);
    await engine
      ?.joinChannel(rtcToken, channelName, null, Number(uid))
      .catch(err => console.log(err.response.data));
    console.log(client);
    client
      ?.loginV2(uid, rtmToken)
      .then(() => {
        console.log(`login!!`);
        console.log(channelName);
        client
          ?.joinChannel(channelName)
          .then(() => console.log('channel ok, ' + channelName))
          .catch(err => console.log(`error from client joinchannel: ${err}`));
      })
      .catch(err => console.log(`loginV2 error: ${err}`));
  };

  useEffect(() => {
    systemSetting.setVolume(0.5, { showUI: true });
    if (!timer) {
      limitUntilStart = setTimeout(() => setTimer(true), 1000 * 60);
    } else {
      toastEnable({
        text: '사용자가 접속하지 않아 싱글 플레이 모드로 전환합니다',
        duration: 'LONG',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'SingleGameStart', params: { gameId: 2 } }],
      });
    }
    return () => clearTimeout(limitUntilStart);
  }, [timer]);

  useEffect(() => {
    initialRtmAgoraEngine();
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
    if (!agora.joinSucceed) {
      console.log('start channel');
      joinChannel()
        .then(() => {
          console.log('rtc joined!');
          switchMicrophone();
          switchSpeakerphone();
        })
        .catch(err => {
          console.log(`the device can't connect to the channel id : ${err}`);
        });
    }
    return () => {
      unsubscribeAppState.remove();
    };
  }, []);

  useEffect(() => {
    if (allAttend) {
      console.log(`attend: true!!!!`);
      sendNeedGameStart();
    }
  }, [allAttend]);

  useEffect(() => {
    console.log('누군가 정답을 제출 or 초기화 렌더링');
    if (steadyMe !== null && steadyOther !== null) {
      console.log('둘 다 정답은 제출했음');
      if (steadyMe === true && steadyOther === true) {
        console.log('둘 다 성공!!');
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'SUCCESS',
            message: {},
          }),
        );
      } else {
        console.log('둘 중 한명이 실패!');
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'FAIL',
            message: {},
          }),
        );
        setSteadyMe(null);
        setSteadyOther(null);
      }
    }
  }, [steadyOther, steadyMe]);

  return (
    <SafeAreaView>
      <CustomContianer options="zero">
        <WebBox width="100%" height="100%">
          {checkSucess && <Text>Success! Wait for other player!</Text>}
          <WebView
            originWhitelist={['*']}
            ref={handleSetRef}
            onMessage={handleMessage}
            onLoad={handleInitialGame}
            javaScriptEnabled
            scrollEnabled={false}
            source={{ uri: 'http://192.168.0.13:3030' }}
            style={{
              flex: 1,
            }}
          />
        </WebBox>
      </CustomContianer>
    </SafeAreaView>
  );
};

export default GameStart;
