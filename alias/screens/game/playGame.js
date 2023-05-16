import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, ListItem, Button } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
// import { newGame } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';

export default function PlayGame({ navigation }) {
  const { language, timer, maxScore } = useContext(SettingsContext);
  let gameWordList = [];
  const teams = navigation.getParam('teams');

  if (language === 'hr') {
    gameWordList = require('../../assets/words/hr.json');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});