import axios from 'axios';
import {getMetatables} from '../store';

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

// export const createAssociation = (dbName, src, target, assocType, fkName) =>
//   dispatch => {
//     if (assocType==='many to many'){
//       axios.post('/api/metatable', {'tableName' : src.name+'_'+target.name, 'databaseId': src.databaseId})
//       .then(res => res.data.id)
//       .then(tableID => axios.post('/api/association', {dbName, src, target, assocType, fkName, 'tableId': tableID}))
//       .then(res => dispatch(getMetatables(src.databaseId)))
//       .catch(err => console.log(err));
//     } else {
//       axios.post('/api/association', {dbName, src, target, assocType, fkName})
//       .then(res => res.data)
//       .catch(err => console.log(err));
//     }
//   }

export const createAssociation = (database, src, target, assocType, fkName) =>
  dispatch => {
    if (assocType==='many to many'){
      axios.post('/api/metatable', {'tableName' : src.name+'_'+target.name, database})
      .then(() => axios.post('/api/association', {database, src, target, assocType, fkName}))
      .then(res => dispatch(getMetatables(src.databaseId)))
      .catch(err => console.log(err));
    } else {
      axios.post('/api/association', {database, src, target, assocType, fkName})
      .then(res => dispatch(getMetatables(src.databaseId)))
      .catch(err => console.log(err));
    }
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