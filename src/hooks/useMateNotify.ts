import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INotifyDataType } from '../components/organisms/notify/NotifyList';

const useMateNotify = (newNotify?: INotifyDataType) => {
  const [data, setData] = useState<INotifyDataType[]>([]);

  const storageRefesh = useCallback(async () => {
    const storageJson = await AsyncStorage.getItem('mateRequestStorage');
    if (storageJson) {
      const storage = JSON.parse(storageJson);
      setData(storage);
    }
  }, []);

  useEffect(() => {
    if (newNotify) {
      storageRefesh();
      setData(prevState => [...prevState, newNotify]);
      AsyncStorage.setItem('mateRequestStorage', JSON.stringify(data));
    }
  }, [newNotify]);

  useEffect(() => {
    storageRefesh();
  }, []);

  return data;
};

export default useMateNotify;
