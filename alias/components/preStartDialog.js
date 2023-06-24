import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { playGame, newGame } from '../constants';

export default function PreStartDialog({ isVisible, onClose,  startGame, language, currentTeam }) {
  const { team, explains } = playGame;
  const { score, startGameButton } = newGame;
  const playerExplains = currentTeam.players.find((player) => player.explains);

  const handleStartGame = () => {
    startGame();
  }

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.dialogTitle}>{team[language]}: {currentTeam.name}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{score[language]}</Text><Text>{currentTeam.score}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{explains[language]}</Text><Text>{playerExplains.name}</Text>
      </View>
      <Button
        containerStyle={styles.dialogButton}
        title={startGameButton[language]}
        color='success'
        onPress={handleStartGame}
      />
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  dialogButton: {
    alignSelf: 'center',
    marginTop: 20,
    width: 120,
    height: 60
  },
  textContainer: {
    paddingTop: 10,
    flexDirection: 'row'
  },  
  text: {
    fontWeight: 'bold',
    paddingRight: 5
  }
});