import { atom } from 'recoil';
import RtmEngine from 'agora-react-native-rtm';
import RtcEngine from 'react-native-agora';

export interface IGameState {
  allAttend: boolean;
  otherUserSuccess: { me: boolean | null; other: boolean | null };
}

export interface IAgoraRtcState {
  channelName: string;
  joinSucceed: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  playEffect: boolean;
  peerIds: (string | number)[];
}

export const rtcState = atom<IAgoraRtcState>({
  key: 'rtcState',
  default: {
    channelName: '',
    joinSucceed: false,
    openMicrophone: true,
    enableSpeakerphone: true,
    playEffect: false,
    peerIds: [],
  } as IAgoraRtcState,
});

export const gameState = atom<IGameState>({
  key: 'gameState',
  default: {
    allAttend: false,
    otherUserSuccess: { me: null, other: null },
  } as IGameState,
});

export const rtmClient = atom<RtmEngine | undefined>({
  key: 'rtmClient',
  default: undefined,
});

export const rtcEngine = atom<RtcEngine | undefined>({
  key: 'rtcEngine',
  default: undefined,
});
