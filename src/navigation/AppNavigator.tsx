import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabs from './bottom-tab';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
