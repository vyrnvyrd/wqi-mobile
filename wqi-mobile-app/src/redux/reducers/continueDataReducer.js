const initialState = {
  continueData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONTINUE_SCREEN':
      return {
        ...state,
        continueData: action.payload,
      };
    default:
      return state;
  }
};