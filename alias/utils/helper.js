import { Alert } from 'react-native';
import { newGame } from '../constants/newGameScreen';
import { updateUser } from '../redux/actions';
import shortid from 'shortid';
import config from '../config/config';
import { errorMsg } from '../constants/errorMessages';
import countriesCodes from '../assets/countryCodes.json';
import axios from 'axios';
import apiPlayer from '../api/players';
import apiTeam from '../api/teams';
import apiResult from '../api/results';

const validateTeamInput = (teams, values, language) => {
  const { alertPlayer, alertTeam, alertTeamName, alertPlayerUnique } = newGame;
  const players = values.players.filter(player => player.trim() !== '');

  if (values.teamName.length === 0) {
    Alert.alert(alertTeam[language]);
    return;
  }
  if (players.length < 2) {
    Alert.alert(alertPlayer[language]);
    return;
  }
  if (new Set(players).size !== players.length) {
    Alert.alert(alertPlayerUnique[language]);
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

const teamWithHighestScore = (allTeams) => {
  let teamWithHighestScore = allTeams[0];
  for (const team of allTeams) {
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

const isFormValid = (numberOfTeams, players, language) => {
  const { alertTeamNumber, alertMinTeamNumber, alertPlayerUnique } = newGame;
  const filteredPlayers = players.filter(player => player.trim() !== '');

  if (numberOfTeams < 2) {
    Alert.alert(alertMinTeamNumber[language]);
    return;
  }
  const maxTeams = Math.floor(filteredPlayers.length / 2);
  if (numberOfTeams > maxTeams) {
    Alert.alert(alertTeamNumber[language]);
    return;
  }
  if (new Set(filteredPlayers).size !== filteredPlayers.length) {
    Alert.alert(alertPlayerUnique[language]);
    return;
  }
  return true
}

const createRandomTeams = (playersArray, teamNumberValue, userData, language) => {
  const { teamTxt } = newGame;
  const teams = Array.from({ length: teamNumberValue }, () => ({ id: shortid.generate(), name: '', players: [], score: 0 }));
  let teamIndex = 0;

  playersArray.forEach((player) => {
    teams[teamIndex].name = `${teamTxt[language]} ${teamIndex + 1}`;
    if (!teams[teamIndex]?.myTeam) {
      teams[teamIndex].myTeam = userData?.name === player;
    }
    const newPlayer = {
      name: player,
      scoreExplains: 0,
      scoreGuess: 0,
      explains: false
    };
    teams[teamIndex].players.push(newPlayer);
    teamIndex = (teamIndex + 1) % teamNumberValue;
  });
  teams.forEach(team => {
    team.players[0].explains = true;
  })

  return teams;
};

const uploadImage = async (img) => {
  const { cloudinaryName, cloudinaryUploadPreset, cloudinaryFetchUrl } = config;
  const formdata = new FormData();

  formdata.append("file", {
    uri: img.uri,
    type: "image/jpeg",
    name: "image.jpg"
  });
  formdata.append("cloud_name", cloudinaryName);
  formdata.append("upload_preset", cloudinaryUploadPreset);

  const res = await fetch(cloudinaryFetchUrl, {
    method: "post",
    mode: "cors",
    body: formdata,
  });
  const json = await res.json();
  return JSON.stringify(json.secure_url).replaceAll('"', '');
}

const getCountryFromIP = async () => {
  try {
    const response = await axios.get('http://ipinfo.io');
    return countriesCodes[response.data.country.toUpperCase()];
  } catch (error) {
    console.error(errorMsg.ipInfo, error);
  }
};

const updatePlayerTeamStatsDB = async (highestScoreTeam, teams, userData, dispatch) => {
  const playersTeam = teams.find(team => team.myTeam);
  const winnerTeam = highestScoreTeam.name === playersTeam.name;
  const gamesPlayedPlayer = userData.gamesPlayed + 1;
  const gamesWinPlayer = winnerTeam ? userData.gamesWin + 1 : userData.gamesWin;
  const gamesLostPlayer = winnerTeam ? userData.gamesLost : userData.gamesLost + 1;

  const updateFieldsPlayer = {
    id: userData._id,
    gamesPlayed: gamesPlayedPlayer,
    gamesWin: gamesWinPlayer,
    gamesLost: gamesLostPlayer
  };
  const result = {
    playerId: userData._id,
    teamResults: teams,
    winnerTeam: highestScoreTeam.name
  };
  try {
    await apiPlayer.updatePLayer(updateFieldsPlayer);
    await apiResult.addNewResult(result);

    if (userData.saveTeamResult) {
      const { _id, gamesPlayed, gamesWin, gamesLost } = userData.team;
      const updateFieldsTeam = {
        id: _id,
        gamesPlayed: gamesPlayed + 1,
        gamesWin: winnerTeam ? gamesWin + 1 : gamesWin,
        gamesLost: winnerTeam ? gamesLost : gamesLost + 1
      };

      const res = await apiTeam.updateTeam(updateFieldsTeam);
      userData = { ...userData, team: res.data };
    }
    dispatch(updateUser({
      ...userData,
      gamesPlayed: gamesPlayedPlayer,
      gamesWin: gamesWinPlayer,
      gamesLost: gamesLostPlayer
    }));
  } catch (err) {
    console.log(err);
  }
}

export {
  validateTeamInput,
  getRandomWord,
  teamWithHighestScore,
  shufflePlayers,
  isFormValid,
  createRandomTeams,
  uploadImage,
  getCountryFromIP,
  updatePlayerTeamStatsDB
}