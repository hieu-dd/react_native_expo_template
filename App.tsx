import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationIndependentTree>
        <AppNavigator />
      </NavigationIndependentTree>
    </QueryClientProvider>
  );
}
