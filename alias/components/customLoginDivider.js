import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from '@rneui/themed';

export default function LoginDivider({ text }) {
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.text}>{text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'black',
  },
});