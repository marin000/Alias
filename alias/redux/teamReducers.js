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
      return {
        ...state,
        teams: state.teams.map(team => {
          if (team.id === action.payload.teamId) {
            const currentPlayerIndex = team.players.findIndex(player => player.explains);

            const updatedPlayers = team.players.map((player, index) => {
              if (index === currentPlayerIndex) {
                return {
                  ...player,
                  explains: false,
                  scoreExplains: action.payload.playerScore + player.scoreExplains
                };
              } else {
                return {
                  ...player,
                  scoreGuess: action.payload.playerScore + player.scoreGuess
                };
              }
            });

            const nextPlayerIndex = (currentPlayerIndex + 1) % team.players.length;
            updatedPlayers[nextPlayerIndex] = { ...updatedPlayers[nextPlayerIndex], explains: true };

            return { ...team, players: updatedPlayers };
          }
          return team;
        })
      };
    default:
      return state;
  }
};

export default teamReducer;