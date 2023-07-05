const initialState = {
  gameStarted: false,
  currentTeamIndex: 0,
  maxScoreReached: false,
  oldWords: []
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_END_GAME':
      return {
        ...state,
        gameStarted: action.payload
      }
    case 'UPDATE_INDEX':
      return {
        ...state,
        currentTeamIndex: action.payload
      }
    case 'MAX_SCORE_REACHED':
      return {
        ...state,
        maxScoreReached: action.payload
      }
    case 'ADD_WORDS':
      return {
        ...state,
        oldWords: [...state.oldWords, ...action.payload]
      };
    default:
      return state;
  }
};

export default gameReducer;