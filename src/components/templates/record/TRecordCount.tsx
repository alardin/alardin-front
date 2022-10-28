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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IRecCountItem[]>([]);

  useEffect(() => {
    setLoading(true);
    alardinApi.get('/users/history-count').then(res => {
      console.log('count data');
      console.log(res.data.data);
      setData(res.data.data);
      setLoading(false);
    });
    return () => setData([]);
  }, []);

  return <RecCountList {...{ loading, data, setLoading, setData }} />;
};

export default TRecordCount;
