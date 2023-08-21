import React from 'react';
import { ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native';
import { ListItem, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { newGame } from '../../constants/newGameScreen';

const TeamList = ({ teams, gameStarted, showTeamResult, handleTeamToEdit }) => {
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
  );
};

const styles = StyleSheet.create({
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
  }
});

export default TeamList;