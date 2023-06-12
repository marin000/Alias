import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { Text, ListItem, Button, Dialog } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsContext } from '../../utils/settings';
import { Formik } from 'formik';
import { newGame } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import { TextInput } from 'react-native-gesture-handler';
import { validateTeamInput } from '../../utils/helper';

export default function NewGame({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { title, newTeam, teamInput, playerInput, buttonSaveTeam, buttonAddPlayer, buttonReset, buttonDelete, buttonStart } = newGame;
  const [teams, setTeams] = useState([]);
  const [addTeamDialog, setAddTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTeamDialog, setEditTeamDialog] = useState(false);

  const handleTeamToEdit = (team) => {
    setSelectedTeam(team);
    setEditTeamDialog(true);
  }

  const handleDeleteTeam = () => {
    const updatedTeams = teams.filter(team => team.name !== selectedTeam.name);
    setTeams(updatedTeams);
    setSelectedTeam(null);
    setEditTeamDialog(false);
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
      {/* List of teams */}
      <View style={styles.containerData}>
        <View style={styles.teamList} >
          <Text style={styles.title}>{title[language]}</Text>
          <ScrollView>
            {teams ? teams.map((team, index) => (
              <TouchableHighlight
                key={index}
                onPress={() => handleTeamToEdit(team)}
                underlayColor="transparent"
              >
                <ListItem
                  style={styles.team}
                  linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                  }}
                  ViewComponent={LinearGradient}
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                      {team.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="white" />
                </ListItem>
              </TouchableHighlight>
            )) : null}
          </ScrollView>
        </View>
        <View style={styles.startGame}>
          <Button
            title={newTeam[language]}
            color='#0000cc'
            onPress={() => setAddTeamDialog(true)}
          />
          {
            teams.length >= 2 &&
            <Button
              containerStyle={styles.buttonSaveTeam}
              title={buttonStart[language]}
              color='success'
              onPress={() => navigation.navigate('PlayGame', { teams: teams })}
            />
          }
        </View>

        {/* Add new team */}
        <Dialog
          isVisible={addTeamDialog}
          onBackdropPress={() => setAddTeamDialog(false)}
        >
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
                }

                setTeams([...teams, newTeam]);
                setAddTeamDialog(false);
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

        {/* Edit team */}
        <Dialog
          isVisible={editTeamDialog}
          onBackdropPress={() => setEditTeamDialog(false)}
        >
          <ScrollView keyboardShouldPersistTaps='handled'>
            <Formik
              initialValues={{
                teamName: selectedTeam ? selectedTeam.name : '',
                players: selectedTeam ? selectedTeam.players : []
              }}
              onSubmit={(values) => {
                if (!validateTeamInput(teams, values, language)) {
                  return;
                }
                const updatedTeam = {
                  name: values.teamName,
                  players: values.players,
                  score: 0
                }
                const updatedTeams = [...teams];
                const oldTeamIndex = teams.findIndex(team => team.name === selectedTeam.name);
                updatedTeams[oldTeamIndex] = updatedTeam;
                setTeams(updatedTeams);
                setSelectedTeam(null);
                setEditTeamDialog(false);
              }}
            >
              {(props) => (
                <View>
                  {props.values.teamName ? (
                    <Text style={styles.label}>{teamInput[language]}</Text>
                  ) : null}
                  <TextInput
                    style={styles.teamInput}
                    placeholder={props.values.teamName}
                    onChangeText={props.handleChange('teamName')}
                    value={props.values.teamName}
                  />
                  {props.values.players.map((player, index) => (
                    <View key={index}>
                      <Text style={styles.label}>{`${playerInput[language]} ${index + 1}`}</Text>
                      <TextInput
                        style={styles.playerInput}
                        placeholder={player}
                        onChangeText={props.handleChange(`players.${index}`)}
                        value={player}
                      />
                    </View>
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
                      title={buttonDelete[language]}
                      color='error'
                      onPress={handleDeleteTeam}
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  containerData: {
    flex: 1
  },
  teamList: {
    flex: 1
  },
  startGame: {
    padding: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 15,
    color: 'white'
  },
  team: {
    marginBottom: 10
  },
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
  teamLabel: {
    fontSize: 12
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