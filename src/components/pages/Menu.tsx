import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../atoms/container/Container';
import TMenu from '../templates/menu/TMenu';

const Menu = () => {
  return (
    <SafeAreaView>
      <Container>
        <TMenu />
      </Container>
    </SafeAreaView>
  );
};

export default Menu;
