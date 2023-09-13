import { createStore, combineReducers } from 'redux';
import CountinueDataReducer from './reducers/continueDataReducer';
import UpdateDataWaterReducer from './reducers/updateDataWaterReducer';

const rootReducer = combineReducers({
  continueData: CountinueDataReducer,
  updateDataWater: UpdateDataWaterReducer
});

export const store = createStore(rootReducer);