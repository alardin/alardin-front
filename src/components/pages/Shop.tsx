import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootBottomParamList } from '../../navigation/NavigationData';
import Container from '../atoms/container/Container';
import TShop from '../templates/shop/TShop';

const Shop = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any, any>>();
  return (
    <SafeAreaView>
      <Container>
        <TShop navigation={navigation} />
      </Container>
    </SafeAreaView>
  );
};

export default Shop;
