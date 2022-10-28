import { atom } from 'recoil';

const initialData: IMembersDataType = {
  id: 0,
  nickname: '',
  thumbnail_image_url: '',
};

export interface IMembersDataType {
  id?: number;
  kakao_id?: number;
  nickname: string;
  thumbnail_image_url: string;
}

// export interface IKakaoMembersConvert {
//   allowed_msg: boolean;
//   favorite: boolean;
//   id: number;
//   profile_nickname: string;
//   profile_thumbnail_image: string;
//   uuid: string;
// }

export interface IKakaoMembersData {
  allowed_msg: boolean;
  favorite: boolean;
  id: number;
  profile_nickname: string;
  profile_thumbnail_image: string;
  uuid: string;
}

export const members = atom({
  key: 'members',
  default: initialData,
});
