import { useAppKit } from '@reown/appkit-wagmi-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { open } = useAppKit();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('greeting')}</Text>
      <Button
        title={t('connect_wallet')}
        onPress={() => {
          open();
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
