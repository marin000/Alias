import { Alert } from 'react-native';
import { newGame } from '../constants/newGameScreen';
import shortid from 'shortid';

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

const teamWithHighestScore = (allTeams, currentTeam) => {
  let teamWithHighestScore = allTeams[0];
  for (const team of [...allTeams, currentTeam]) {
    if (team.score > teamWithHighestScore.score) {
      teamWithHighestScore = team;
    }
  }
  return teamWithHighestScore;
}

const shufflePlayers = (players) => {
  const shuffledPlayers = [...players];
  let currentIndex = players.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledPlayers[currentIndex], shuffledPlayers[randomIndex]] = [
      shuffledPlayers[randomIndex],
      shuffledPlayers[currentIndex],
    ];
  }

  return shuffledPlayers;
}

const isValidNumberOfTeams = (numberOfPlayers, numberOfTeams, language) => {
  const { alertTeamNumber, alertMinTeamNumber } = newGame;
  if (numberOfTeams < 2) {
    Alert.alert(alertMinTeamNumber[language]);
    return;
  }
  const maxTeams = Math.floor(numberOfPlayers / 2);
  if (numberOfTeams > maxTeams) {
    Alert.alert(alertTeamNumber[language]);
    return;
  }
  return true
}

const createRandomTeams = (playersArray, teamNumberValue, language) => {
  const { teamTxt } = newGame;
  const teams = Array.from({ length: teamNumberValue }, () => ({ id: shortid.generate(), name: '', players: [], score: 0 }));
  let teamIndex = 0;

  playersArray.forEach((player) => {
    teams[teamIndex].name = `${teamTxt[language]} ${teamIndex + 1}`;
    const newPlayer = {
      name: player,
      score: 0,
      explains: false
    }
    teams[teamIndex].players.push(newPlayer);
    teamIndex = (teamIndex + 1) % teamNumberValue;
  });
  teams.forEach( team => {
    team.players[0].explains = true;
  })

  return teams;
};

export {
  validateTeamInput,
  getRandomWord,
  teamWithHighestScore,
  shufflePlayers,
  isValidNumberOfTeams,
  createRandomTeams
}