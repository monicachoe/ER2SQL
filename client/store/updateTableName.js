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
      console.log("h", newName, tableId)
      return(
      axios.put(`api/metatable/${tableId}`,{"name": newName})
      .then((res) => {
        console.log("h", res)
        dispatch(updateTableName(res.data))
      })
      )}

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