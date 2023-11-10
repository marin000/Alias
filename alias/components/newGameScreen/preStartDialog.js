import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { newGame } from '../../constants/newGameScreen';
import { globalStyles } from '../../styles/global';
import CustomDialogHeader from '../customDialogHeader';

export default function PreStartDialog({ isVisible, onClose, startGame, language, currentTeam }) {
  const { team, explains } = playGame;
  const { score, startGameButton } = newGame;
  const playerExplains = currentTeam.players.find((player) => player.explains);

  const handleStartGame = () => {
    startGame();
  }

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible}>
      <CustomDialogHeader onClose={onClose}/>
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
        color='#439946'
        onPress={handleStartGame}
        buttonStyle={globalStyles.smallRoundButton}
      />
    </Dialog>
  );
}