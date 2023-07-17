import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../utils/helper';
import { newGame } from '../constants';
import shortid from 'shortid';
import { globalStyles } from '../styles/global';

export default function AddTeamDialog({ isVisible, onClose, teams, language, onAddTeam }) {
  const { teamInput, playerInput, buttonSaveTeam, buttonAddPlayer, buttonReset } = newGame;

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Formik
          initialValues={{ teamName: '', players: [] }}
          onSubmit={(values) => {
            if (!validateTeamInput(teams, values, language)) {
              return;
            }
            const playersArray = values.players
              .filter(player => player.length > 0)
              .map((player, index) => {
                return {
                  name: player,
                  score: 0,
                  explains: index === 0 ? true : false
                }
              });
            const newTeam = {
              id: shortid.generate(),
              name: values.teamName,
              players: playersArray,
              score: 0,
            };

            onAddTeam(newTeam);
            onClose();
          }}
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