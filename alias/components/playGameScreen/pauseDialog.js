import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { globalStyles } from '../../styles/global';

export default function PauseDialog({ isVisible, onClose, onExitRound, language, currentTeam, correctAnswers, skippedAnswers }) {
  const { correctAnswersTxt,
    skippedAnswersTxt,
    team,
    dialogContinueButton,
    pauseExitButton,
    pauseAlertConfirmation,
    pauseAlertTxt,
    alertYesTxt,
    alertNoTxt } = playGame;

  const handleNextButton = () => {
    onClose();
  }

  const handleExitRoundButton = () => {
    Alert.alert(
      pauseAlertConfirmation[language],
      pauseAlertTxt[language],
      [
        {
          text: alertNoTxt[language],
          style: 'cancel'
        },
        {
          text: alertYesTxt[language],
          onPress: () => {
            onExitRound();
          },
        },]);
  }

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={globalStyles.dialogTitleContainer}>
          <Text style={globalStyles.dialogTitle}>
            {team[language]}: <Text style={globalStyles.teamName}>{currentTeam.name}</Text>
          </Text>
        </View>
        <View style={styles.dialogContentContainer}>
          <View style={globalStyles.dialogAnswersContainer}>
            <Text style={globalStyles.dialogAnswersText}>{correctAnswersTxt[language]}: {correctAnswers}</Text>
          </View>
          <View style={globalStyles.dialogAnswersContainer}>
            <Text style={globalStyles.dialogAnswersText}>{skippedAnswersTxt[language]}: {skippedAnswers}</Text>
          </View>
        </View>
        <Button
          containerStyle={globalStyles.dialogButton}
          title={dialogContinueButton[language]}
          onPress={handleNextButton}
          buttonStyle={globalStyles.smallRoundButton}
        />
        <Button
          containerStyle={{ ...globalStyles.dialogButton, marginTop: -3 }}
          type='outline'
          title={pauseExitButton[language]}
          onPress={handleExitRoundButton}
          buttonStyle={{ ...globalStyles.smallRoundButton, borderColor: 'red' }}
          titleStyle={{ color: 'red' }}
        />
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogContentContainer: {
    flexDirection: 'row',
    marginBottom: 10
  }
});