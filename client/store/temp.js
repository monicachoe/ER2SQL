/**
 * ACTION TYPES
 */
const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';

/**
 * INITIAL STATE
 */
// temp = [{table1:{all fields}}, {table2:{all fields}}]
const temp = []

/**
 * ACTION CREATORS
 */
const addTable = table => ({type: ADD_TABLE, table});
const addField = (curTable, field) => ({type: ADD_FIELD, curTable, field})

/**
 * THUNK CREATORS
 */
export const addTableToTemp = (table) =>
  dispatch =>
    dispatch(addTable(table));

export const addFieldToTable = (curTable, name, attributes) => 
  dispatch =>
    dispatch(addField(curTable, name, attributes));

/**
 * REDUCER
 */
export default function (state = temp, action) {
  switch (action.type) {
    case ADD_TABLE: 
      return [...state, action.table];
    case ADD_FIELD:
      let current = state[action.curTable];
      current[action.name] = action.attributes;
      return [...state, current];
    default:
      return state
  }
}