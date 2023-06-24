import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { playGame, newGame } from '../constants';

export default function ShowTeamResultDialog({ isVisible, onClose, language, selectedTeam }) {
  const { team } = playGame;
  const { totalPoints, closeButton } = newGame;
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.dialogTitle}>{team[language]}: {selectedTeam ? selectedTeam.name : ''}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{totalPoints[language]}</Text><Text>{selectedTeam ? selectedTeam.score : ''}</Text>
      </View>
      {
        selectedTeam ? selectedTeam.players
          .map((player, index) => (
            <View key={index} style={styles.textContainer}>
              <Text style={styles.text}>{player.name}: </Text><Text>{player.score}</Text>
            </View>
          )) : null
      }
      <Button
        containerStyle={styles.dialogButton}
        title={closeButton[language]}
        color='error'
        onPress={() => onClose()}
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