import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeIcon,
  SearchIcon,
  ShoppingBag,
  TrendingUp,
  UserIcon,
} from 'lucide-react-native';
import {Home, Order, Profile, Trend} from '@screens/index';
import SearchStack from './search-screen-stack';

const Tab = createBottomTabNavigator();

// Define the tabBarIcon components outside the BottomTabs component
const HomeTabIcon = ({color}: {color: string}) => <HomeIcon color={color} />;
const SearchTabIcon = ({color}: {color: string}) => (
  <SearchIcon color={color} />
);
const TrendTabIcon = ({color}: {color: string}) => <TrendingUp color={color} />;
const OrderTabIcon = ({color}: {color: string}) => (
  <ShoppingBag color={color} />
);
const ProfileTabIcon = ({color}: {color: string}) => <UserIcon color={color} />;

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00A651',
        tabBarInactiveTintColor: '#9E9E9E',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: SearchTabIcon,
        }}
      />
      <Tab.Screen
        name="Trend"
        component={Trend}
        options={{
          tabBarIcon: TrendTabIcon,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: OrderTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
