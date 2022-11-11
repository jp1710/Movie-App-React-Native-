import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Tv from '../screens/Tv';
import Profile from '../screens/Profile';
import NewListMovie from '../screens/NewListMovie';
import {COLORS, icons} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabIcon} from '../components';
import PopListMovie from '../screens/PopListMovie';
import NewListTv from '../screens/NewListTv';
import PopListTv from '../screens/PopListTv';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.black,
          borderTopColor: 'transparent',
          height: 80,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: false,
          headerLeft: null,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: false,
          headerLeft: null,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.play_button} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: false,
          headerLeft: null,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
