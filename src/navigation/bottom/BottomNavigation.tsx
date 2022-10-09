import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from '../../theme/theme';
import Home from '../../components/pages/Home';
import Record from '../../components/pages/Record';
import Shop from '../../components/pages/Shop';
import Notify from '../../components/pages/Notify';
import Menu from '../../components/pages/Menu';
import { useRecoilValue } from 'recoil';
import { isNotify } from '../../recoil/notify/notify';
import Button from '../../components/atoms/button/Button';

import HomeIcon from '../../assets/icons/ic-home.svg';
import RecordIcon from '../../assets/icons/ic-medal.svg';
import ShopIcon from '../../assets/icons/ic-store.svg';
import NotifyIcon from '../../assets/icons/ic-alarm.svg';
import MenuIcon from '../../assets/icons/ic-menu.svg';
import TrashIcon from '../../assets/icons/ic-trash.svg';
import { Platform, TouchableOpacity } from 'react-native';

export type RootBottomParamList = {
  Home: undefined;
  Record: undefined;
  Shop: undefined;
  Notify: undefined;
  Menu: undefined;
};

const Tab = createBottomTabNavigator<RootBottomParamList>();

const BottomNavigation = () => {
  const checkNotify = useRecoilValue(isNotify);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: Platform.OS === 'ios' ? { height: 100 } : { height: 60 },
        headerLeftContainerStyle: { paddingLeft: 14 },
        headerRightContainerStyle: { paddingRight: 14 },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.color.white,
        },
        tabBarInactiveTintColor: theme.color.gray_500,
        tabBarActiveTintColor: theme.color.gray_900,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: '',
          headerRight: () => (
            <Button
              width="100px"
              height="s"
              options="primary"
              center
              onPress={() => navigation.navigate('Mates')}>
              메이트 추가
            </Button>
          ),
          tabBarIcon: ({ color }) => (
            <HomeIcon width={32} height={32} fill={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Record"
        component={Record}
        options={{
          headerTitle: '알람 기록',
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <RecordIcon width={32} height={32} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          headerTitle: '상점',
          tabBarIcon: ({ color }) => (
            <ShopIcon width={32} height={32} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notify"
        component={Notify}
        options={{
          headerTitle: '알림',
          headerRight: () => (
            <TouchableOpacity>
              <TrashIcon width={26} height={26} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <NotifyIcon width={32} height={32} fill={color} />
          ),
          tabBarBadge: checkNotify ? '1' : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.color.function_error,
            color: 'white',
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitle: '기타',
          tabBarIcon: ({ color }) => (
            <MenuIcon width={32} height={32} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
