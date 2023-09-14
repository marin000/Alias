import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { newGame } from '../../constants/newGameScreen';
import { globalStyles } from '../../styles/global';
import cupImage from '../../assets/cup.jpeg';
import CustomDialogHeader from '../customDialogHeader';
import { Icon } from '@rneui/base';

export default function WinnerDialog({ isVisible, onClose, handleRateGame, language, winnerTeam }) {
  const { closeButton } = newGame;
  const { winner, finalScore, rateGame } = playGame;

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible}>
      <CustomDialogHeader onClose={onClose} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={globalStyles.dialogTitle}>{winner[language]} {winnerTeam.name}</Text>
            <Text style={styles.scoreText}>{finalScore[language]}: {winnerTeam.score}</Text>
          </View>
          <Image source={cupImage} style={styles.cupImage} />
        </View>
        <Button
          containerStyle={styles.dialogButton}
          title={closeButton[language]}
          onPress={onClose}
          buttonStyle={globalStyles.roundButton}
        />
        <Button
          containerStyle={styles.ratingDialogButton}
          type='outline'
          title={rateGame[language]}
          onPress={handleRateGame}
          buttonStyle={globalStyles.roundButton}
          icon={
            <Icon
              name="star-shooting"
              type="material-community"
              size={24}
              style={globalStyles.addPlayerIcon}
              color='#2089dc'
            />
          }
        />
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  infoContainer: {
    flex: 1
  },
  scoreText: {
    fontSize: 17
  },
  cupImage: {
    width: 70,
    height: 70
  },
  dialogButton: {
    ...globalStyles.dialogButton,
    width: 200
  },
  ratingDialogButton: {
    ...globalStyles.dialogButton,
    width: 200,
    marginTop: 0
  }
});