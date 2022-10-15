/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect, useState } from 'react';
import { IAlarmInfoData } from '../recoil/home/alarmList';
import { alarmItemtoDate } from '../utils/home/convertDateTime';

const useNextAlarm = (alarmData: IAlarmInfoData[]) => {
  const [data, setData] = useState<IAlarmInfoData>({
    id: 0,
    time: '',
    is_repeated: '',
    is_private: false,
    music_volume: 0,
    max_member: 0,
    Game: { id: 0, name: '', thumbnail_url: '' },
    Host: { id: 0, nickname: '', thumbnail_image_url: '' },
    Host_id: 0,
    Members: [],
    music_name: '',
    created_at: '',
    name: '',
  });

  useEffect(() => {
    const checkDate = alarmData.map(alarm => {
      const { is_repeated, time } = alarm;
      return alarmItemtoDate({ is_repeated, time: String(time) });
    });

    const sortedArr = checkDate
      .sort((a, b) => Number(a) - Number(b))
      .filter(alarm => new Date(Date.now()) < alarm)
      .map(date => {
        const num = checkDate.indexOf(date);
        return alarmData[num];
      });

    setData(sortedArr[0]);
  }, [alarmData]);
  return data;
};

export default useNextAlarm;
