import { atom } from 'recoil';

export const initialSummaryData = {
  host_id: 0,
  is_repeated: '0',
  time: '',
  game: '',
  is_private: false,
  player: '',
};

export interface ISummaryData {
  host_id: number;
  is_repeated: string;
  time: string;
  game: string;
  is_private: boolean;
  player: string;
  type?: string;
}

export const summaryData = atom<ISummaryData>({
  key: 'summaryData',
  default: initialSummaryData,
});
