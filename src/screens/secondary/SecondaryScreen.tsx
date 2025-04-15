import Colors from "@/constants/colors"
import React from "react"
import { View, StyleSheet, ScrollView, Pressable } from "react-native"

const SecondaryScreen: React.FC = () => {
  const handlePress = (row: number, col: number): void => {
    console.log(`Cell pressed at row: ${row}, col: ${col}`)
  }

  const renderGrid = (): JSX.Element[] => {
    const rows = []
    for (let i = 0; i < 10; i++) {
      const columns = []
      for (let j = 0; j < 10; j++) {
        const isBlack = (i + j) % 2 === 0
        columns.push(
          <Pressable
            key={`${i}-${j}`}
            style={[styles.cell, isBlack ? styles.blackCell : styles.whiteCell]}
            onPress={() => handlePress(i, j)}
          />,
        )
      }
      rows.push(
        <View key={i} style={styles.row}>
          {columns}
        </View>,
      )
    }
    return rows
  }

  return (
    <ScrollView horizontal>
      <ScrollView>
        <View style={styles.container}>{renderGrid()}</View>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  blackCell: {
    backgroundColor: Colors.black,
  },
  cell: {
    height: 120,
    width: 120,
  },
  container: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  whiteCell: {
    backgroundColor: Colors.white,
  },
})

export default SecondaryScreen
