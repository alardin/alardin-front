import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../atoms/container/Container';
import Text from '../atoms/text/Text';

const Home = () => {
  return (
    <SafeAreaView>
      <Container>
        <Text textType="title" options="bold">
          Hello Home!
        </Text>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
