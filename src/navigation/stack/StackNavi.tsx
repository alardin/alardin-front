import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import App from '../../App';
import WebScreen from '../../screen/WebScreen';
import Test from '../../Test';

const Stack = createNativeStackNavigator();

const StackNavi = () => {
  return (
    <Stack.Navigator initialRouteName="Test">
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Web" component={WebScreen} />
    </Stack.Navigator>
  );
};

export default StackNavi;
