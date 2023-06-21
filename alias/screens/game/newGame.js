import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { Text, ListItem, Button, Dialog } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { addTeam, updateTeam, deleteTeam } from '../../redux/actions';
import { SettingsContext } from '../../utils/settings';
import { newGame } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import AddTeamDialog from '../../components/addTeamDialog';
import EditTeamDialog from '../../components/editTeamDialog';

const NewGame = ({ teams, addTeam, updateTeam, deleteTeam, navigation }) => {
  const { language } = useContext(SettingsContext);
  const { title, newTeam, buttonStart } = newGame;
  const [addTeamDialog, setAddTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTeamDialog, setEditTeamDialog] = useState(false);

  const handleTeamToEdit = (team) => {
    setSelectedTeam(team);
    setEditTeamDialog(true);
  }

  const handleUpdateTeam = (updatedTeam) => {
    updateTeam(updatedTeam);
    setSelectedTeam(null);
  }

  const handleDeleteTeam = () => {
    deleteTeam(selectedTeam);
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
              onPress={() => navigation.navigate('PlayGame')}
            />
          }
        </View>

        {/* Add new team */}
        <AddTeamDialog
          isVisible={addTeamDialog}
          onClose={() => setAddTeamDialog(false)}
          teams={teams}
          language={language}
          onAddTeam={(newTeam) => {
            addTeam(newTeam);
          }}
        />
        {/* Edit team */}
        <EditTeamDialog
          isVisible={editTeamDialog}
          onClose={() => setEditTeamDialog(false)}
          teams={teams}
          selectedTeam={selectedTeam}
          language={language}
          onDeleteTeam={() => handleDeleteTeam()}
          onUpdateTeam={(updatedTeam) => { handleUpdateTeam(updatedTeam) }
          }
        />
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
  team: {
    marginBottom: 10
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
  buttonSaveTeam: {
    marginTop: 15
  }
});

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams
});

const mapDispatchToProps = {
  addTeam,
  updateTeam,
  deleteTeam
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);