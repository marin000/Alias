import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, Divider } from '@rneui/themed';
import { globalStyles } from '../../styles/global';
import { newGame } from '../../constants/newGameScreen';

export default function PlayersResultDialog({ isVisible, onClose, data, language }) {
  const { teamResults } = data;
  const { explainScore, guessScore } = newGame;
  const [selectedTeam, setSelectedTeam] = useState(teamResults[0]);

  const handleTeamButtonClick = (teamIndex) => {
    setSelectedTeam(teamIndex);
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View>
        <View style={styles.buttonsContainer}>
          {teamResults.map((team, index) => (
            <Button
              key={index}
              containerStyle={styles.button}
              title={team.name}
              onPress={() => handleTeamButtonClick(team)}
              color={selectedTeam.name === team.name ? 'primary' : '#d9d9d9'}
            />
          ))}
        </View>

        {selectedTeam !== null && (
          <View>
            {selectedTeam.players.map((player, index) => (
              <View key={index}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerScore}>{explainScore[language]} {player.scoreExplains}</Text>
                <Text style={styles.playerScore}>{guessScore[language]} {player.scoreGuess}</Text>
                {selectedTeam.players.length - 1 !== index &&
                  <Divider style={globalStyles.profileDivider} />
                }
              </View>
            ))}
          </View>
        )}
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  buttonsContainer: {
    ...globalStyles.buttonsAddResetContainer,
    flexWrap: 'wrap',
    marginBottom: 10
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  playerScore: {
    fontSize: 15,
    marginBottom: 2
  },
  button: {
    ...globalStyles.dialogButton,
    marginTop: -5
  }
});