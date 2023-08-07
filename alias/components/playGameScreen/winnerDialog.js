import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame } from '../../constants/playGameScreen';
import { newGame } from '../../constants/newGameScreen';
import { connect } from 'react-redux';
import { deleteAllTeams, gameStartEnd, updateMaxScoreReached, updateTeamIndex } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { globalStyles } from '../../styles/global';
import cupImage from '../../assets/cup.jpeg';

const WinnerDialog = ({ isVisible, onClose, language, winnerTeam }) => {
  const { winner, finalScore } = playGame;
  const { closeButton, headerTitle } = newGame;
  const dispatch = useDispatch();

  const handleCloseButton = () => {
    onClose();
  }

  const handleNewGameButton = () => {
    dispatch(deleteAllTeams());
    dispatch(gameStartEnd(false));
    dispatch(updateMaxScoreReached(false));
    dispatch(updateTeamIndex(0));
    onClose();
  }

  return (
    <Dialog isVisible={isVisible}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={globalStyles.dialogTitle}>{winner[language]} {winnerTeam.name}</Text>
            <Text style={styles.scoreText}>{finalScore[language]}: {winnerTeam.score}</Text>
          </View>
          <Image source={cupImage} style={styles.cupImage} />
        </View>
        <Button
          containerStyle={styles.dialogButton}
          title={closeButton[language]}
          color='error'
          onPress={handleCloseButton}
        />
        <Button
          containerStyle={styles.dialogButton}
          title={headerTitle[language]}
          color='success'
          onPress={handleNewGameButton}
        />
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  infoContainer: {
    flex: 1
  },
  scoreText: {
    fontSize: 17
  },
  cupImage: {
    width: 40,
    height: 70
  },
  dialogButton: {
    alignSelf: 'center',
    width: 300,
    height: 60
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllTeams: () => dispatch(deleteAllTeams()),
    gameStartEnd: () => dispatch(gameStartEnd(false)),
    updateMaxScoreReached: () => dispatch(updateMaxScoreReached(false)),
    updateTeamIndex: () => dispatch(updateTeamIndex(index))
  };
};

export default connect(mapDispatchToProps)(WinnerDialog);
