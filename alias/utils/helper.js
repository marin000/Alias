import { Alert } from 'react-native';
import { newGame } from '../constants';

const validateTeamInput = (teams, values, language) => {
  const { alertPlayer, alertTeam, alertTeamName } = newGame;

  if (values.teamName.length === 0) {
    Alert.alert(alertTeam[language]);
    return;
  }
  if (values.players.length < 2 || values.players.filter(player => player.trim() !== '').length < 2) {
    Alert.alert(alertPlayer[language]);
    return;
  }
  if (teams.findIndex(team => team.name.trim().toLowerCase() === values.teamName.trim().toLowerCase()) !== -1) {
    Alert.alert(alertTeamName[language]);
    return;
  }
  return true;
}

const getRandomWord = (gameWordList) => {
  const randomIndex = Math.floor(Math.random() * gameWordList.length);
  const word = gameWordList[randomIndex];
  gameWordList.splice(randomIndex, 1);
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export {
  validateTeamInput,
  getRandomWord
}