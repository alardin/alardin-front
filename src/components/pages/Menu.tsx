import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../atoms/container/Container';
import Text from '../atoms/text/Text';

const Menu = () => (
  <SafeAreaView>
    <Container>
      <Text textType="title" options="bold">
        Hello Menu!
      </Text>
    </Container>
  </SafeAreaView>
);

export default Menu;
