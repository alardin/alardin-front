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
import { toastEnable } from '../../utils/Toast';
import PushNotification from 'react-native-push-notification';

export type GameStartProps = StackScreenProps<RootStackParamList, 'GameStart'>;
interface WebViewMessageType {
  type: string;
  message: any;
}

interface IGameTokenData {
  rtcToken: string;
  rtmToken: string;
  uid: string;
  user: object[];
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
  const [gameData, setGameData] = useState<IGameTokenData>();
  const [allAttend, setAllAttend] = useState<boolean>(false);
  const [steadyMe, setSteadyMe] = useState<boolean | null>(null);
  const [steadyOther, setSteadyOther] = useState<boolean | null>(null);

  const engine = useRecoilValue(rtcEngine);
  const [agora, setAgora] = useRecoilState(rtcState);
  // const [gamePlayState, setGamePlayState] = useRecoilState(gameState);

  const [checkSucess, setCheckSuccess] = useState<boolean>(false);

  let limitUntilStart: any;
  let webViewRef = useRef<WebView>();

  const handleSetRef = (_ref: any) => {
    webViewRef.current = _ref;
  };

  const initialRtmAgoraEngine = async () => {
    await client.createInstance(Config.AGORA_APP_ID);

    client?.addListener('ChannelMemberJoined', evt => {
      const { channelId } = evt;
      console.log('someone has joined!');
      client.getMembers(channelId).then(members => {
        setUserType(members.length - 1);
        if (members.length === 2) {
          //
          setTimeout(
            () =>
              client
                ?.sendMessage(channelId, { text: 'ALL_ATTEND' }, {})
                .then(() => setAllAttend(true)),
            1500,
          );
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
        // setGamePlayState(prevState => ({
        //   ...prevState,
        //   otherUserSuccess: { ...prevState.otherUserSuccess, other: true },
        // }));
      }
      if (message.text === 'FAIL') {
        console.log('상대방이 실패함');
        setSteadyOther(false);
        // setGamePlayState(prevState => ({
        //   ...prevState,
        //   otherUserSuccess: { ...prevState.otherUserSuccess, other: false },
        // }));
      }

      if (message.text === 'ALL_ATTEND') {
        console.log(`Attend: ${message.text}`);
        setAllAttend(true);
        clearTimeout(limitUntilStart);
      }
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
    console.log(`checkfsdaf: ${JSON.stringify(gameData?.user)}`);
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'GAME_START',
        message: { ...gameData?.user[userType] },
      }),
    );
  };

  const requestStartData = async () => {
    const res = await alardinApi.post(`/game/start?alarmId=${alarmId}`);
    console.log(res.data.data);
    const {
      rtmToken,
      rtcToken,
      channelName,
      player1Images,
      player2Images,
      player1AnswerIndex,
      player2AnswerIndex,
    } = res.data.data;
    setGameData({
      rtmToken,
      rtcToken,
      uid: String(id),
      user: [
        {
          subject: player2Images[player1AnswerIndex],
          images: player1Images,
          answer: player1Images[player2AnswerIndex],
        },
        {
          subject: player1Images[player2AnswerIndex],
          images: player2Images,
          answer: player2Images[player1AnswerIndex],
        },
      ],
      channelName,
    });
    setAgora(prevState => ({ ...prevState, channelName }));
    console.log(`state: ${channelName}`);
    return { rtmToken, rtcToken, uid: String(id), channelName };
  };

  const leaveChannel = async (gameNum: number) => {
    await engine?.leaveChannel();
    await client?.leaveChannel(agora.channelName);
    client?.logout();
    setAgora(prevState => ({ ...prevState, peerIds: [], joinSucceed: false }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameEnd', params: { gameId: gameNum } }],
    });
  };

  const switchMicrophone = () => {
    console.log('check mic');
    console.log(agora.openMicrophone);
    engine
      ?.enableLocalAudio(!agora.openMicrophone)
      .then(() => {
        setAgora(prevState => ({
          ...prevState,
          openMicrophone: !agora.openMicrophone,
        }));
      })
      .catch(err => console.log(err));
  };

  const switchSpeakerphone = () => {
    console.log('speaker phone');
    console.log(agora.enableSpeakerphone);
    engine?.setEnableSpeakerphone(!agora.enableSpeakerphone).then(() => {
      setAgora(prevState => ({
        ...prevState,
        enableSpeakerphone: !agora.openMicrophone,
      }));
    });
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
          // setGamePlayState(prevState => ({
          //   ...prevState,
          //   otherUserSuccess: { ...prevState.otherUserSuccess, me: true },
          // }));
        } else {
          client?.sendMessage(agora.channelName, { text: 'FAIL' }, {});
          setCheckSuccess(false);
          setSteadyMe(false);
          // setGamePlayState(prevState => ({
          //   ...prevState,
          //   otherUserSuccess: { ...prevState.otherUserSuccess, me: false },
          // }));
        }
        return;
      case 'OUTPUT_DATA':
        console.log(`game id`);
        console.log(message.gameId);
        await alardinApi.post('/game/save', {
          ...message,
          Game_channel_id: Number(gameData?.channelName),
          Alarm_id: alarmId,
        });
        await leaveChannel(message.gameId);
        return;
      case 'TIME_OUT':
        console.log('time out!!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'GameEnd', params: { gameId: 0 } }],
        });
        return;
      default:
        console.log(message);
        return;
    }
  };

  const joinChannel = async () => {
    const { rtcToken, rtmToken, uid, channelName } = await requestStartData();
    console.log(`join: ${channelName}`);
    await engine
      ?.joinChannel(rtcToken, channelName, null, Number(uid))
      .catch(err => console.log(err.response.data));
    client?.loginV2(uid, rtmToken).then(() => {
      console.log(`login!!`);
      client
        .joinChannel(channelName)
        .then(() => console.log('channel ok, ' + channelName));
    });
  };

  useEffect(() => {
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
    // sound.stop();
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
      joinChannel()
        .then(() => {
          console.log('rtc joined!');
          if (!agora.openMicrophone) {
            console.log(agora.openMicrophone);
            switchMicrophone();
          }
          if (!agora.enableSpeakerphone) {
            console.log(agora.openMicrophone);
            switchSpeakerphone();
          }
        })
        .catch(err => {
          console.log(`the device can't connect to the channel id : ${err}`);
        });
    }
    return () => {
      unsubscribeAppState.remove();
      engine?.leaveChannel();
      client.leaveChannel(agora.channelName);
      client?.logout();
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
