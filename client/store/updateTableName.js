import axios from 'axios';

/**
 * ACTION TYPES
 */
const UPDATE_TABLE_NAME = 'UPDATE_TABLE_NAME';

/**
 * INITIAL STATE
 */
const table = {};

/**
 * ACTION CREATORS
 */
const updateTableName = (table) => ({type: UPDATE_TABLE_NAME, table});
/**
 * THUNK CREATORS
 */

export const updateNameToTable = (newName, tableId, tableName, databaseName) =>
    dispatch => 
      axios.put(`api/tables/${tableName}/${databaseName}`,{"name": newName})
      .then((res) => {
        dispatch(updateTableName(res.data))
      })
      .then(() => axios.put(`api/metatable/${tableName}`,{"name": newName}))
      .catch(err => console.log(err))
    

/**
 * REDUCER
 */
export default function (state = table, action) {
  switch (action.type) {
    case UPDATE_TABLE_NAME:
      return  action.table;
    default:
      return state
  }
}