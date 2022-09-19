import React, { useEffect, useState } from 'react';
import alardinApi from '../../../utils/alardinApi';
import RecCountList from '../../organisms/record/count/RecCountList';

export interface IRecCountItem {
  id: number;
  nickname: string;
  thumbnail_image_url: string;
  playCount: number;
  successCount: number;
  failCount: number;
  mateDue: number;
}

const TRecordCount = () => {
  const [data, setData] = useState<IRecCountItem[]>([]);

  useEffect(() => {
    alardinApi.get('/users/history-count').then(res => {
      setData(res.data.data);
    });
    return () => setData([]);
  }, []);

  return <RecCountList data={data} setData={setData} />;
};

export default TRecordCount;
