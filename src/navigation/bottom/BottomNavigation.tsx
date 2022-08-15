import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../theme/theme';
import Home from '../../components/pages/Home';
import Record from '../../components/pages/Record';
import Shop from '../../components/pages/Shop';
import Notify from '../../components/pages/Notify';
import Menu from '../../components/pages/Menu';

export type RootBottomParamList = {
  Home: undefined;
  Record: undefined;
  Shop: undefined;
  Notify: undefined;
  Menu: undefined;
};

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.color.black,
        },
        tabBarActiveTintColor: theme.color.black,
        tabBarInactiveTintColor: theme.color.white,
        tabBarActiveBackgroundColor: theme.color.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={Record}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="clipboard-list" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Notify"
        component={Notify}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bars" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
