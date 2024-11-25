import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetails from '@screens/category-details';
import SearchScreen from '@screens/search';
import ProductDetails from '@screens/product-details';

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default SearchStack;
