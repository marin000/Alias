import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { playGame, newGame } from '../constants';
import { globalStyles } from '../styles/global';

export default function PreStartDialog({ isVisible, onClose, startGame, language, currentTeam }) {
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
      <View style={globalStyles.dialogTitleContainer}>
        <Text style={globalStyles.dialogTitle}>
         {team[language]}: <Text style={globalStyles.teamName}>{currentTeam.name}</Text>
        </Text>
      </View>
      <View style={globalStyles.dialogScoreContainer}>
        <Text style={globalStyles.dialogScoreText}>{score[language]} {currentTeam.score}</Text>
      </View>
      <View style={globalStyles.dialogScoreContainer}>
        <Text style={globalStyles.dialogScoreText}>{explains[language]} {playerExplains.name}</Text>
      </View>
      <Button
        containerStyle={globalStyles.dialogButton}
        title={startGameButton[language]}
        color='success'
        onPress={handleStartGame}
      />
    </Dialog>
  );
}