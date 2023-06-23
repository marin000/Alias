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
    default:
      return state;
  }
};

export default teamReducer;