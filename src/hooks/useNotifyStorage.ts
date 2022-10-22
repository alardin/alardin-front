import { useEffect } from 'react';
import { INotifyDataType } from '../components/organisms/notify/NotifyList';
import { useRecoilState } from 'recoil';
import { defaultNotify } from '../recoil/notify/notify';

const useNotifyStorage = (newNotify?: INotifyDataType) => {
  const [data, setData] = useRecoilState(defaultNotify);

  useEffect(() => {
    if (newNotify) {
      setData(prevState => [newNotify, ...prevState]);
    }
  }, [newNotify]);

  return data;
};

export default useNotifyStorage;
