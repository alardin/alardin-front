/* eslint-disable react-native/no-inline-styles */

import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
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
import Sound from 'react-native-sound';

export type GameStartProps = StackScreenProps<RootStackParamList, 'GameStart'>;
interface WebViewMessageType {
  type: string;
  message: any;
}

interface IGameTokenData {
  rtcToken: string;
  rtmToken: string;
  uid: string;
  user: object;
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
  const { alarmId, userType, sound } = route.params;
  const [gameData, setGameData] = useState<IGameTokenData>();
  const [allAttend, setAllAttend] = useState<boolean>(false);
  const [steadyMe, setSteadyMe] = useState<boolean | null>(null);
  const [steadyOther, setSteadyOther] = useState<boolean | null>(null);

  const engine = useRecoilValue(rtcEngine);
  const [agora, setAgora] = useRecoilState(rtcState);
  // const [gamePlayState, setGamePlayState] = useRecoilState(gameState);

  const [checkSucess, setCheckSuccess] = useState<boolean>(false);

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
        if (members.length === 2) {
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
        message: { backgroudColor: `${theme.color.lightSlate}` },
      }),
    );
  };

  const sendNeedGameStart = () => {
    console.log(`checkfsdaf: ${JSON.stringify(gameData?.user)}`);
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'GAME_START',
        message: { ...gameData?.user },
      }),
    );
  };

  const requestStartData = async () => {
    const res = await alardinApi.post(`/game/start?alarmId=${alarmId}`);
    const { rtmToken, rtcToken, uid, channelName, userA, userB } =
      res.data.data;
    console.log('A');
    console.log(userA);
    console.log('B');
    console.log(userB);
    setGameData({
      rtmToken,
      rtcToken,
      uid,
      user: userType === 'A' ? { ...userA } : { ...userB },
      channelName,
    });
    setAgora(prevState => ({ ...prevState, channelName }));
    console.log(`state: ${channelName}`);
    return { rtmToken, rtcToken, uid, channelName };
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
          trial: message.trial + 1,
        });
        await leaveChannel(message.gameId);
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
    sound.stop();
    initialRtmAgoraEngine();
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
        // setGamePlayState(prevState => ({
        //   ...prevState,
        //   otherUserSuccess: { me: null, other: null },
        // }));
      }
    }
  }, [steadyOther, steadyMe]);

  return (
    <SafeAreaView>
      <CustomContianer options="zero">
        <WebBox width="100%" height="100%" colorName="black">
          {checkSucess && <Text>Success! Wait for other player!</Text>}
          <WebView
            originWhitelist={['*']}
            ref={handleSetRef}
            onMessage={handleMessage}
            onLoad={handleInitialGame}
            javaScriptEnabled
            source={{ uri: 'http://3.38.235.20:3000' }}
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
