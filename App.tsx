import React from 'react';
import { NavigationIndependentTree } from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';
import '@/i18n/config';
import WalletConnectProvider from '@/providers/WalletConnectProvider';

export default function App() {
  return (
    <WalletConnectProvider>
      <NavigationIndependentTree>
        <AppNavigator />
      </NavigationIndependentTree>
    </WalletConnectProvider>
  );
}
