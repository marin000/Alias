import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { Text, ListItem, Button } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { addTeam, updateTeam, deleteTeam, gameStartEnd } from '../../redux/actions';
import { SettingsContext } from '../../utils/settings';
import { newGame } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import AddTeamDialog from '../../components/addTeamDialog';
import EditTeamDialog from '../../components/editTeamDialog';
import PreStartDialog from '../../components/preStartDialog';
import ShowTeamResultDialog from '../../components/showTeamResultDialog';

const NewGame = ({ teams, currentTeamIndex, gameStarted, addTeam, updateTeam, deleteTeam, gameStartEnd, navigation }) => {
  const { language, maxScore } = useContext(SettingsContext);
  const { title, newTeam, buttonStart, score, targetResultTxt } = newGame;
  const [addTeamDialog, setAddTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTeamDialog, setEditTeamDialog] = useState(false);
  const [preStartDialog, setPreStartDialog] = useState(false);
  const [showTeamResultDialog, setShowTeamResultDialog] = useState(false);

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

  const startGame = () => {
    setPreStartDialog(false);
    navigation.navigate('PlayGame');
    gameStartEnd(true);
  }

  const showTeamResult = (team) => {
    setSelectedTeam(team);
    setShowTeamResultDialog(true);
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
      {/* List of teams */}
      <View style={styles.containerData}>
        <View style={styles.teamList} >
          <Text style={styles.title}>{title[language]}</Text>
          {
            gameStarted &&
            <Text style={styles.targetResult}>{targetResultTxt[language]}: {maxScore}</Text>
          }
          <ScrollView>
            {teams ? teams
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((team, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => gameStarted ? showTeamResult(team) : handleTeamToEdit(team)}
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
                    {
                      gameStarted &&
                      <View style={styles.orderNumberCircle}>
                        <Text style={styles.orderNumber}>{index + 1}</Text>
                      </View>
                    }
                    <ListItem.Content>
                      <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                        {team.name}
                      </ListItem.Title>
                      {
                        gameStarted &&
                        <ListItem.Subtitle style={{ color: 'white', fontWeight: 'bold' }}>
                          {score[language]} {team.score}
                        </ListItem.Subtitle>
                      }
                    </ListItem.Content>
                    <ListItem.Chevron color="white" />
                  </ListItem>
                </TouchableHighlight>
              )) : null}
          </ScrollView>
        </View>
        <View style={styles.startGame}>
          {
            !gameStarted &&
            <Button
              title={newTeam[language]}
              color='#0000cc'
              onPress={() => setAddTeamDialog(true)}
            />
          }
          {
            teams.length >= 2 &&
            <Button
              containerStyle={styles.buttonSaveTeam}
              title={buttonStart[language]}
              color='success'
              onPress={() => setPreStartDialog(true)}
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
        {/* Pre start dialog */}
        {
          teams.length >= 2 &&
          <PreStartDialog
            isVisible={preStartDialog}
            onClose={() => setPreStartDialog(false)}
            startGame={() => startGame()}
            language={language}
            currentTeam={teams[currentTeamIndex]}
          />
        }
        {/* Show team result didalog */}
        {
          teams.length >= 2 && gameStarted &&
          <ShowTeamResultDialog
            isVisible={showTeamResultDialog}
            onClose={() => setShowTeamResultDialog(false)}
            language={language}
            selectedTeam={selectedTeam}
          />
        }
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
  orderNumberCircle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNumber: {
    fontWeight: 'bold'
  },
  startGame: {
    padding: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  buttonSaveTeam: {
    marginTop: 15
  },
  targetResult: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    marginBottom: 10
  }
});

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams,
  gameStarted: state.gameReducer.gameStarted,
  currentTeamIndex: state.gameReducer.currentTeamIndex
});

const mapDispatchToProps = {
  addTeam,
  updateTeam,
  deleteTeam,
  gameStartEnd
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);