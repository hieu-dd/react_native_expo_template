import { useAppKit } from "@reown/appkit-wagmi-react-native"
import { useDisconnect } from "wagmi"
import { ConnectionUtil } from "@reown/appkit-core-react-native"
const useWalletConnect = () => {
  const { open } = useAppKit()
  const { disconnectAsync } = useDisconnect()

  const connect = async () => {
    await disconnect()
    await open({ view: "Connect" })
  }
  const disconnect = async () => {
    await disconnectAsync()
    await ConnectionUtil.disconnect()
  }
  return {
    connect,
    disconnect,
  }
}

export default useWalletConnect
