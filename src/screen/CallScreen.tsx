import React, { useEffect, useState } from 'react';
import RtcEngine from 'react-native-agora';
import Container from '../components/atoms/container/Container';
import Button from '../components/atoms/button/Button';
import Config from 'react-native-config';
import Box from '../components/atoms/box/Box';
import ProfileIcon from '../components/atoms/profile/ProfileIcon';
import Text from '../components/atoms/text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/stack/StackNavigation';

export type CallScreenProps = StackNavigationProp<
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

// let engine: RtcEngine;

const CallScreen = () => {
  const [engine, setEngine] = useState<RtcEngine | undefined>();
  const [agora, setAgora] = useState<IAgoraVoiceCall>({
    channelName: 'test',
    joinSucceed: false,
    openMicrophone: true,
    enableSpeakerphone: true,
    playEffect: false,
    peerIds: [],
  });

  const initialAgoraEngine = async () => {
    setEngine(await RtcEngine.create(Config.AGORA_APP_ID));
    await engine?.enableAudio();
    console.log(engine);

    engine?.addListener('Warning', warn => {
      console.log(`Warning: ${warn}`);
    });

    engine?.addListener('Error', err => {
      console.log(`Error: ${err}`);
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
        peerIds: agora.peerIds.filter(id => id !== uid),
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

  useEffect(() => {
    initialAgoraEngine();
  }, []);

  const navigation = useNavigation<CallScreenProps>();
  const handleCall = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameStart', params: { engine, agora, setAgora } }],
    });
  };

  return (
    <CustomContainer>
      <TopBox width="100%" center>
        <ProfileIcon size={120} />
        <InsideBox center>
          <Text textType="subTitle">#2298</Text>
          <Text textType="title">홍길동</Text>
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
