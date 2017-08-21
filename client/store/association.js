import axios from 'axios';

/**
 * ACTION TYPES
 */

const ADD_ASSOCIATION = 'ADD_ASSOCATION';

/**
 * ACTION CREATORS
 */
const addAssociation = (association) => ({type : ADD_ASSOCIATION, association})

/**
 * THUNK CREATORS
 */
// Make axios request too!!! --> post to database
// Assuming that posting to metatable returns the tableId!!!!!
export const createAssociation = (dbName, src, target, assocType, fkName) =>
  dispatch => {
  axios.post('/api/association', {dbName, src, target, assocType, fkName})
  .then(res => res.data)
  .then(res => dispatch(addAssociation(res)))
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_ASSOCIATION:
    return [...state, action.association]
    default:
      return state
  }
}
