import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import temp from './temp';
import metatable from './metatable';
import createdb from './createdb';
import removeTable from './removeTable';

const reducer = combineReducers({user, temp, metatable, createdb, removeTable});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './temp';
export * from './metatable'
export * from './createdb'
export * from './removeTable';
