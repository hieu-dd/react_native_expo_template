import useLoadingStore from '@/stores/loadingStore';
import { useAppKit } from '@reown/appkit-wagmi-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useHomeStore } from './stores/homeStore';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { open } = useAppKit();
  const { setLoading } = useLoadingStore();
  const { data, filter, updateFilter, isLoading } = useHomeStore();

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
      <Button
        title={t('disconnect_wallet')}
        onPress={() => {
          setLoading(true);
        }}
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
    borderColor: '#ccc',
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
