/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useEffect, useState } from 'react';
import RtcEngine, { ChannelProfile } from 'react-native-agora';
import Container from '../components/atoms/container/Container';
import Button from '../components/atoms/button/Button';
import Config from 'react-native-config';
import Box from '../components/atoms/box/Box';
import Text from '../components/atoms/text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/stack/StackNavigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { rtcEngine, rtcState } from '../recoil/gameState';
import { deleteAlarmItem } from '../utils/alarm/alarmStorage';
import { deleteAlarmScheduler } from '../utils/alarm/alarmScheduler';
import { useNetInfo } from '@react-native-community/netinfo';
import Sound from 'react-native-sound';
import { toastEnable } from '../utils/Toast';

export type CallScreenProps = StackScreenProps<
  RootStackParamList,
  'CallScreen'
>;

export interface IAgoraVoiceCall {
  channelName: string;
  joinSucceed: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  playEffect: boolean;
  peerIds: number[];
}

export interface ICheckMembersSuccess {
  me: boolean;
  other: boolean;
}

const CustomContainer = styled(Container)`
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TopBox = styled(Box)`
  flex: 1;
`;

const BottomBox = styled(Box)`
  flex: 1;
`;

let engine: RtcEngine;

const CallScreen = ({ route, navigation }: CallScreenProps) => {
  const { id, alarmId } = route.params;

  const [agora, setAgora] = useRecoilState(rtcState);
  const setEngine = useSetRecoilState(rtcEngine);
  const netInfo = useNetInfo();

  const initialAgoraEngine = async () => {
    engine = await RtcEngine.create(Config.AGORA_APP_ID);
    await engine?.enableAudio();
    await engine?.setChannelProfile(ChannelProfile.Game);

    engine?.addListener('Warning', warn => {
      console.log(`RTCWarning: ${warn}`);
    });

    engine?.addListener('Error', err => {
      console.log(`RTC Error: ${err}`);
    });

    engine?.addListener('UserJoined', (uid, elasped) => {
      console.log('UserJoined', uid, elasped);
      if (agora.peerIds.indexOf(uid) === -1) {
        setAgora(prevState => ({
          ...prevState,
          peerIds: [...agora.peerIds, uid],
        }));
      }
    });

    engine?.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setAgora(prevState => ({
        ...prevState,
        peerIds: agora.peerIds.filter(peerId => peerId !== uid),
      }));
    });

    engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      setAgora(prevState => ({
        ...prevState,
        joinSucceed: true,
      }));
    });
    setEngine(engine);
  };

  const sound = new Sound('test_rooster.wav', Sound.MAIN_BUNDLE, err => {
    if (err) {
      console.log('cannot load music file');
      return;
    }
    console.log(
      'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
    );
  });

  const soundAlarm = () => {
    sound.setVolume(1);
    sound.setNumberOfLoops(-1);

    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      soundAlarm();
    }, 1000);
    netInfo.isConnected && initialAgoraEngine();
    for (let i = 0; i < 14; i++) {
      deleteAlarmScheduler(alarmId * 1000 + i);
    }
    deleteAlarmItem(alarmId);
  }, []);

  const handleCall = () => {
    sound.pause();
    if (netInfo.isConnected) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'GameStart',
            params: {
              id,
              alarmId,
            },
          },
        ],
      });
    } else {
      toastEnable({
        text: '오프라인 상태로 인해 싱글 플레이 모드로 전환합니다.',
        duration: 'LONG',
      });
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'SingleGameStart',
            params: {
              id,
              alarmId,
            },
          },
        ],
      });
    }
  };

  const dayString = ['일', '월', '화', '수', '목', '금', '토'];
  const currentDateTime = new Date(Date.now());
  const timeText = `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`;
  const dateText = `${
    currentDateTime.getMonth() + 1
  }월 ${currentDateTime.getDate()}일 ${
    dayString[currentDateTime.getDay()]
  }요일`;
  return (
    <CustomContainer>
      <TopBox width="100%" center>
        <Text>{timeText}</Text>
        <Text>{dateText}</Text>
        <Text>알람</Text>
      </TopBox>
      <BottomBox width="100%" center>
        <Button
          width="100px"
          height="l"
          options="primary"
          center
          onPress={handleCall}>
          <Icon name="call-outline" color="white" size={48} />
        </Button>
      </BottomBox>
    </CustomContainer>
  );
};

export default CallScreen;
