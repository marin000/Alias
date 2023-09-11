import React, { useState } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Button, Dialog, Text, Icon, Divider } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { newGame } from '../../constants/newGameScreen';
import { globalStyles } from '../../styles/global';
import CustomDialogHeader from '../customDialogHeader';

export default function ShowTeamResultDialog({ isVisible, onClose, language, selectedTeam }) {
  const { team } = playGame;
  const { totalPoints, closeButton, playerScore, explainScore, guessScore } = newGame;

  const [openPlayerStats, setOpenPlayerStats] = useState({});

  const togglePlayerStats = (playerName) => {
    setOpenPlayerStats((prevOpenPlayerStats) => ({
      ...prevOpenPlayerStats,
      [playerName]: !prevOpenPlayerStats[playerName]
    }));
  };

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible} onBackdropPress={onClose}>
      <CustomDialogHeader onClose={onClose} />
      <View style={globalStyles.dialogTitleContainer}>
        <Text style={globalStyles.dialogTitle}>
          {team[language]}: <Text style={globalStyles.teamName}>{selectedTeam ? selectedTeam.name : ''}</Text>
        </Text>
      </View>
      <View style={globalStyles.dialogScoreContainer}>
        <Text style={globalStyles.dialogScoreText}>{totalPoints[language]} {selectedTeam ? selectedTeam.score : ''}</Text>
      </View>
      {
        selectedTeam ? selectedTeam.players.map((player, index) => (
          <View key={index} style={globalStyles.dialogScoreContainer}>
            <Text style={globalStyles.dialogScoreText}>{player.name}: </Text>
            <TouchableHighlight onPress={() => togglePlayerStats(player.name)} underlayColor="transparent">
              <View>
                <View style={styles.playerScoreContainer}>
                  <Text style={styles.togglePlayerScore}>{playerScore[language]}</Text>
                  <Icon
                    name={openPlayerStats[player.name] ? 'chevron-up' : 'chevron-down'}
                    type="material-community"
                    size={24}
                  />
                </View>
                {openPlayerStats[player.name] && (
                  <View style={styles.scoreContainer}>
                    <Text style={styles.playerScore}>{explainScore[language]} {player.scoreExplains}</Text>
                    <Divider style={globalStyles.profileDivider} />
                    <Text style={styles.playerScore}>{guessScore[language]} {player.scoreGuess}</Text>
                  </View>
                )}
              </View>
            </TouchableHighlight>
          </View>
        )) : null
      }
      <Button
        containerStyle={globalStyles.dialogButton}
        type='outline'
        title={closeButton[language]}
        onPress={() => onClose()}
        buttonStyle={{ ...globalStyles.smallRoundButton, borderColor: 'red' }}
        titleStyle={{ color: 'red' }}
      />
    </Dialog>
  );
}

const styles = StyleSheet.create({
  playerScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  togglePlayerScore: {
    marginLeft: 2
  },
  scoreContainer: {
    marginLeft: 10,
    marginTop: 5
  },
  playerScore: {
    color: 'gray'
  }
});