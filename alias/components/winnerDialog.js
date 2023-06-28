import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { playGame, newGame } from '../constants';
import { connect } from 'react-redux';
import { deleteAllTeams, gameStartEnd } from '../redux/actions';
import { useDispatch } from 'react-redux';
import cupImage from '../assets/cup.jpeg';

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
    onClose();
  }

  return (
    <Dialog isVisible={isVisible}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.dialogTitle}>{winner[language]} {winnerTeam.name}</Text>
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
  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
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
    gameStartEnd: () => dispatch(gameStartEnd(false))
  };
};

export default connect(mapDispatchToProps)(WinnerDialog);
