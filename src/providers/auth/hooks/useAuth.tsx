import { PROVIDER_CHAIN_ID } from '@/config/env';
import { appChains } from '@/providers/WalletConnectProvider';
import { getNonce, login } from '@/service';
import useAuthStore from '@/stores/authStore';
import { useAppKitState } from '@reown/appkit-wagmi-react-native';
import { useAccountEffect, useSignMessage, useSwitchChain } from 'wagmi';

export const WELCOME_MESSAGE = (address: string, nonce: string) =>
  `Welcome to Briky Land!

Click to sign in and accept the Briky Land Terms of Service (https://brikyland.com/tos) and Privacy Policy (https://brikyland.com/privacy).

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
${nonce}`;

export const useAuth = () => {
  const authStore = useAuthStore();
  const { selectedNetworkId } = useAppKitState();
  const { switchChainAsync } = useSwitchChain();
  const { signMessageAsync } = useSignMessage();

  const needSwitchNetwork = !appChains.find(chain => chain.id === selectedNetworkId);

  const handleSwitchNetwork = async () => {
    try {
      const result = await switchChainAsync({ chainId: PROVIDER_CHAIN_ID });
      if (result.id !== PROVIDER_CHAIN_ID) {
        throw new Error(result.name);
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleSignMessage = async (address: string) => {
    try {
      // Get nonce and sign message
      const nonce = await getNonce(address);
      const signature = await signMessageAsync({
        message: WELCOME_MESSAGE(address, nonce),
      });
      const loginResponse = await login(address, nonce, signature);
      authStore.setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('Finish handleSignMessage');
      if (selectedNetworkId !== PROVIDER_CHAIN_ID) {
        await handleSwitchNetwork();
      }
    }
  };

  const onHannelConnect = async (address: string) => {
    if (needSwitchNetwork) {
      const result = await handleSwitchNetwork();
      if (result) {
        console.log('Switch network success');
      } else {
        console.log('Switch network failed');
      }
    } else {
      await handleSignMessage(address);
    }
  };

  useAccountEffect({
    onConnect(data) {
      if (!authStore.isAuthenticated) {
        onHannelConnect(data.address);
      }
      authStore.setAddress(data.address);
    },
    onDisconnect() {
      authStore.setAddress(undefined);
    },
  });
};
