const initialState = {
  gameStarted: false
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_END_GAME':
      return {
        ...state,
        gameStarted: action.payload
      }
    default:
      return state;
  }
};

export default gameReducer;