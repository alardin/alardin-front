import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import TRegisterMates from '../../components/templates/mates/TRegisterMates';
import TRequestMates from '../../components/templates/mates/TRequestMates';
import TUnregisterMates from '../../components/templates/mates/TUnregisterMates';
import { IMembersDataType } from '../../recoil/home/members';
import theme from '../../theme/theme';

export type RootRecordParamList = {
  Register: undefined;
  Unregister: undefined;
  Request: undefined;
};

export interface IMateListDataType {
  kakaoFriends: IMembersDataType[];
  mates: IMembersDataType[];
}

const Tab = createMaterialTopTabNavigator<RootRecordParamList>();

const MatesNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Register"
      screenOptions={{
        tabBarAllowFontScaling: true,
        tabBarInactiveTintColor: theme.color.gray_500,
        tabBarActiveTintColor: theme.color.gray_900,
        tabBarIndicatorStyle: { backgroundColor: theme.color.gray_900 },
        tabBarLabelStyle: { fontSize: 15 },
      }}>
      <Tab.Screen
        name="Register"
        component={TRegisterMates}
        options={{ title: '등록된 메이트' }}
      />
      <Tab.Screen
        name="Unregister"
        component={TUnregisterMates}
        options={{ title: '미동록된 메이트' }}
      />
      <Tab.Screen
        name="Request"
        component={TRequestMates}
        options={{ title: '요청 리스트' }}
      />
    </Tab.Navigator>
  );
};

export default MatesNavigation;
