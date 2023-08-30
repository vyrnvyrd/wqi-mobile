import { createStore, combineReducers } from 'redux';
import CountinueDataReducer from './reducers/continueDataReducer';

const rootReducer = combineReducers({
  continueData: CountinueDataReducer,
});

export const store = createStore(rootReducer);