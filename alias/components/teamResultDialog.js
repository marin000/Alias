import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../constants';

export default function TeamResultDialog({ isVisible, onClose, language, currentTeam, correctAnswers, skippedAnswers, gameTimer }) {
  const { correctAnswersTxt, skippedAnswersTxt, team, finalScore, dialogNextButton, dialogContinueButton } = playGame;

  const handleNextButton = () => {
    onClose();
  }

  return (
    <Dialog
      isVisible={isVisible}
    >
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Text style={styles.dialogTitle}>{team[language]}: {currentTeam.name}</Text>
        <View style={styles.dialogAnswers}>
          <View style={styles.dialogCorrect}>
            <Text>{correctAnswersTxt[language]}: {correctAnswers}</Text>
          </View>
          <View style={styles.dialogSkipped}>
            <Text>{skippedAnswersTxt[language]}: {skippedAnswers}</Text>
          </View>
        </View>
        <Text>{finalScore[language]}: {correctAnswers - skippedAnswers}</Text>
        <Button
          containerStyle={styles.dialogButton}
          title={gameTimer > 0 ? dialogContinueButton[language] : dialogNextButton[language]}
          color='success'
          onPress={handleNextButton}
        />
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  dialogAnswers: {
    flexDirection: 'row',
    marginBottom: 10
  },
  dialogCorrect: {
    flex: 1,
    marginRight: 5
  },
  dialogSkipped: {
    flex: 1,
    marginLeft: 5
  },
  dialogButton: {
    alignSelf: 'center',
    marginTop: 20,
    width: 120,
    height: 60
  }
});