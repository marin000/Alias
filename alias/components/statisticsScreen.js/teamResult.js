import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default function TeamResult({ resultItem, teamItem, userData }) {

  return (
    <View style={styles.imageAndTextContainer}>
      {teamItem.players.some(player => player.name === userData.name) ? (
        userData.image ? (
          <Image source={{ uri: userData.image }} style={styles.profilePicture} />
        ) : (
          <Icon name="account-circle" type="material-community" size={25} color={'white'} />
        )
      ) : <Text style={styles.nullPic}></Text>}
      <View style={styles.textContainer}>
        <Text style={teamItem.name === resultItem.winnerTeam ? styles.winnerTeam : styles.defeatedTeam}>
          {teamItem.name}
        </Text>
        <Text style={teamItem.name === resultItem.winnerTeam ? styles.winnerTeam : styles.defeatedTeam}>{teamItem.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginRight: 22
  },
  winnerTeam: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 8
  },
  defeatedTeam: {
    fontWeight: 'bold',
    color: '#8c8c8c',
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 8
  },
  profilePicture: {
    width: 20,
    height: 20,
    borderRadius: 60,
    marginLeft: 15
  },
  nullPic: {
    width: 20,
    marginLeft: 15
  }
});