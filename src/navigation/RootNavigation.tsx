import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { RootStackParamList } from './stack/StackNavigation';

interface IRootNavigationProps {
  name: keyof RootStackParamList;
  params: any;
}

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();
export const navigate = ({ name, params }: IRootNavigationProps) => {
  navigationRef.current?.navigate(name, params);
};
