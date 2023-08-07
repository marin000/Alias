import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { globalStyles } from '../../styles/global';

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
          color='success'
          onPress={handleNextButton}
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