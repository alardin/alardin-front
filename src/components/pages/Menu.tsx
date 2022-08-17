import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigation/stack/StackNavigation';
import Button from '../atoms/button/Button';
import Container from '../atoms/container/Container';
import Text from '../atoms/text/Text';

export type CallScreenProps = StackNavigationProp<
  RootStackParamList,
  'CallScreen'
>;

const Menu = () => {
  const navigation = useNavigation<CallScreenProps>();
  const handlePress = () => {
    navigation.navigate('CallScreen');
  };
  return (
    <SafeAreaView>
      <Container>
        <Text textType="title" options="bold">
          Hello Menu!
        </Text>
        <Button
          width="100%"
          height="48px"
          colorName="black"
          center
          onPress={handlePress}>
          Navigate to CallScreen
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default Menu;
