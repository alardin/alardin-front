/* eslint-disable @typescript-eslint/naming-convention */

import React, { useEffect, useState } from 'react';
import alardinApi from '../../../utils/alardinApi';
import RecTimeList from '../../organisms/record/time/RecTimeList';

export interface IRecTimeItem {
  created_at: string;
  User_id: number;
  Alarm_result_id: number;
  Alarm_result: {
    start_time: string;
    end_time: string;
    trial: number;
    Game: {
      name: string;
      thumbnail_url: string;
    };
    Alarm: {
      id: number;
      Members: { nickname: string; thumbnail_image_url: string }[];
    };
  };
}

const TRecordTime = () => {
  const [data, setData] = useState<IRecTimeItem[]>([]);

  useEffect(() => {
    alardinApi.get('/users/history').then(res => {
      setData(res.data.data);
    });
    return () => setData([]);
  }, []);

  return <RecTimeList data={data} setData={setData} />;
};

export default TRecordTime;
