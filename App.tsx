/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';

import React from 'react';

// import type {PropsWithChildren} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BottomTabs from '@navigation/bottom-tab';
// import AppNavigator from './src/navigation/AppNavigator';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
