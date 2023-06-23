import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../utils/helper';
import { newGame } from '../constants';

export default function EditTeamDialog({ gameStarted, isVisible, onClose, teams, selectedTeam, language, onDeleteTeam, onUpdateTeam }) {
  const { teamInput, playerInput, buttonSaveTeam, buttonAddPlayer, buttonDelete } = newGame;

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Formik
          initialValues={{
            teamName: selectedTeam ? selectedTeam.name : '',
            players: selectedTeam ? selectedTeam.players.map(player => { return player.name }) : []
          }}
          onSubmit={(values) => {
            const tempTeams = teams.filter(team => team.name !== selectedTeam.name);

            if (!validateTeamInput(tempTeams, values, language)) {
              return;
            }
            const playersArray = values.players
              .filter(player => player.length > 0)
              .map(player => {
                return {
                  name: player,
                  score: 0,
                  explains: false
                }
              });
            const updatedTeam = {
              id: selectedTeam.id,
              name: values.teamName,
              players: playersArray,
              score: 0,
              explains: false
            }
            onUpdateTeam(updatedTeam);
            onClose();
          }}
        >
          {(props) => (
            <View>
              {props.values.teamName ? (
                <Text style={gameStarted ? styles.labelNonEditable : styles.label}>{teamInput[language]}</Text>
              ) : null}
              <TextInput
                style={gameStarted ? styles.teamInputNonEditable : styles.teamInput}
                placeholder={props.values.teamName}
                onChangeText={props.handleChange('teamName')}
                value={props.values.teamName}
                editable={!gameStarted}
              />
              {props.values.players.map((player, index) => (
                <View key={index}>
                  <Text style={gameStarted ? styles.labelNonEditable : styles.label}>{`${playerInput[language]} ${index + 1}`}</Text>
                  <TextInput
                    style={gameStarted ? styles.playerInputNonEditable : styles.playerInput}
                    placeholder={player}
                    onChangeText={props.handleChange(`players.${index}`)}
                    value={player}
                    editable={!gameStarted}
                  />
                </View>
              ))}
              {
                !gameStarted &&
                <View style={styles.buttonsAddResetContainer}>
                  <Button
                    containerStyle={styles.buttonAdd}
                    title={buttonAddPlayer[language]}
                    color='primary'
                    onPress={() => {
                      props.setFieldValue(`players.${props.values.players.length}`, '');
                    }}
                  />
                  <Button
                    containerStyle={styles.buttonResetDel}
                    title={buttonDelete[language]}
                    color='error'
                    onPress={() => onDeleteTeam()}
                  />
                </View>
              }
              {
                !gameStarted &&
                <Button
                  containerStyle={styles.buttonSaveTeam}
                  title={buttonSaveTeam[language]}
                  color='success'
                  onPress={props.handleSubmit}
                />
              }
            </View>
          )}
        </Formik>
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  labelNonEditable: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  teamInput: {
    borderWidth: 4,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 18
  },
  teamInputNonEditable: {
    borderWidth: 4,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 18,
    color: 'black'
  },
  playerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 7
  },
  playerInputNonEditable: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 7,
    color: 'black'
  },
  buttonsAddResetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAdd: {
    flex: 1,
    marginRight: 10
  },
  buttonResetDel: {
    flex: 1,
  },
  buttonSaveTeam: {
    marginTop: 15
  }
});