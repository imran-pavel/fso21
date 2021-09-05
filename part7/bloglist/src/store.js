import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import passwordReducer from './reducers/passwordReducer';
import usernameReducer from './reducers/usernameReducer';
import userReducer from './reducers/userReducer';
import userDataReducer from './reducers/usersDataReducer';

const reducers = {
  blogs: blogsReducer,
  notification: notificationReducer,
  username: usernameReducer,
  password: passwordReducer,
  user: userReducer,
  userData: userDataReducer
};

const preloadedState = {
  blogs: [],
  notification: null,
  username: '',
  password: '',
  user: null,
  usersData: []
};

const combinedReducers = combineReducers(reducers, preloadedState);
const store = createStore(
  combinedReducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;