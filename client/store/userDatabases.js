import axios from 'axios';


/* ------------   ACTION TYPES     ------------------ */
const LOAD_ALL_USER_DATABASES = 'LOAD_ALL_USER_DATABASES';
const REMOVE_DB = 'REMOVE_DB';


/* ------------   ACTION CREATORS     ------------------ */
const load = (userDbs) => ({type: LOAD_ALL_USER_DATABASES, userDbs });
const remove = () => ({type: REMOVE_DB});

/* ------------       REDUCERS     ------------------ */
export default function reducer(state = [], action){
  switch (action.type){
    case LOAD_ALL_USER_DATABASES:
      return action.userDbs;
    case REMOVE_DB:
      return [];
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
// unsure about the route path
// export const getUserDatabases = (userId) => dispatch => {
//   axios.get(`/api/users/${userId}/databases`)
//   .then(userDbs => {
//     dispatch(load(userDbs.data));
//   })
//   .catch(err => console.error(`Loading databases for
//   ${userId} failed`, err));
// }

export const getUserDatabases = () => dispatch => {
  axios.get(`/api/users/databases`)
  .then(userDbs => dispatch(load(userDbs.data)))
  .catch(err => console.error(`Loading databases failed`, err));
}

export const clearUserDbs = () => dispatch => {
  dispatch(remove());
}
