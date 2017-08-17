import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';
const REMOVE_TABLE = 'REMOVE_TABLE';

/**
 * INITIAL STATE
 */
// temp = [{tableName: table1, fields: {all fields}}, {tableName: table2, fields: {all fields}}]
// look into changing it to object with array {listOfTable : []}
const temp = [];

/**
 * ACTION CREATORS
 */
const addTable = table => ({type: ADD_TABLE, table});
const addField = (curTable, field) => ({type: ADD_FIELD, curTable, field});
const removeTable = (tableName) => ({type: REMOVE_TABLE, tableName});
/**
 * THUNK CREATORS
 */
// Make axios request too!!! --> post to database
// Assuming that posting to metatable returns the tableId!!!!! 
export const addTableToTemp = (table) =>
  dispatch => {
    axios.post('/api/metatable', {'tableName' : table.tableName, 'databaseId' : table.databaseId})
    .then(res => res.data)
    .then(res => axios.post('/api/tables', {'tableName' : res.id, 'fields' : table.fields}))
    dispatch(addTable(table));}

export const addFieldToTable = (curTable, name, attributes) => 
  dispatch =>
    dispatch(addField(curTable, name, attributes));

export const deleteTable = (tableName) => 
    dispatch =>
    // console.log('tableName recieved: ', tableName);
    axios.delete(`/api/metatables`)
    axios.delete(`/api/tables/${tableName}`)
      .then(res => dispatch(removeTable(tableName)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = temp, action) {
  switch (action.type) {
    case ADD_TABLE: 
      return [...state, action.table];
    case ADD_FIELD:
      let table = state.filter(each => each.tableName === action.curTable)[0];
      let otherTables = state.filter(each => each.tableName !== action.curTable);
      table.fields[action.name] = action.attributes;
      return [...otherTables, table];
    case REMOVE_TABLE:
      return state.filter(each => each.tableName !== action.tableName);
    default:
      return state
  }
}