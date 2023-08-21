import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../../utils/helper';
import { newGame } from '../../constants/newGameScreen';
import { globalStyles } from '../../styles/global';

export default function EditTeamDialog({ isVisible, onClose, teams, selectedTeam, myTeamEditing, language, onDeleteTeam, onUpdateTeam, userData }) {
  const { teamInput, playerInput, buttonSaveTeam, buttonAddPlayer, buttonDelete } = newGame;

  const handleEditTeam = (values) => {
    const tempTeams = teams.filter(team => team.name !== selectedTeam.name);

    if (!validateTeamInput(tempTeams, values, language)) {
      return;
    }
    const playersArray = values.players
      .filter(player => player.length > 0)
      .map((player, index) => {
        return {
          name: player,
          scoreExplains: 0,
          scoreGuess: 0,
          explains: index === 0 ? true : false
        }
      });
    const updatedTeam = {
      id: selectedTeam.id,
      name: values.teamName,
      players: playersArray,
      score: 0,
    }
    onUpdateTeam(updatedTeam);
    onClose();
  }

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
          onSubmit={handleEditTeam}
        >
          {(props) => (
            <View>
              {props.values.teamName ? (
                <Text style={globalStyles.label}>{teamInput[language]}</Text>
              ) : null}
              <TextInput
                style={globalStyles.teamInput}
                placeholder={props.values.teamName}
                onChangeText={props.handleChange('teamName')}
                value={props.values.teamName}
                editable={!myTeamEditing}
              />
              {props.values.players.map((player, index) => (
                <View key={index}>
                  <Text style={globalStyles.label}>{`${playerInput[language]} ${index + 1}`}</Text>
                  <TextInput
                    style={globalStyles.playerInput}
                    placeholder={player}
                    onChangeText={props.handleChange(`players.${index}`)}
                    value={player}
                    editable={!myTeamEditing && !(userData?.name === player)}
                  />
                </View>
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
                  title={buttonDelete[language]}
                  color='error'
                  onPress={() => onDeleteTeam()}
                />
              </View>
              <Button
                containerStyle={globalStyles.buttonSaveTeam}
                title={buttonSaveTeam[language]}
                color='success'
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </Dialog>
  );
}