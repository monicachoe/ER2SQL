import axios from 'axios';

/* ------------   ACTION TYPES     ------------------ */
const LOAD_ALL_USER_DATABASES = 'LOAD_ALL_USER_DATABASES';

/* ------------   ACTION CREATORS     ------------------ */
const load = (userDbs) => ({type: LOAD_ALL_USER_DATABASES, userDbs });

/* ------------       REDUCERS     ------------------ */
export default function reducer(state = [], action){
  switch (action.type){
    case LOAD_ALL_USER_DATABASES:
      return action.userDbs;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
// unsure about the route path
export const getUserDatabases = (userId) => dispatch => {
  axios.get(`/api/users/${userId}/databases`)
  .then(userDbs => {
    dispatch(load(userDbs.data));
  })
  .catch(err => console.error(`Loading databases for
  ${userId} failed`, err));
}
