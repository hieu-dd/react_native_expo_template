import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAppKit } from '@reown/appkit-wagmi-react-native';
import useLoadingStore from '@/stores/loadingStore';
import { useHomeStore } from './stores/homeStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '@/constants/colors';

type RootStackParamList = {
  Home: undefined;
  Secondary: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { open } = useAppKit();
  const { setLoading } = useLoadingStore();
  const { data, filter, updateFilter, isLoading } = useHomeStore();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('greeting')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_filter')}
        value={filter}
        onChangeText={updateFilter}
      />
      {isLoading ? (
        <Text>{t('loading')}</Text>
      ) : (
        <Text>
          {t('results')}: {data?.join(', ') || t('no_results')}
        </Text>
      )}
      <Button
        title={t('connect_wallet')}
        onPress={() => {
          open();
        }}
      />
      <Button title={t('disconnect_wallet')} onPress={() => setLoading(true)} />
      <Button
        title={t('go_to_secondary')}
        onPress={() => navigation.navigate('Secondary')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderColor: Colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
