import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Text, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../../utils/helper';
import { newGame } from '../../constants/newGameScreen';
import { globalStyles } from '../../styles/global';
import CustomDialogHeader from '../customDialogHeader';

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
      myTeam: selectedTeam.myTeam
    }
    onUpdateTeam(updatedTeam);
    onClose();
  }

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible} onBackdropPress={onClose}>
      <CustomDialogHeader onClose={onClose} />
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
                {!myTeamEditing &&
                  <Button
                    containerStyle={globalStyles.buttonAdd}
                    type='outline'
                    title={buttonAddPlayer[language]}
                    onPress={() => {
                      props.setFieldValue(`players.${props.values.players.length}`, '');
                    }}
                    buttonStyle={globalStyles.smallRoundButton}
                  />}
                <Button
                  containerStyle={globalStyles.buttonResetDel}
                  type='outline'
                  title={buttonDelete[language]}
                  onPress={() => onDeleteTeam()}
                  buttonStyle={{...globalStyles.smallRoundButton, borderColor: 'red'}}
                  titleStyle={{color: 'red'}}
                />
              </View>
              {!myTeamEditing &&
                <Button
                  containerStyle={globalStyles.buttonSaveTeam}
                  title={buttonSaveTeam[language]}
                  onPress={props.handleSubmit}
                  buttonStyle={globalStyles.smallRoundButton}
                />
              }
            </View>
          )}
        </Formik>
      </ScrollView>
    </Dialog>
  );
}