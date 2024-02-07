import { combineReducers } from 'redux';
import { newsReducer } from './newsReducer';
import { commentsReducer } from './commentsReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
  comments: commentsReducer,
});
