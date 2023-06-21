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