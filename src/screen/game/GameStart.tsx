import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';
import Box from '../../components/atoms/box/Box';
import Button from '../../components/atoms/button/Button';
import Container from '../../components/atoms/container/Container';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';

export type GameStartProps = StackScreenProps<RootStackParamList, 'GameStart'>;

const CustomContianer = styled(Container)`
  height: 100%;
`;

const WebBox = styled(Box)`
  width: 100%;
  height: 95%;
`;

const ButtonBox = styled(Box)`
  width: 100%;
`;

const GameStart = ({ route, navigation }: GameStartProps) => {
  const { engine, agora, setAgora } = route.params;
  const joinChannel = async () => {
    await engine?.joinChannel('token', agora.channelName, null, 0);
  };

  const leaveChannel = async () => {
    await engine?.leaveChannel();
    setAgora(prevState => ({ ...prevState, peerIds: [], joinSucceed: false }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameEnd' }],
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
    engine?.setEnableSpeakerphone(!agora.enableSpeakerphone).then(() => {});
  };

  useEffect(() => {
    if (!agora.joinSucceed) {
      joinChannel()
        .then(() => {
          if (!agora.openMicrophone) {
            switchMicrophone();
          }
          if (!agora.enableSpeakerphone) {
            switchSpeakerphone();
          }
        })
        .catch(err => {
          console.log(`the device can't connect to the channel id : ${err}`);
        });
    }
  }, [agora]);

  return (
    <SafeAreaView>
      <CustomContianer options="zero">
        <WebBox width="100%" height="90%" colorName="black">
          <WebView
            source={{ uri: 'gameUri' }}
            style={{
              flex: 1,
            }}
          />
        </WebBox>
        <ButtonBox>
          <Button
            width="100%"
            height="48px"
            colorName="black"
            center
            onPress={leaveChannel}>
            임시 종료 버튼
          </Button>
        </ButtonBox>
      </CustomContianer>
    </SafeAreaView>
  );
};

export default GameStart;
