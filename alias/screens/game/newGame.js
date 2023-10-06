import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
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
  addAllTeams,
  updateUser,
  resetPlayersScore
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { SettingsContext } from '../../utils/settings';
import { getWords } from '../../utils/helper';
import { newGame } from '../../constants/newGameScreen';
import AddTeamDialog from '../../components/newGameScreen/addTeamDialog';
import EditTeamDialog from '../../components/newGameScreen/editTeamDialog';
import PreStartDialog from '../../components/newGameScreen/preStartDialog';
import ShowTeamResultDialog from '../../components/newGameScreen/showTeamResultDialog';
import RandomTeamDialog from '../../components/newGameScreen/randomTeamDialog';
import BackButton from '../../components/backButton';
import TeamList from '../../components/newGameScreen/teamList';
import { globalStyles } from '../../styles/global';
import api from '../../api/teams';
import { showRewardedAd } from '../../utils/adService';

const NewGame = ({ teams, currentTeamIndex, gameStarted, maxScoreReached, addTeam, updateTeam, deleteTeam, gameStartEnd, resetPlayersScore, userData, oldWords, navigation }) => {
  const { language, maxScore } = useContext(SettingsContext);
  const { title, newTeam, buttonStart, buttonContinue, targetResultTxt, headerTitle, newGameSameTeamsButton, createRandomTeams, saveAsMyTeam, saveAsMyTeamAlert, importMyTeam } = newGame;
  const [addTeamDialog, setAddTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTeamDialog, setEditTeamDialog] = useState(false);
  const [preStartDialog, setPreStartDialog] = useState(false);
  const [showTeamResultDialog, setShowTeamResultDialog] = useState(false);
  const [randomTeamDialog, setRandomTeamDialog] = useState(false);
  const [wordsFetched, setWordsFetched] = useState(false);
  const [words, setWords] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wordsFetched) {
      const fetchedWords = getWords(language, oldWords);
      setWords(fetchedWords);
      setWordsFetched(true);
    }
  }, [language, oldWords, wordsFetched]);

  const handleBackButton = () => {
    navigation.navigate('Home');
    return true; 
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  const handleTeamToEdit = (team) => {
    setSelectedTeam(team);
    setEditTeamDialog(true);
  }

  const handleUpdateTeam = (updatedTeam) => {
    updateTeam(updatedTeam);
    setSelectedTeam(null);
  }

  const handleDeleteTeam = () => {
    if (userData && userData.saveTeamResult) {
      dispatch(updateUser({ ...userData, saveTeamResult: false }));
    }
    dispatch(deleteTeam(selectedTeam));
    setSelectedTeam(null);
    setEditTeamDialog(false);
  }

  const startGame = () => {
    setPreStartDialog(false);
    dispatch(gameStartEnd(true));
    navigation.navigate('PlayGame', { words });
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
    showRewardedAd();
  }

  const handleNewGameSameTeams = () => {
    teams.map(team => {
      dispatch(updateTeam({ ...team, score: 0 }));
    });
    dispatch(gameStartEnd(false));
    dispatch(updateMaxScoreReached(false));
    dispatch(updateTeamIndex(0));
    dispatch(resetPlayersScore());
    showRewardedAd();
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
      .then((res) => {
        dispatch(updateUser({
          ...userData,
          team: res.data,
          saveTeamResult: true
        }));
        Alert.alert(saveAsMyTeamAlert[language]);
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
      score: 0,
      myTeam: true
    };

    addTeam(myTeam);
    dispatch(updateUser({ ...userData, saveTeamResult: true }));
  }

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      {/* List of teams */}
      <View style={styles.containerData}>
        <View style={styles.teamList} >
          <Text style={globalStyles.screenTitle}>{title[language]}</Text>
          <BackButton onPress={() => navigation.navigate('Home')} />
          {
            gameStarted &&
            <Text style={styles.targetResult}>{targetResultTxt[language]}: {maxScore}</Text>
          }
          <TeamList
            teams={teams}
            gameStarted={gameStarted}
            showTeamResult={showTeamResult}
            language={language}
            handleTeamToEdit={handleTeamToEdit}
          />
        </View>
        <View style={styles.startGame}>
          {/* Save team as my team */}
          {
            teams.length >= 2 && userData && !userData.saveTeamResult && !gameStarted &&
            <Button
              title={saveAsMyTeam[language]}
              onPress={() => handleSaveAsMyTeam()}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {/* Import my team */}
          {
            teams.length === 0 && userData && userData.team &&
            <Button
              title={importMyTeam[language]}
              onPress={() => handleImportMyTeam()}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {
            !gameStarted &&
            <Button
              containerStyle={styles.preGameButtons}
              title={newTeam[language]}
              onPress={() => setAddTeamDialog(true)}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {
            !gameStarted && teams.length === 0 &&
            <Button
              containerStyle={styles.preGameButtons}
              title={createRandomTeams[language]}
              onPress={() => setRandomTeamDialog(true)}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {
            teams.length >= 2 && (!maxScoreReached || (maxScoreReached && currentTeamIndex !== 0)) &&
            <Button
              containerStyle={globalStyles.buttonSaveTeam}
              title={gameStarted ? buttonContinue[language] : buttonStart[language]}
              color='#439946'
              onPress={() => setPreStartDialog(true)}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {
            maxScoreReached && currentTeamIndex === 0 &&
            <Button
              title={headerTitle[language]}
              onPress={() => handleNewGame()}
              buttonStyle={globalStyles.roundButton}
            />
          }
          {
            maxScoreReached && currentTeamIndex === 0 &&
            <Button
              containerStyle={globalStyles.buttonSaveTeam}
              type='outline'
              title={newGameSameTeamsButton[language]}
              onPress={() => handleNewGameSameTeams()}
              buttonStyle={globalStyles.roundButton}
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
          myTeamEditing={userData?.saveTeamResult ? userData?.team.name === selectedTeam?.name : false}
          userData={userData}
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
    </View>
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
    fontSize: 14,
    color: 'black',
    marginBottom: 15
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
  userData: state.userReducer.userData,
  oldWords: state.gameReducer.oldWords
});

const mapDispatchToProps = {
  addTeam,
  updateTeam,
  deleteTeam,
  gameStartEnd,
  deleteAllTeams,
  updateMaxScoreReached,
  updateTeamIndex,
  addAllTeams,
  resetPlayersScore
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);