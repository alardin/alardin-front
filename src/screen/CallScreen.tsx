/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useEffect, useState } from 'react';
import RtcEngine, { ChannelProfile } from 'react-native-agora';
import Container from '../components/atoms/container/Container';
import Button from '../components/atoms/button/Button';
import Config from 'react-native-config';
import Box from '../components/atoms/box/Box';
import ProfileIcon from '../components/atoms/profile/ProfileIcon';
import Text from '../components/atoms/text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/stack/StackNavigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { rtcEngine, rtcState } from '../recoil/gameState';

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

const InsideBox = styled(Box)`
  margin-top: 24px;
`;

let engine: RtcEngine;

const CallScreen = ({ route, navigation }: CallScreenProps) => {
  const { id, alarmId, thumbnail_image_url, nickname, userType } = route.params;
  const [profileImg, setProfileImg] = useState<string>(
    'https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2',
  );

  const [agora, setAgora] = useRecoilState(rtcState);
  const setEngine = useSetRecoilState(rtcEngine);

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

  useEffect(() => {
    initialAgoraEngine();
    setProfileImg(thumbnail_image_url);
  }, []);

  const handleCall = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'GameStart',
          params: {
            id,
            alarmId,
            userType,
          },
        },
      ],
    });
  };

  return (
    <CustomContainer>
      <TopBox width="100%" center>
        <ProfileIcon size={120} uri={profileImg} />
        <InsideBox center>
          <Text textType="subTitle">{`#${id}`}</Text>
          <Text textType="title">{nickname}</Text>
        </InsideBox>
      </TopBox>
      <BottomBox width="100%" center>
        <Button
          width="100px"
          height="100px"
          rounded
          colorName="green"
          center
          onPress={handleCall}>
          <Icon name="call-outline" color="white" size={48} />
        </Button>
      </BottomBox>
    </CustomContainer>
  );
};

export default CallScreen;
