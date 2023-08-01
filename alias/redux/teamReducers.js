const initialState = {
  teams: []
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TEAM':
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };
    case 'ADD_ALL_TEAMS':
      return {
        ...state,
        teams: action.payload
      };
    case 'UPDATE_TEAM':
      const updatedTeams = state.teams.map((team) => {
        if (team.id === action.payload.id) {
          return action.payload;
        }
        return team;
      });
      return {
        ...state,
        teams: updatedTeams
      };
    case 'DELETE_TEAM':
      const filteredTeams = state.teams.filter((team) => team.id !== action.payload.id);
      return {
        ...state,
        teams: filteredTeams
      };
    case 'DELETE_ALL_TEAMS':
      return {
        ...state,
        teams: []
      };
    case 'UPDATE_PLAYER_EXPLAINS':
      const teamToUpdate = state.teams.map(team => {
        if (team.id === action.payload.teamId) {
          let currentPlayerIndex
          const currentPlayer = team.players.find((player, index) => {
            if (player.explains) {
              currentPlayerIndex = index;
              return true;
            }
          });
          const updatedPlayers = [...team.players];

          if (currentPlayer) {
            updatedPlayers[currentPlayerIndex] = {
              ...updatedPlayers[currentPlayerIndex],
              explains: false,
              score: action.payload.playerScore + currentPlayer.score
            };
          }

          const nextPlayerIndex = (currentPlayerIndex + 1) % team.players.length;
          updatedPlayers[nextPlayerIndex] = { ...updatedPlayers[nextPlayerIndex], explains: true };

          return { ...team, players: updatedPlayers };
        }
        return team;
      });
      return {
        ...state,
        teams: teamToUpdate
      };
    default:
      return state;
  }
};

export default teamReducer;