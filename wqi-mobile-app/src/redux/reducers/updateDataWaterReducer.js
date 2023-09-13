const initialState = {
  updateDataWater: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA_WATER_QUALITY':
      return {
        ...state,
        updateDataWater: action.payload,
      };
    default:
      return state;
  }
};