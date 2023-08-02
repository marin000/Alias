const initialState = {
  userData: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;