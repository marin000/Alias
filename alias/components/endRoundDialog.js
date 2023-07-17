import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, CheckBox } from '@rneui/themed';
import { playGame } from '../constants';

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
        <Text style={styles.dialogTitle}>{team[language]}: {currentTeam.name}</Text>
        <View style={styles.checkboxesContainer}>
          {renderCheckboxes()}
        </View>

        <View style={styles.dialogAnswers}>
          <View style={styles.dialogCorrect}>
            <Text style={styles.answersText}>{correctAnswersTxt[language]}: {countSelectedAndUnselectedWords().selectedCount}</Text>
          </View>
          <View style={styles.dialogSkipped}>
            <Text style={styles.answersText}>{skippedAnswersTxt[language]}: {countSelectedAndUnselectedWords().unselectedCount}</Text>
          </View>
        </View>
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
    marginBottom: 10,
    marginTop: 20
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