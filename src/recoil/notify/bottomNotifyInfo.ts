import { atom } from 'recoil';

interface IBottomNotifyInfoProps {
  id: number;
  nickname: string;
  thumbnail_image_url: string;
  type: string;
}

const bottomNotifyInfo = atom<IBottomNotifyInfoProps>({
  key: 'bottomNotifyInfo',
  default: {} as IBottomNotifyInfoProps,
});

export default bottomNotifyInfo;
