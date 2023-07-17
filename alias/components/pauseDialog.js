import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../constants';

export default function PauseDialog({ isVisible, onClose, language, currentTeam, correctAnswers, skippedAnswers }) {
  const { correctAnswersTxt, skippedAnswersTxt, team, dialogContinueButton } = playGame;

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
            <Text style={styles.answersText}>{correctAnswersTxt[language]}: {correctAnswers}</Text>
          </View>
          <View style={styles.dialogSkipped}>
            <Text style={styles.answersText}>{skippedAnswersTxt[language]}: {skippedAnswers}</Text>
          </View>
        </View>
        <Button
          containerStyle={styles.dialogButton}
          title={dialogContinueButton[language]}
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
    alignItems: 'center'
  },
  dialogSkipped: {
    flex: 1,
    alignItems: 'center'
  },
  answersText: {
    fontWeight: 'bold'
  },
  dialogButton: {
    alignSelf: 'center',
    marginTop: 20,
    width: 120,
    height: 60
  }
});