import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../constants/playGameScreen';
import { newGame } from '../constants/newGameScreen';
import { globalStyles } from '../styles/global';

export default function ShowTeamResultDialog({ isVisible, onClose, language, selectedTeam }) {
  const { team } = playGame;
  const { totalPoints, closeButton } = newGame;
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={globalStyles.dialogTitleContainer}>
        <Text style={globalStyles.dialogTitle}>
          {team[language]}: <Text style={globalStyles.teamName}>{selectedTeam ? selectedTeam.name : ''}</Text>
        </Text>
      </View>
      <View style={globalStyles.dialogScoreContainer}>
        <Text style={globalStyles.dialogScoreText}>{totalPoints[language]} {selectedTeam ? selectedTeam.score : ''}</Text>
      </View>
      {
        selectedTeam ? selectedTeam.players
          .map((player, index) => (
            <View key={index} style={globalStyles.dialogScoreContainer}>
              <Text style={globalStyles.dialogScoreText}>{player.name}: {player.score}</Text>
            </View>
          )) : null
      }
      <Button
        containerStyle={globalStyles.dialogButton}
        title={closeButton[language]}
        color='error'
        onPress={() => onClose()}
      />
    </Dialog>
  );
}