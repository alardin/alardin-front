import { atom } from 'recoil';

const initialData: IMembersDataType = {
  id: 0,
  nickname: '',
  thumbnail_image_url: '',
};

export interface IMembersDataType {
  id: number;
  nickname: string;
  thumbnail_image_url: string;
}

export const members = atom({
  key: 'members',
  default: initialData,
});
