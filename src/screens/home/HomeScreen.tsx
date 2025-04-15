import React from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useAppKit } from "@reown/appkit-wagmi-react-native"
import useLoadingStore from "@/stores/loadingStore"
import { useHomeStore } from "./stores/homeStore"
import Colors from "@/constants/colors"
import { useAppNavigaton } from "@/navigation/AppNavigator"
import useWalletConnect from "@/hooks/useWalletConnect"
import useAuthStore from "@/stores/authStore"

const HomeScreen: React.FC = (): React.ReactElement => {
  const { t } = useTranslation()
  const { connect, disconnect } = useWalletConnect()
  const { data, filter, updateFilter, isLoading, address } = useHomeStore()
  const navigation = useAppNavigaton()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("greeting")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_filter")}
        value={filter}
        onChangeText={updateFilter}
      />
      {isLoading ? (
        <Text>{t("loading")}</Text>
      ) : (
        <Text>
          {t("results")}: {data?.join(", ") || t("no_results")}
        </Text>
      )}
      <Text>{address}</Text>
      <Button title={t("connect_wallet")} onPress={connect} />
      <Button title={t("disconnect_wallet")} onPress={disconnect} />
      <Button title={t("go_to_secondary")} onPress={() => navigation.navigate("Secondary")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderColor: Colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
})

export default HomeScreen
