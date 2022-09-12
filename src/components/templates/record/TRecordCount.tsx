import React from 'react';
import RecCountList, {
  IRecCountDataType,
} from '../../organisms/record/count/RecCountList';

const TRecordCount = () => {
  const exampleTimeData: IRecCountDataType[] = [
    {
      thumbnail_image_url: '',
      nickname: '홍길동',
      success_count: 4,
      fail_count: 6,
      created_at: new Date().toISOString(),
    },
    {
      thumbnail_image_url: '',
      nickname: '김철수',
      success_count: 11,
      fail_count: 6,
      created_at: new Date().toISOString(),
    },
    {
      thumbnail_image_url: '',
      nickname: '이상혁',
      success_count: 130,
      fail_count: 59,
      created_at: new Date().toISOString(),
    },
  ];
  return <RecCountList data={exampleTimeData} />;
};

export default TRecordCount;
