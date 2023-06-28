import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { updateTeam, updateTeamIndex, updatePlayerExplains, updateMaxScoreReached } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { SettingsContext } from '../../utils/settings';
import { getRandomWord, teamWithHighestScore } from '../../utils/helper';
import { playGame } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import TeamResultDialog from '../../components/teamResultDialog';
import WinnerDialog from '../../components/winnerDialog';

const PlayGame = ({ teams, currentTeamIndex, gameStarted, maxScoreReached, updateTeam, navigation }) => {
  const { language, timer, maxScore } = useContext(SettingsContext);
  const { buttonSave, buttonSkip, correctAnswersTxt, skippedAnswersTxt } = playGame;
  const [gameTimer, setGameTimer] = useState(timer);
  const [currentWord, setCurrentWord] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [teamDialog, setTeamDialog] = useState(false);
  const [paused, setPaused] = useState(false);
  const [winnerDialog, setWinnerDialog] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState('');

  const dispatch = useDispatch();
  let gameWordList = [];
  const initialTeamIndex = currentTeamIndex;

  if (language === 'hr') {
    gameWordList = require('../../assets/words/hr.json');
  }

  useEffect(() => {
    setCurrentWord(getRandomWord(gameWordList));
    setCurrentTeam(teams[currentTeamIndex]);
  }, []);

  useEffect(() => {
    let interval = null;
    let maxScoreFlag = false;
    if (gameTimer > 0 && !paused) {
      interval = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (paused) {
      setTeamDialog(true);
    } else {
      const newScore = currentTeam.score + correctAnswers - skippedAnswers;
      dispatch(updateTeam({ ...currentTeam, score: newScore }));
      dispatch(updatePlayerExplains(currentTeam.id, correctAnswers - skippedAnswers));
      dispatch(updateTeamIndex((currentTeamIndex + 1) % teams.length));
      if (newScore >= maxScore) {
        dispatch(updateMaxScoreReached(true));
        maxScoreFlag = true;
      }
      if (currentTeamIndex === teams.length - 1 && (maxScoreReached || maxScoreFlag)) {
        const currentRoundTeam = {
          name: currentTeam.name,
          score: newScore
        }
        const highestScore = teamWithHighestScore(teams, currentRoundTeam);
        setWinnerTeam(highestScore);
        setWinnerDialog(true);
      } else {
        setTeamDialog(true);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameTimer, paused]);

  const handleSave = () => {
    setCurrentWord(getRandomWord(gameWordList));
    setCorrectAnswers(correctAnswers + 1);
  }

  const handleSkip = () => {
    setCurrentWord(getRandomWord(gameWordList));
    setSkippedAnswers(skippedAnswers + 1);
  }

  const handleCloseTeamDialog = () => {
    if (gameTimer > 0) {
      setTeamDialog(false);
      setPaused(false);
    } else {
      setTeamDialog(false);
      navigation.navigate('NewGame');
    }
  }

  const handlePauseButton = () => {
    setTeamDialog(true);
    setPaused(true);
  }

  const handleCloseWinnerDialog = () => {
    setWinnerDialog(false);
    navigation.navigate('NewGame');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
      <View style={styles.teamInfo}>
        <View style={styles.teamNameContainer}>
          <Text style={styles.teamNameText}>{currentTeam.name}</Text>
        </View>
      </View>
      <View style={styles.answersContainer}>
        <View style={styles.correctAnswersContainer}>
          <Text style={styles.correctAnswersText}>{correctAnswersTxt[language]}: {correctAnswers}</Text>
        </View>
        <View style={styles.skippedAnswersContainer}>
          <Text style={styles.skippedAnswersText}>{skippedAnswersTxt[language]}: {skippedAnswers}</Text>
        </View>
        <Button
          radius={'sm'}
          type="solid"
          onPress={() => handlePauseButton()}
        >
          <Icon name="pause" color="white" />
        </Button>
      </View>
      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{gameTimer}</Text>
      </View>
      <View style={styles.buttonsSaveSkip}>
        <Button
          containerStyle={styles.buttonSkip}
          title={buttonSkip[language]}
          color='error'
          size='lg'
          onPress={handleSkip}
        />
        <Button
          containerStyle={styles.buttonSave}
          title={buttonSave[language]}
          color='success'
          size='lg'
          onPress={handleSave}
        />
      </View>
      {/* Show current team results */}
      <TeamResultDialog
        isVisible={teamDialog}
        onClose={handleCloseTeamDialog}
        language={language}
        currentTeam={currentTeam}
        correctAnswers={correctAnswers}
        skippedAnswers={skippedAnswers}
        gameTimer={gameTimer}
      />
      {/* Winner Dialog */}
      <WinnerDialog
        isVisible={winnerDialog}
        onClose={handleCloseWinnerDialog}
        language={language}
        winnerTeam={winnerTeam}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  word: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerContainer: {
    borderRadius: 5
  },
  timer: {
    fontSize: 120,
    color: 'white'
  },
  buttonsSaveSkip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20
  },
  buttonSave: {
    width: 150,
    height: 60,
  },
  buttonSkip: {
    marginRight: 10,
    width: 150,
    height: 60
  },
  teamInfo: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  teamNameContainer: {
    paddingRight: 30,
  },
  teamNameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  answersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 80
  },
  correctAnswersContainer: {
    paddingRight: 15
  },
  correctAnswersText: {
    fontSize: 20,
    color: 'white'
  },
  skippedAnswersContainer: {
    paddingRight: 15
  },
  skippedAnswersText: {
    fontSize: 20,
    color: 'white'
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams,
  gameStarted: state.gameReducer.gameStarted,
  currentTeamIndex: state.gameReducer.currentTeamIndex,
  maxScoreReached: state.gameReducer.maxScoreReached
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTeam: (team) => dispatch(updateTeam(team)),
    updateTeamIndex: (index) => dispatch(updateTeamIndex(index)),
    updatePlayerExplains: (teamId, playerScore) => dispatch(updatePlayerExplains(teamId, playerScore)),
    updateMaxScoreReached: () => dispatch(updateMaxScoreReached(true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);