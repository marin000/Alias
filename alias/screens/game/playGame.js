import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Text, Button, Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { updateTeam, updateTeamIndex, updatePlayerExplains, updateMaxScoreReached, addOldWords } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { SettingsContext } from '../../utils/settings';
import { getRandomWord, teamWithHighestScore, updatePlayerTeamStatsDB, playSound } from '../../utils/helper';
import { playGame } from '../../constants/playGameScreen';
import EndRoundDialog from '../../components/playGameScreen/endRoundDialog';
import WinnerDialog from '../../components/playGameScreen/winnerDialog';
import PauseDialog from '../../components/playGameScreen/pauseDialog';
import RatingDialog from '../../components/playGameScreen/ratingDialog';
import { globalStyles } from '../../styles/global';
import { showInterstitialAd } from '../../utils/adService';

const PlayGame = ({ teams, currentTeamIndex, maxScoreReached, updateTeam, userData, navigation }) => {
  const { language, timer, maxScore, gameSound } = useContext(SettingsContext);
  const { buttonSave, buttonSkip, correctAnswersTxt, skippedAnswersTxt } = playGame;
  const [gameTimer, setGameTimer] = useState(timer);
  const [currentWord, setCurrentWord] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [pauseDialog, setPauseDialog] = useState(false);
  const [endDialog, setEndDialog] = useState(false);
  const [paused, setPaused] = useState(false);
  const [winnerDialog, setWinnerDialog] = useState(false);
  const [ratingDialog, setRatingDialog] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState('');
  const [oldWordsArr, setOldWordsArr] = useState([]);
  const [skippedWords, setSkippedWords] = useState([]);

  useKeepAwake();
  const dispatch = useDispatch();
  let gameWordList = navigation.getParam('words');

  useEffect(() => {
    setCurrentWord((prevWord) => {
      const newWord = getRandomWord(gameWordList);
      if (prevWord) {
        setOldWordsArr((prevWords) => [...prevWords, prevWord]);
      }
      gameWordList = gameWordList.filter((word) => word !== newWord);
      return newWord;
    });
    setCurrentTeam(teams[currentTeamIndex]);
  }, []);

  useEffect(() => {
    let interval = null;
    const handleBackButton = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    if (gameTimer > 0 && !paused) {
      if (gameTimer === 10) {
        playSound('lastSecPlay', gameSound);
      }
      interval = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (paused) {
      setPauseDialog(true);
    } else {
      setEndDialog(true);
    }
    return () => {
      clearInterval(interval);
      backHandler.remove();
    };
  }, [gameTimer, paused]);

  const handleSave = () => {
    playSound('correct', gameSound);
    setCurrentWord((prevWord) => {
      const newWord = getRandomWord(gameWordList);
      setOldWordsArr((prevWords) => [...prevWords, prevWord]);
      gameWordList = gameWordList.filter((word) => word !== newWord);
      return newWord;
    });
    setCorrectAnswers(correctAnswers + 1);
  }

  const handleSkip = async () => {
    playSound('wrong', gameSound);
    setSkippedWords((prevWords) => [...prevWords, currentWord]);
    setCurrentWord((prevWord) => {
      const newWord = getRandomWord(gameWordList);
      setOldWordsArr((prevWords) => [...prevWords, prevWord]);
      gameWordList = gameWordList.filter((word) => word !== newWord);
      return newWord;
    });
    setSkippedAnswers(skippedAnswers + 1);
  }

  const handleCloseEndDialog = (selectedWordsCount, unselectedWordsCount) => {
    let maxScoreFlag = false;
    const newScore = currentTeam.score + selectedWordsCount - unselectedWordsCount;
    dispatch(updateTeam({ ...currentTeam, score: newScore }));
    dispatch(updatePlayerExplains(currentTeam.id, selectedWordsCount - unselectedWordsCount));
    dispatch(updateTeamIndex((currentTeamIndex + 1) % teams.length));
    dispatch(addOldWords(oldWordsArr));
    if (newScore >= maxScore) {
      dispatch(updateMaxScoreReached(true));
      maxScoreFlag = true;
    }
    if (currentTeamIndex === teams.length - 1 && (maxScoreReached || maxScoreFlag)) {
      const currentRoundTeam = {
        id: currentTeam.id,
        name: currentTeam.name,
        score: newScore,
        players: currentTeam.players.map(player => ({
          ...player,
          scoreExplains: player.explains
            ? player.scoreExplains + selectedWordsCount - unselectedWordsCount
            : player.scoreExplains,
          scoreGuess: !player.explains
            ? player.scoreGuess + selectedWordsCount - unselectedWordsCount
            : player.scoreGuess
        })),
        myTeam: currentTeam.myTeam ? true : false
      };
      const updatedTeams = [...teams]
      updatedTeams[currentTeamIndex] = currentRoundTeam;
      const highestScoreTeam = teamWithHighestScore(updatedTeams);
      setWinnerTeam(highestScoreTeam);
      setEndDialog(false);
      setWinnerDialog(true);
      if (userData) {
        updatePlayerTeamStatsDB(highestScoreTeam, updatedTeams, userData, dispatch);
      }
    } else {
      showInterstitialAd();
      setEndDialog(false);
      navigation.navigate('NewGame');
    }
  }

  const handleClosePauseDialog = () => {
    setPauseDialog(false);
    setPaused(false);
  }

  const handlePauseButton = () => {
    setPauseDialog(true);
    setPaused(true);
  }

  const handleCloseWinnerDialog = () => {
    setWinnerDialog(false);
    navigation.navigate('NewGame');
  }

  const handleOpenRatingDialog = () => {
    setWinnerDialog(false);
    setRatingDialog(true);
  }

  const handleCloseRatingDialog = () => {
    setRatingDialog(false);
    navigation.navigate('NewGame');
  }

  return (
    <View style={styles.container} resizeMode={'cover'}>
      <View style={styles.teamInfo}>
        <Text style={styles.teamNameText}>{currentTeam.name}</Text>
      </View>
      <View style={styles.answersContainer}>
        <View style={styles.correctAnswersContainer}>
          <Text style={styles.correctAnswersText}>{correctAnswersTxt[language]}: {correctAnswers}</Text>
        </View>
        <View style={styles.skippedAnswersContainer}>
          <Text style={styles.skippedAnswersText}>{skippedAnswersTxt[language]}: {skippedAnswers}</Text>
        </View>
        {gameTimer > 10 &&
          <Button
            radius={'sm'}
            type="solid"
            onPress={() => handlePauseButton()}
          >
            <Icon name="pause" color="white" />
          </Button>
        }
      </View>
      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{gameTimer}</Text>
      </View>
      <View style={styles.buttonsSaveSkip}>
        <Button
          containerStyle={styles.buttonSkip}
          title={buttonSkip[language]}
          color='#ff3d33'
          size='lg'
          onPress={handleSkip}
          buttonStyle={globalStyles.roundButton}
        />
        <Button
          containerStyle={styles.buttonSave}
          title={buttonSave[language]}
          color='#439946'
          size='lg'
          onPress={handleSave}
          buttonStyle={globalStyles.roundButton}
        />
      </View>
      {/* End round dialog */}
      {gameTimer === 0 &&
        <EndRoundDialog
          isVisible={endDialog}
          onClose={handleCloseEndDialog}
          language={language}
          currentTeam={currentTeam}
          gameTimer={gameTimer}
          currentRoundWords={oldWordsArr}
          skippedWords={skippedWords}
        />}
      {/* Pause dialog */}
      <PauseDialog
        isVisible={pauseDialog}
        onClose={handleClosePauseDialog}
        language={language}
        currentTeam={currentTeam}
        correctAnswers={correctAnswers}
        skippedAnswers={skippedAnswers}
      />
      {/* Winner Dialog */}
      <WinnerDialog
        isVisible={winnerDialog}
        onClose={handleCloseWinnerDialog}
        handleRateGame={handleOpenRatingDialog}
        language={language}
        winnerTeam={winnerTeam}
      />
      {/* Rating Dialog */}
      <RatingDialog
        isVisible={ratingDialog}
        onClose={handleCloseRatingDialog}
        language={language}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainContainer,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 35,
    flexDirection: 'row',
    alignItems: 'center'
  },
  teamNameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  answersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 100
  },
  correctAnswersContainer: {
    paddingRight: 15
  },
  correctAnswersText: {
    fontSize: 20,
    color: 'black'
  },
  skippedAnswersContainer: {
    paddingRight: 15
  },
  skippedAnswersText: {
    fontSize: 20,
    color: 'black'
  }
});

PlayGame.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams,
  currentTeamIndex: state.gameReducer.currentTeamIndex,
  maxScoreReached: state.gameReducer.maxScoreReached,
  userData: state.userReducer.userData
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTeam: (team) => dispatch(updateTeam(team)),
    updateTeamIndex: (index) => dispatch(updateTeamIndex(index)),
    updatePlayerExplains: (teamId, playerScore) => dispatch(updatePlayerExplains(teamId, playerScore)),
    updateMaxScoreReached: () => dispatch(updateMaxScoreReached(true)),
    addOldWords: (oldWords) => dispatch(addOldWords(oldWords))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);