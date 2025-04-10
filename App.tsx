import React from 'react';
import { NavigationIndependentTree } from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';
import '@/i18n/config';
import WalletConnectProvider from '@/providers/WalletConnectProvider';
import useLoadingStore from '@/stores/loadingStore';
import Loading from '@/components/common/Loading';
import AuthProvider from '@/providers/auth/AuthProvider';

export default function App() {
  const { isLoading } = useLoadingStore();
  return (
    <WalletConnectProvider>
      <>
        <AuthProvider>
          <NavigationIndependentTree>
            <AppNavigator />
          </NavigationIndependentTree>
        </AuthProvider>
        {isLoading && <Loading />}
      </>
    </WalletConnectProvider>
  );
}
