import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../utils/helper';
import { newGame } from '../constants';

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
            const newTeam = {
              name: values.teamName,
              players: values.players,
              score: 0
            };

            onAddTeam(newTeam);
            onClose();
          }}
        >
          {(props) => (
            <View>
              {props.values.teamName ? (
                <Text style={styles.label}>{teamInput[language]}</Text>
              ) : null}
              <TextInput
                style={styles.teamInput}
                placeholder={teamInput[language]}
                onChangeText={props.handleChange('teamName')}
                value={props.values.teamName}
              />
              {props.values.players.map((player, index) => (
                <TextInput
                  key={index}
                  style={styles.playerInput}
                  placeholder={`${playerInput[language]} ${index + 1}`}
                  onChangeText={props.handleChange(`players.${index}`)}
                  value={player}
                />
              ))}
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
                  title={buttonReset[language]}
                  color='error'
                  onPress={props.handleReset}
                />
              </View>
              <Button
                containerStyle={styles.buttonSaveTeam}
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

const styles = StyleSheet.create({
  teamInput: {
    borderWidth: 4,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 18
  },
  playerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 7
  },
  buttonSaveTeam: {
    marginTop: 15
  },
  buttonAdd: {
    flex: 1,
    marginRight: 10
  },
  buttonResetDel: {
    flex: 1,
  },
  buttonsAddResetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});