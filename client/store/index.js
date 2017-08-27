import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import metatable from './metatable';
import database from './database';
import userdbs from './userDatabases';
import association from './association';
import data from './data';
import tableData from './tableData';

const reducer = combineReducers({user, metatable, database, userdbs, association, data, tableData});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './metatable';
export * from './database';
export * from './userDatabases';
export * from './association';
export * from './data';
export * from './tableData';
export * from './email';