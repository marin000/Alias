import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { newGame } from '../constants';
import { shufflePlayers, isValidNumberOfTeams, createRandomTeams } from '../utils/helper';
import { globalStyles } from '../styles/global';

export default function RandomTeamDialog({ isVisible, onClose, language, onAddAllTeams }) {
  const { playerInput, numberOfTeamsTxt, buttonGenerateRandom, buttonAddPlayer, buttonReset, buttonSaveTeam } = newGame;
  const [showTeamsDialog, setShowTeamsDialog] = useState(false);
  const [randomTeams, setRandomTeams] = useState([]);

  const handleGenerateRandomTeans = (values) => {
    const playersArray = values.players
      .filter(player => player.length > 0);
    const shuffledPLayers = shufflePlayers(playersArray);
    const numericInput = values.numberOfTeams.replace(/[^0-9]/g, '');
    const teamNumberValue = parseInt(numericInput, 10);
    if (!isValidNumberOfTeams(shuffledPLayers.length, teamNumberValue, language)) {
      return;
    }
    const newRandomTeams = createRandomTeams(shuffledPLayers, teamNumberValue, language);
    setRandomTeams(newRandomTeams);
    setShowTeamsDialog(true);
  }

  const handleSaveNewTeams = () => {
    setShowTeamsDialog(false);
    onAddAllTeams(randomTeams);
    onClose();
  }

  const handleCreateNewTeamsAgain = () => {
    setRandomTeams([]);
    setShowTeamsDialog(false);
  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        {!showTeamsDialog ?
          <Formik
            initialValues={{ numberOfTeams: '', players: [] }}
            onSubmit={handleGenerateRandomTeans}
          >
            {(props) => (
              <View>
                {props.values.numberOfTeams ? (
                  <Text style={globalStyles.label}>{numberOfTeamsTxt[language]}</Text>
                ) : null}
                <TextInput
                  style={globalStyles.teamInput}
                  keyboardType='numeric'
                  placeholder={numberOfTeamsTxt[language]}
                  onChangeText={props.handleChange('numberOfTeams')}
                  value={props.values.numberOfTeams}
                  maxLength={2}
                />
                {props.values.players.map((player, index) => (
                  <TextInput
                    key={index}
                    style={globalStyles.playerInput}
                    placeholder={`${playerInput[language]} ${index + 1}`}
                    onChangeText={props.handleChange(`players.${index}`)}
                    value={player}
                  />
                ))}
                <View style={globalStyles.buttonsAddResetContainer}>
                  <Button
                    containerStyle={globalStyles.buttonAdd}
                    title={buttonAddPlayer[language]}
                    color='primary'
                    onPress={() => {
                      props.setFieldValue(`players.${props.values.players.length}`, '');
                    }}
                  />
                  <Button
                    containerStyle={globalStyles.buttonResetDel}
                    title={buttonReset[language]}
                    color='error'
                    onPress={props.handleReset}
                  />
                </View>
                <Button
                  containerStyle={globalStyles.buttonSaveTeam}
                  title={buttonGenerateRandom[language]}
                  color='success'
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
          : <View>
            {randomTeams.map((team, index) => (
              <View key={index} style={styles.teamContainer}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.playerNames}>
                  {team.players.map((player) => player.name).join(',  ')}
                </Text>
              </View>
            ))}
            <View style={globalStyles.buttonsAddResetContainer}>
              <Button
                containerStyle={globalStyles.buttonAdd}
                title={buttonSaveTeam[language]}
                color='success'
                onPress={handleSaveNewTeams}
              />
              <Button
                containerStyle={globalStyles.buttonResetDel}
                title={buttonReset[language]}
                color='error'
                onPress={handleCreateNewTeamsAgain}
              />
            </View>
          </View>
        }
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  teamContainer: {
    marginBottom: 15
  },
  teamName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  playerNames: {
    textAlign: 'center',
    fontSize: 16
  }
});