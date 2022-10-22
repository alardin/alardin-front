import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TRecordTime from '../../components/templates/record/TRecordTime';
import TRecordCount from '../../components/templates/record/TRecordCount';
import theme from '../../theme/theme';

export type RootRecordParamList = {
  Time: undefined;
  Count: undefined;
};

const Tab = createMaterialTopTabNavigator<RootRecordParamList>();

const RecordNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Time"
      screenOptions={{
        tabBarAllowFontScaling: true,
        tabBarInactiveTintColor: theme.color.gray_500,
        tabBarActiveTintColor: theme.color.gray_900,
        tabBarIndicatorStyle: { backgroundColor: theme.color.gray_900 },
        tabBarLabelStyle: { fontSize: 15 },
      }}>
      <Tab.Screen
        name="Time"
        component={TRecordTime}
        options={{ title: '시간별 기록' }}
      />
      <Tab.Screen
        name="Count"
        component={TRecordCount}
        options={{ title: '횟수별 기록' }}
      />
    </Tab.Navigator>
  );
};

export default RecordNavigation;
