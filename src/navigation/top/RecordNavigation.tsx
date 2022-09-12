import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TRecordTime from '../../components/templates/record/TRecordTime';
import TRecordCount from '../../components/templates/record/TRecordCount';
import TabBar from '../../components/molecules/other/TabBar';

export type RootRecordParamList = {
  Time: undefined;
  Count: undefined;
};

const Tab = createMaterialTopTabNavigator<RootRecordParamList>();

const RecordNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Time"
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Time" component={TRecordTime} />
      <Tab.Screen name="Count" component={TRecordCount} />
    </Tab.Navigator>
  );
};

export default RecordNavigation;
