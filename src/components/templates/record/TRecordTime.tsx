import React from 'react';
import RecTimeList, {
  IRecTimeDataType,
} from '../../organisms/record/time/RecTimeList';

const TRecordTime = () => {
  const exampleTimeData: IRecTimeDataType[] = [
    {
      thumbnail_image_url: '',
      start_time: '09:00:00',
      end_time: '09:04:23',
      nickname: '이상혁',
      game_image_url: '',
    },
    {
      thumbnail_image_url: '',
      start_time: '09:00:00',
      end_time: '09:04:23',
      nickname: '홍길동',
      game_image_url: '',
    },
  ];
  return <RecTimeList data={exampleTimeData} />;
};

export default TRecordTime;
