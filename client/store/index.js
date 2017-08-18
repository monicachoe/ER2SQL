import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import temp from './temp';
import metatable from './metatable';
import database from './database';
import userdbs from './userDatabases';

const reducer = combineReducers({user, temp, metatable, database, userdbs});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './temp';
export * from './metatable';
export * from './database';
export * from './userDatabases';

