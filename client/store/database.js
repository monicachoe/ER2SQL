import axios from 'axios';

/* ------------   ACTION TYPES     ------------------ */

const CREATE = 'CREATE';
const LOAD = 'LOAD';


/* ------------   ACTION CREATORS     ------------------ */

const create = newDb => ({type: CREATE, newDb});
const load = (userDb) => ({type: LOAD, userDb });

/* ------------       REDUCERS     ------------------ */

export default function reducer (state = {}, action){
  switch (action.type){
    case CREATE:
      return action.newDb;
    case LOAD:
      return action.userDb;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
// unsure about the route path databases/


export const createDatabase = (dbName, userId) => dispatch => {
    axios.post(`/api/users/${userId}/${dbName}`)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating databse ${dbName} unsuccessfull`, err));
}


