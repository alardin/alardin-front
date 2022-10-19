/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useEffect } from 'react';
import RtcEngine, { ChannelProfile } from 'react-native-agora';
import Container from '../components/atoms/container/Container';
import Config from 'react-native-config';
import Box from '../components/atoms/box/Box';
import Text from '../components/atoms/text/Text';
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

import CloseIcon from '../assets/icons/ic-cancel.svg';
import alardinApi from '../utils/alardinApi';
import { minuteStringCheck } from '../utils/home/convertDateTime';

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
  background-image: '../';
  justify-content: space-between;
  align-items: center;
`;

const ContainerBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TopBox = styled(Box)`
  flex: 1;
`;

const BottomBox = styled(Box)`
  flex: 1;
`;

const CloseButton = styled.TouchableHighlight`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.function_success};
`;

const TimeMainText = styled(Text)`
  margin: 2px 0;
  font-size: 50px;
  color: ${({ theme }) => theme.color.white};
`;

const TimeText = styled(Text)`
  margin: 2px 0;
  color: ${({ theme }) => theme.color.white};
`;

const TitleText = styled(Text)`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.white};
`;

// let engine: RtcEngine;

const CallScreen = ({ route, navigation }: CallScreenProps) => {
  const { id, alarmId } = route.params;

  const [engine, setEngine] = useRecoilState(rtcEngine);
  const [agora, setAgora] = useRecoilState(rtcState);
  const netInfo = useNetInfo();

  const initialAgoraEngine = async () => {
    setEngine(await RtcEngine.create(Config.AGORA_APP_ID));
    console.log(`cehck engine`);
    console.log(engine);
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
    console.log(netInfo.isConnected);
    if (netInfo.isConnected) {
      initialAgoraEngine();
    }
    for (let i = 0; i < 14; i++) {
      deleteAlarmScheduler(alarmId * 1000 + i);
    }
  }, [netInfo]);

  const handleCall = () => {
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
  const timeText = `${currentDateTime.getHours()}:${minuteStringCheck(
    currentDateTime.getMinutes(),
  )}`;
  const dateText = `${
    currentDateTime.getMonth() + 1
  }월 ${currentDateTime.getDate()}일 ${
    dayString[currentDateTime.getDay()]
  }요일`;
  return (
    <CustomContainer options="zero">
      <ContainerBackground
        source={require('../assets/images/alarm_background.jpg')}>
        <TopBox width="100%" center>
          <TimeMainText options="bold">{timeText}</TimeMainText>
          <TimeText size="xl" options="bold">
            {dateText}
          </TimeText>
          <TitleText size="l">알람</TitleText>
        </TopBox>
        <BottomBox width="100%" center>
          <CloseButton onPress={handleCall}>
            <CloseIcon width={48} height={48} fill="#ffffff" />
          </CloseButton>
        </BottomBox>
      </ContainerBackground>
    </CustomContainer>
  );
};

export default CallScreen;
