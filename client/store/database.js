import axios from 'axios';
import {getUserDatabases, getMetatables} from './index';

/* ------------   ACTION TYPES     ------------------ */

const CREATE = 'CREATE';
const LOAD = 'LOAD';
const REMOVE = 'REMOVE';
const GET = 'GET';


/* ------------   ACTION CREATORS     ------------------ */

const create = newDb => ({type: CREATE, newDb});
const load = (userDb) => ({type: LOAD, userDb });
const remove = () => ({type: REMOVE});
const get = database => ({type: GET, database})

/* ------------       REDUCERS     ------------------ */

export default function reducer (state = {}, action){
  switch (action.type){
    case CREATE:
      return action.newDb;
    case LOAD:
      return action.userDb;
    case REMOVE:
      return {};
    case GET:
      return action.database;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
// TODO: handleError on UI when Thunk hits the catch block: for later
export const createDatabase = (dbName, userId) => dispatch => {
    axios.post(`/api/users/${userId}/database/${dbName}`)
       .then(res => {
        dispatch(getUserDatabases())
        dispatch(loadDatabase(res.data))
       })
       .catch(error => dispatch(get({error})));
}


export const loadDatabase = (selectedDb) => dispatch => {
  dispatch(load(selectedDb));
  dispatch(getMetatables(selectedDb.id))
}

export const clearDatabase = () => dispatch => {
  dispatch(remove());
}
