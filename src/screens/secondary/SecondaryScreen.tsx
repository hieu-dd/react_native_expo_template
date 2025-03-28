import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';

const SecondaryScreen = () => {
  const handlePress = (row, col) => {
    console.log(`Cell pressed at row: ${row}, col: ${col}`);
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const columns = [];
      for (let j = 0; j < 10; j++) {
        const isBlack = (i + j) % 2 === 0;
        columns.push(
          <Pressable
            key={`${i}-${j}`}
            style={[styles.cell, isBlack ? styles.blackCell : styles.whiteCell]}
            onPress={() => handlePress(i, j)}
          />,
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {columns}
        </View>,
      );
    }
    return rows;
  };

  return (
    <ScrollView horizontal>
      <ScrollView>
        <View style={styles.container}>{renderGrid()}</View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blackCell: {
    backgroundColor: 'black',
  },
  cell: {
    width: 120, // Increased from 40 to 80
    height: 120, // Increased from 40 to 80
  },
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  whiteCell: {
    backgroundColor: 'white',
  },
});

export default SecondaryScreen;
