import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, CheckBox } from '@rneui/themed';
import { playGame } from '../constants/playGameScreen';
import { globalStyles } from '../styles/global';

export default function EndRoundDialog({ isVisible, onClose, language, currentTeam, gameTimer, currentRoundWords, skippedWords }) {
  const { correctAnswersTxt, skippedAnswersTxt, team, dialogNextButton, dialogContinueButton } = playGame;
  const [selectedWords, setSelectedWords] = useState([]);
  const initialSelectedWords = currentRoundWords.map((word) => ({
    [word.toString()]: !skippedWords.includes(word)
  }));

  const handleNextButton = () => {
    const { selectedCount, unselectedCount } = countSelectedAndUnselectedWords();
    onClose(selectedCount, unselectedCount);
  }

  const handleCheckboxToggle = (word) => {
    const wordsToUpdate = selectedWords.length > 0 ? selectedWords : initialSelectedWords;
    setSelectedWords(
      wordsToUpdate.map((wordObj) => {
        const wordKey = Object.keys(wordObj)[0];
        if (wordKey === word) {
          const currentValue = wordObj[wordKey];
          return { [wordKey]: !currentValue };
        }
        return wordObj;
      }))
  };

  const renderCheckboxes = () => {
    const wordsToRender = selectedWords.length > 0 ? selectedWords : initialSelectedWords;

    return wordsToRender.map((word, index) => {
      const wordKey = Object.keys(word)[0];
      const isChecked = word[wordKey];
      return (
        <View key={index} style={styles.checkboxText}>
          <View>
            <CheckBox
              checked={isChecked}
              onPress={() => handleCheckboxToggle(wordKey)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
            />
          </View>
          <Text>{wordKey}</Text>
        </View>
      );
    });
  };

  const countSelectedAndUnselectedWords = () => {
    const wordsToCalculate = selectedWords.length > 0 ? selectedWords : initialSelectedWords;
    let selectedCount = 0, unselectedCount = 0;

    wordsToCalculate.forEach((wordObj) => {
      Object.values(wordObj)[0] ? (selectedCount += 1) : (unselectedCount += 1);
    });
    return { selectedCount, unselectedCount };
  };

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
        <View style={styles.checkboxesContainer}>
          {renderCheckboxes()}
        </View>

        <View style={styles.dialogContentContainer}>
          <View style={globalStyles.dialogAnswersContainer}>
            <Text style={globalStyles.dialogAnswersText}>{correctAnswersTxt[language]}: {countSelectedAndUnselectedWords().selectedCount}</Text>
          </View>
          <View style={globalStyles.dialogAnswersContainer}>
            <Text style={globalStyles.dialogAnswersText}>{skippedAnswersTxt[language]}: {countSelectedAndUnselectedWords().unselectedCount}</Text>
          </View>
        </View>
        <Button
          containerStyle={globalStyles.dialogButton}
          title={gameTimer > 0 ? dialogContinueButton[language] : dialogNextButton[language]}
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
    marginBottom: 10,
    marginTop: 20
  },
  checkboxesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
    marginLeft: -20
  },
  checkboxText: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});