import React from 'react';
import { ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { newGame } from '../../constants/newGameScreen';

const TeamList = ({ teams, gameStarted, showTeamResult, language, handleTeamToEdit }) => {
  const { score } = newGame;

  return (
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
            <View style={styles.teamContainer}>
              {
                gameStarted &&
                <View style={styles.orderNumberCircle}>
                  <Text style={styles.orderNumber}>{index + 1}</Text>
                </View>
              }
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.name}</Text>
                {
                  gameStarted &&
                  <Text style={styles.teamScore}>
                    {score[language]} {team.score}
                  </Text>
                }
              </View>
              <Icon
                name={gameStarted ? 'information-outline' : 'pencil'}
                type="material-community"
                size={26}
              />
            </View>
          </TouchableHighlight>
        )) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  teamContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  teamName: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  },
  teamInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 20
  },
  teamScore: {
    fontSize: 14,
    color: 'black'
  },
  orderNumberCircle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: 'silver',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNumber: {
    fontWeight: 'bold',
    color: 'black'
  }
});

export default TeamList;