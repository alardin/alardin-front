import { useEffect, useState } from 'react';
import { IAlarmInfoData } from '../recoil/home/alarmList';

const useNextAlarm = (alarmData: IAlarmInfoData[]) => {
  const [data, setData] = useState<IAlarmInfoData>({
    id: 0,
    time: '',
    is_repeated: '',
    is_private: false,
    music_volume: 0,
    max_members: 0,
    Game: { id: 0, name: '', thumbnail_url: '' },
    Members: [],
    music_name: '',
    created_at: '',
    name: '',
  });

  useEffect(() => {
    let result: IAlarmInfoData = { ...alarmData[0] };
    alarmData.forEach(aData => {
      if (result.date === aData.date) {
        const rTime = Date.parse(`Wed, 09 Aug 1995 ${result.time}:00`);
        const aTime = Date.parse(`Wed, 09 Aug 1995 ${aData.time}:00`);
        if (rTime > aTime) result = aData;
      }
      if (result.date > aData.date) result = aData;
    });
    setData(result);
  }, [alarmData]);
  return data;
};

export default useNextAlarm;
