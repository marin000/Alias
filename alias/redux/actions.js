export const addTeam = (team) => ({
  type: 'ADD_TEAM',
  payload: team
});

export const addAllTeams = (teams) => ({
  type: 'ADD_ALL_TEAMS',
  payload: teams
});

export const updateTeam = (team) => ({
  type: 'UPDATE_TEAM',
  payload: team
});

export const deleteTeam = (team) => ({
  type: 'DELETE_TEAM',
  payload: team
});

export const deleteAllTeams = () => ({
  type: 'DELETE_ALL_TEAMS'
});

export const gameStartEnd = (boolean) => ({
  type: 'START_END_GAME',
  payload: boolean
});

export const updateTeamIndex = (newIndex) => ({
  type: 'UPDATE_INDEX',
  payload: newIndex
});

export const updatePlayerExplains = (teamId, playerScore) => ({
  type: 'UPDATE_PLAYER_EXPLAINS',
  payload: { teamId, playerScore }
});

export const updateMaxScoreReached = (boolean) => ({
  type: 'MAX_SCORE_REACHED',
  payload: boolean
});

export const addOldWords = (words) => ({
  type: 'ADD_WORDS',
  payload: words
});