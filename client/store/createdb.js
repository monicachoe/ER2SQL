import axios from 'axios';

/* ------------   ACTION TYPES     ------------------ */

const CREATE = 'CREATE';


/* ------------   ACTION CREATORS     ------------------ */

const create = status => ({type: CREATE, status});

/* ------------       REDUCERS     ------------------ */

export default function reducer (state = "failure", action){
  switch (action.type){
    case CREATE:
      return action.status;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
// unsure about the route path
export const createDatabase = (dbName, userID) => dispatch => {
    axios.post(`/api/$(userID)/$(dbName)`)
       .then(res => {
         console.log(res.data);
         dispatch(create("success"))
       })
       .catch(err => console.error(`Creating databse $(dbName) unsuccessfull`, err));
}
