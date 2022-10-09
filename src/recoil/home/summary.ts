/* eslint-disable @typescript-eslint/naming-convention */

import { atom } from 'recoil';

export const initialSummaryData = {
  id: 0,
  is_repeated: '0',
  time: '',
  Game_id: '',
  is_private: false,
  player: '',
};

export interface ISummaryData {
  id: number | string;
  is_repeated: string;
  time: string | undefined;
  Game_id: string;
  is_private: boolean;
  player: string;
  type?: string;
  name?: string;
}

export const summaryData = atom<ISummaryData>({
  key: 'summaryData',
  default: initialSummaryData,
});
