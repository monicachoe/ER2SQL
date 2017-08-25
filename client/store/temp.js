import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';
const REMOVE_TABLE = 'REMOVE_TABLE';
const REMOVE = 'REMOVE';
//const UPDATE_FIELD_NAME = 'UPDATE_FIELD_NAME';

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
const remove = () => ({type: REMOVE});
//const updateFieldName = (field) => ({type: UPDATE_FIELD_NAME, field});
/**
 * THUNK CREATORS
 */
// Make axios request too!!! --> post to database
// Assuming that posting to metatable returns the tableId!!!!! 
export const addTableToTemp = (table) =>
  dispatch => {
    let tableId, tableName;
    axios.post('/api/metatable', {'tableName' : table.tableName, 'databaseId' : table.database.id})
    .then(res => {
      tableId = res.data.id;
      tableName = table.database.name + tableId
      return res.data})
    .then(res => axios.post('/api/tables', {tableName, 'fields' : table.fields}))
    .then(() => dispatch(addTable({table, tableId})));
  }

export const addFieldToTable = (curTable, name, attributes) => 
  dispatch =>
    dispatch(addField(curTable, name, attributes));

export const deleteTable = (tableName, tableId) => 
    dispatch =>
    axios.delete(`/api/tables/${tableName}`)
      .then(res => dispatch(removeTable(tableName)))
      .then(() => axios.delete(`/api/metatable/${tableId}`))
      .catch(err => console.log(err))

export const clearTemp = () =>
  dispatch =>
    dispatch(remove());

// export const updateNameToField = (newName, oldName, tableName, databaseName) => 
//     dispatch => 
//       axios.put(`api/tables/${tableName}/${databaseName}/field`,{"new": newName, "old": oldName})
//       .then((res) => {
//         console.log("res", res)
//         dispatch(updateFieldName(res.data))
//       })
//       .catch(err => console.log(err))

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
    case REMOVE:
      return [];
      // case UPDATE_FIELD_NAME:
      // return  action.table;
    default:
      return state
  }
}