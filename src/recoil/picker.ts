import { atom, selector } from 'recoil';
import alardinApi from '../utils/alardinApi';

interface IGameMetaType {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  thumbnail_url: string;
  rating: number;
  min_player: number;
  max_player: number;
  keyword_count: number;
}

export const pickerMetaData = [
  {
    type: 'music',
    data: [
      { label: '기본', value: 'default' },
      { label: '바닷 소리', value: 'beach' },
      { label: '강아지 소리', value: 'dog' },
      { label: '고양이 소리', value: 'cat' },
    ],
  },
  {
    type: 'game',
    data: [
      { label: '연산 맞추기', value: 'calculate' },
      { label: '그림 맞추기', value: 'picture' },
    ],
  },
  {
    type: 'is_repeated',
    data: [
      { label: '아니요', value: 'no' },
      { label: '예', value: 'yes' },
    ],
  },
];

export interface IPickerData {
  label: string;
  value: string;
}

export interface IPickerObject {
  type: string;
  data: IPickerData[];
}

export const pickerMode = atom<string>({
  key: 'pickerMode',
  default: '',
});

export const pickerList = selector<IPickerObject>({
  key: 'pickerList',
  get: async ({ get }) => {
    const mode = get(pickerMode);

    switch (mode) {
      case 'music':
        return pickerMetaData[0];
      case 'game':
        const response = await alardinApi.get('/game', {
          params: { skip: 0, take: 100 },
        });
        const dataList = response.data.data;
        console.log(dataList);
        const data = dataList.map(({ name, id }: IGameMetaType) => ({
          label: name,
          value: id,
        }));

        return { type: 'game', data };
      case 'is_repeated':
        return pickerMetaData[2];
      default:
        return { type: '', data: [] };
    }
  },
});