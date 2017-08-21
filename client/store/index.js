import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import metatable from './metatable';
import database from './database';
import userdbs from './userDatabases';
import association from './association';

<<<<<<< HEAD
const reducer = combineReducers({user, temp, metatable, database, userdbs, association});
=======
const reducer = combineReducers({user, metatable, database, userdbs});
>>>>>>> c6e3237db3ac7624af9685fc251d24b24a815f7d
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
// export * from './temp';
export * from './metatable';
export * from './database';
export * from './userDatabases';
export * from './association';
