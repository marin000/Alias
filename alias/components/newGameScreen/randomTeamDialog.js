import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { newGame } from '../../constants/newGameScreen';
import { shufflePlayers, isFormValid, createRandomTeams } from '../../utils/helper';
import { globalStyles } from '../../styles/global';
import CustomDialogHeader from '../customDialogHeader';

export default function RandomTeamDialog({ isVisible, onClose, language, onAddAllTeams, userData }) {
  const { playerInput, numberOfTeamsTxt, buttonGenerateRandom, buttonAddPlayer, buttonReset, buttonSaveTeam } = newGame;
  const [showTeamsDialog, setShowTeamsDialog] = useState(false);
  const [randomTeams, setRandomTeams] = useState([]);

  const handleGenerateRandomTeams = (values) => {
    const playersArray = values.players
      .filter(player => player.length > 0);
    const shuffledPLayers = shufflePlayers(playersArray);
    const numericInput = values.numberOfTeams.replace(/[^0-9]/g, '');
    const teamNumberValue = parseInt(numericInput, 10);
    if (!isFormValid(teamNumberValue, shuffledPLayers, language)) {
      return;
    }
    const newRandomTeams = createRandomTeams(shuffledPLayers, teamNumberValue, userData, language);
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
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible} onBackdropPress={onClose}>
      <CustomDialogHeader onClose={onClose} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        {!showTeamsDialog ?
          <Formik
            initialValues={{ numberOfTeams: '', players: userData ? [userData.name] : [] }}
            onSubmit={handleGenerateRandomTeams}
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
                    editable={!(index === 0 && userData)}
                  />
                ))}
                <Button
                  containerStyle={globalStyles.buttonSaveTeam}
                  type='outline'
                  title={buttonAddPlayer[language]}
                  onPress={() => {
                    props.setFieldValue(`players.${props.values.players.length}`, '');
                  }}
                  buttonStyle={globalStyles.smallRoundButton}
                  icon={
                    <Icon
                      name="account-plus"
                      type="material-community"
                      size={24}
                      style={globalStyles.addPlayerIcon}
                      color='#2089dc'
                    />
                  }
                />
                <Button
                  containerStyle={globalStyles.buttonSaveTeam}
                  title={buttonGenerateRandom[language]}
                  onPress={props.handleSubmit}
                  buttonStyle={globalStyles.smallRoundButton}
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
            <Button
              containerStyle={styles.buttonsSaveReset}
              title={buttonSaveTeam[language]}
              onPress={handleSaveNewTeams}
              buttonStyle={globalStyles.roundButton}
            />
            <Button
              containerStyle={styles.buttonsSaveReset}
              type='outline'
              title={buttonReset[language]}
              onPress={handleCreateNewTeamsAgain}
              buttonStyle={globalStyles.smallRoundButton}
            />
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
  },
  buttonsSaveReset: {
    marginBottom: 15
  }
});