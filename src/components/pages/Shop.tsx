import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../atoms/container/Container';
import TShop from '../templates/shop/TShop';

const Shop = () => (
  <SafeAreaView>
    <Container>
      <TShop />
    </Container>
  </SafeAreaView>
);

export default Shop;
