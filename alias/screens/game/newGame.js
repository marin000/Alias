import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { connect } from 'react-redux';
import {
  addTeam,
  updateTeam,
  deleteTeam,
  gameStartEnd,
  deleteAllTeams,
  updateMaxScoreReached,
  updateTeamIndex,
  addAllTeams
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { SettingsContext } from '../../utils/settings';
import { newGame } from '../../constants/newGameScreen';
import backgroundImage from '../../assets/blurred-background.jpeg';
import AddTeamDialog from '../../components/newGameScreen/addTeamDialog';
import EditTeamDialog from '../../components/newGameScreen/editTeamDialog';
import PreStartDialog from '../../components/newGameScreen/preStartDialog';
import ShowTeamResultDialog from '../../components/newGameScreen/showTeamResultDialog';
import RandomTeamDialog from '../../components/newGameScreen/randomTeamDialog';
import BackButton from '../../components/backButton';
import TeamList from '../../components/newGameScreen/teamList';
import { globalStyles } from '../../styles/global';
import api from '../../api/teams';

const NewGame = ({ teams, currentTeamIndex, gameStarted, maxScoreReached, addTeam, updateTeam, deleteTeam, gameStartEnd, userData, navigation }) => {
  const { language, maxScore } = useContext(SettingsContext);
  const { title, newTeam, buttonStart, targetResultTxt, headerTitle, newGameSameTeamsButton, createRandomTeams, saveAsMyTeam, saveAsMyTeamAlert, importMyTeam } = newGame;
  const [addTeamDialog, setAddTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTeamDialog, setEditTeamDialog] = useState(false);
  const [preStartDialog, setPreStartDialog] = useState(false);
  const [showTeamResultDialog, setShowTeamResultDialog] = useState(false);
  const [randomTeamDialog, setRandomTeamDialog] = useState(false);
  const [myTeamFlag, setMyTeamFlag] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(gameStartEnd(true));
    navigation.navigate('PlayGame');
  }

  const showTeamResult = (team) => {
    setSelectedTeam(team);
    setShowTeamResultDialog(true);
  }

  const handleNewGame = () => {
    dispatch(deleteAllTeams());
    dispatch(gameStartEnd(false));
    dispatch(updateMaxScoreReached(false));
    dispatch(updateTeamIndex(0));
  }

  const handleNewGameSameTeams = () => {
    teams.map(team => {
      dispatch(updateTeam({ ...team, score: 0 }));
    });
    dispatch(gameStartEnd(false));
    dispatch(updateMaxScoreReached(false));
    dispatch(updateTeamIndex(0));
  }

  const handleSaveAsMyTeam = () => {
    const myTeam = teams.find(team => team.players.some(player => player.name === userData.name));
    const players = myTeam.players.map(player => player.name);

    const newTeam = {
      name: myTeam.name,
      players,
      playerId: userData._id
    }

    api.addNewTeam(newTeam)
      .then(() => {
        Alert.alert(saveAsMyTeamAlert[language]);
        setMyTeamFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleImportMyTeam = () => {
    const playersArray = userData.team.players
      .map((player, index) => {
        return {
          name: player,
          scoreExplains: 0,
          scoreGuess: 0,
          explains: index === 0 ? true : false
        }
      });
    const myTeam = {
      id: userData.team._id,
      name: userData.team.name,
      players: playersArray,
      score: 0
    };
    addTeam(myTeam);
    setMyTeamFlag(true);
  }

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
      {/* List of teams */}
      <View style={styles.containerData}>
        <View style={styles.teamList} >
          <Text style={styles.title}>{title[language]}</Text>
          <BackButton onPress={() => navigation.navigate('Home')} />
          {
            gameStarted &&
            <Text style={styles.targetResult}>{targetResultTxt[language]}: {maxScore}</Text>
          }
          <TeamList
            teams={teams}
            gameStarted={gameStarted}
            showTeamResult={showTeamResult}
            handleTeamToEdit={handleTeamToEdit}
          />
        </View>
        <View style={styles.startGame}>
          {/* Save team as my team */}
          {
            teams.length >= 2 && userData && !myTeamFlag &&
            <Button
              title={saveAsMyTeam[language]}
              color='#0000cc'
              onPress={() => handleSaveAsMyTeam()}
            />
          }
          {/* Import my team */}
          {
            teams.length === 0 && userData && userData.team &&
            <Button
              title={importMyTeam[language]}
              color='#0000cc'
              onPress={() => handleImportMyTeam()}
            />
          }
          {
            !gameStarted &&
            <Button
              containerStyle={styles.preGameButtons}
              title={newTeam[language]}
              color='#0000cc'
              onPress={() => setAddTeamDialog(true)}
            />
          }
          {
            !gameStarted && teams.length === 0 &&
            <Button
              containerStyle={styles.preGameButtons}
              title={createRandomTeams[language]}
              color='#0000cc'
              onPress={() => setRandomTeamDialog(true)}
            />
          }
          {
            teams.length >= 2 && !maxScoreReached &&
            <Button
              containerStyle={globalStyles.buttonSaveTeam}
              title={buttonStart[language]}
              color='success'
              onPress={() => setPreStartDialog(true)}
            />
          }
          {
            maxScoreReached &&
            <Button
              title={headerTitle[language]}
              color='#0000cc'
              onPress={() => handleNewGame()}
            />
          }
          {
            maxScoreReached &&
            <Button
              containerStyle={globalStyles.buttonSaveTeam}
              title={newGameSameTeamsButton[language]}
              color='success'
              onPress={() => handleNewGameSameTeams()}
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
          userData={userData}
        />
        {/* Edit team */}
        <EditTeamDialog
          isVisible={editTeamDialog}
          onClose={() => setEditTeamDialog(false)}
          teams={teams}
          selectedTeam={selectedTeam}
          myTeamEditing={myTeamFlag ? userData?.team.name === selectedTeam?.name : false}
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
        {/* Show team result dialog */}
        {
          teams.length >= 2 && gameStarted &&
          <ShowTeamResultDialog
            isVisible={showTeamResultDialog}
            onClose={() => setShowTeamResultDialog(false)}
            language={language}
            selectedTeam={selectedTeam}
          />
        }
        {/* Random team generator dialog */}
        {
          teams.length === 0 && !gameStarted &&
          <RandomTeamDialog
            isVisible={randomTeamDialog}
            onClose={() => setRandomTeamDialog(false)}
            language={language}
            onAddAllTeams={(randomTeams) => {
              dispatch(addAllTeams(randomTeams));
            }}
            userData={userData}
          />
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 5,
    color: 'white'
  },
  targetResult: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    marginBottom: 10
  },
  preGameButtons: {
    marginTop: 15
  }
});

NewGame.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams,
  currentTeamIndex: state.gameReducer.currentTeamIndex,
  gameStarted: state.gameReducer.gameStarted,
  maxScoreReached: state.gameReducer.maxScoreReached,
  userData: state.userReducer.userData
});

const mapDispatchToProps = {
  addTeam,
  updateTeam,
  deleteTeam,
  gameStartEnd,
  deleteAllTeams,
  updateMaxScoreReached,
  updateTeamIndex,
  addAllTeams
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);