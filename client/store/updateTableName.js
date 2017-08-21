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

export const updateNameToTable = (newName, tableId) =>
    dispatch => {
      var table = [];
      return(
      axios.put(`api/metatable/${tableId}`,newName)
      .then((res) => dispatch(updateTableName(res.data)))
      )}

/**
 * REDUCER
 */
export default function (state = tableName, action) {
  switch (action.type) {
    case UPDATE_TABLE_NAME:
      return  action.table;
    default:
      return state
  }
}