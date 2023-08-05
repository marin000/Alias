import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Text, Icon, Divider } from '@rneui/themed';
import { profile } from '../../constants/profileScreen';
import { globalStyles } from '../../styles/global';

export default function TeamStats({ showTeamStats, toggleTeamStats, team, language }) {
  const { playedTxt, wonTxt, lostTxt } = profile;
  return (
    <>
      <TouchableHighlight onPress={toggleTeamStats} underlayColor="transparent">
        <View style={globalStyles.profileRow}>
          <Icon name="shield-account" type="material-community" size={24} />
          <Text style={globalStyles.profileInfo}>{team.name}</Text>
          <Icon
            name={showTeamStats ? 'chevron-up' : 'chevron-down'}
            type="material-community"
            size={24}
            color={'#6e88a1'}
          />
        </View>
      </TouchableHighlight>

      {showTeamStats && (
        <>
          <Divider style={globalStyles.profileDivider} />
          <View style={globalStyles.profileRow}>
            <Text style={styles.subInfo}>{playedTxt[language]}{team.gamesPlayed}</Text>
          </View>
          <Divider style={globalStyles.profileDivider} />
          <View style={globalStyles.profileRow}>
            <Text style={styles.subInfo}>{wonTxt[language]}{team.gamesWin}</Text>
          </View>
          <Divider style={globalStyles.profileDivider} />
          <View style={globalStyles.profileRow}>
            <Text style={styles.subInfo}>{lostTxt[language]}{team.gamesLost}</Text>
          </View>
        </>
      )}
      <Divider style={globalStyles.profileDivider} />
    </>
  );
};

const styles = StyleSheet.create({
  subInfo: {
    marginLeft: 34,
    color: 'gray',
  }
});