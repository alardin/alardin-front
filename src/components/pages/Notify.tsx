import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../atoms/container/Container';
import Text from '../atoms/text/Text';

const Notify = () => (
  <SafeAreaView>
    <Container>
      <Text textType="title" options="bold">
        Hello Notify!
      </Text>
    </Container>
  </SafeAreaView>
);

export default Notify;
