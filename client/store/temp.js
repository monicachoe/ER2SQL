/**
 * ACTION TYPES
 */
const ADD_TABLE = 'ADD_TABLE';

/**
 * INITIAL STATE
 */
const temp = []

/**
 * ACTION CREATORS
 */
const addTable = tableName => ({type: ADD_TABLE, table});

/**
 * THUNK CREATORS
 */
export const addTableToTemp = (table) =>
  dispatch =>
    dispatch(addTable(table));

/**
 * REDUCER
 */
export default function (state = temp, action) {
  switch (action.type) {
    case ADD_TABLE: 
      return [...state, action.table];
    default:
      return state
  }
}
