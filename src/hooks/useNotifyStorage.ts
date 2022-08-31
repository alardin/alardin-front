import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INotifyDataType } from '../components/organisms/notify/NotifyList';

const useNotifyStorage = (newNotify?: INotifyDataType) => {
  const [data, setData] = useState<INotifyDataType[]>([]);

  const storageRefesh = useCallback(async () => {
    console.log('test');
    const storageJson = await AsyncStorage.getItem('notifyStorage');
    if (storageJson) {
      const storage = JSON.parse(storageJson);
      setData(storage);
    }
  }, []);

  useEffect(() => {
    if (newNotify) {
      storageRefesh();
      setData(prevState => [...prevState, newNotify]);
      AsyncStorage.setItem('notifyStorage', JSON.stringify(data));
    }
  }, [newNotify]);

  useEffect(() => {
    storageRefesh();
  }, []);

  return data;
};

export default useNotifyStorage;
