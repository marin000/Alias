export const addTeam = (team) => ({
  type: 'ADD_TEAM',
  payload: team
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
})