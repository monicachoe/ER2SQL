import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import metatable from './metatable';
import database from './database';
import userdbs from './userDatabases';
import updateTableName from './updateTableName'
import updateField from './updateField'

const reducer = combineReducers({user, metatable, database, userdbs, updateTableName});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
// export * from './temp';
export * from './metatable';
export * from './database';
export * from './userDatabases';
export * from './updateTableName';
export * from './updateField';