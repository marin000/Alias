import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../../utils/helper';
import { newGame } from '../../constants/newGameScreen';
import shortid from 'shortid';
import { globalStyles } from '../../styles/global';
import { Icon } from '@rneui/base';
import CustomDialogHeader from '../customDialogHeader';

export default function AddTeamDialog({ isVisible, onClose, teams, language, onAddTeam, userData }) {
  const { teamInput, playerInput, buttonSaveTeam, buttonAddPlayer } = newGame;

  const handleAddNewTeam = (values) => {
    if (!validateTeamInput(teams, values, language)) {
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
    const newTeam = {
      id: shortid.generate(),
      name: values.teamName,
      players: playersArray,
      score: 0,
      myTeam: userData?.name === playersArray[0]?.name
    };

    if (userData && teams.length === 0) {
      newTeam.players[0].loggedIn = true;
    }

    onAddTeam(newTeam);
    onClose();
  }

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible} onBackdropPress={onClose}>
      <CustomDialogHeader onClose={onClose} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Formik
          initialValues={{ teamName: '', players: userData && teams.length === 0 ? [userData.name] : [] }}
          onSubmit={handleAddNewTeam}
        >
          {(props) => (
            <View>
              {props.values.teamName ? (
                <Text style={globalStyles.label}>{teamInput[language]}</Text>
              ) : null}
              <TextInput
                style={globalStyles.teamInput}
                placeholder={teamInput[language]}
                onChangeText={props.handleChange('teamName')}
                value={props.values.teamName}
              />
              {props.values.players.map((player, index) => (
                <TextInput
                  key={index}
                  style={globalStyles.playerInput}
                  placeholder={`${playerInput[language]} ${index + 1}`}
                  onChangeText={props.handleChange(`players.${index}`)}
                  value={player}
                  editable={!(index === 0 && userData && teams.length === 0)}
                  autoFocus={true}
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
                title={buttonSaveTeam[language]}
                onPress={props.handleSubmit}
                buttonStyle={globalStyles.smallRoundButton}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </Dialog>
  );
}