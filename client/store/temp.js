import axios from 'axios';

/** ACTION TYPES **/
const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';
const REMOVE_TABLE = 'REMOVE_TABLE';
const REMOVE = 'REMOVE';

/** INITIAL STATE **/
const temp = [];

/** ACTION CREATORS **/
const addTable = table => ({type: ADD_TABLE, table});
const addField = (curTable, field) => ({type: ADD_FIELD, curTable, field});
const removeTable = (tableName) => ({type: REMOVE_TABLE, tableName});
const remove = () => ({type: REMOVE});

/** THUNK CREATORS **/
export const addTableToTemp = (table) =>
  dispatch => {
    let tableId, tableName;
    axios.post('/api/metatable', {'tableName' : table.tableName, 'databaseId' : table.database.id})
    .then(res => {
      tableId = res.data.id;
      tableName = table.database.name + tableId
      return res.data})
    .then(res => axios.post('/api/tables', {tableName, 'fields' : table.fields}))
    .then(() => dispatch(addTable({name: table.tableName, fields: Object.keys(table.fields), databaseId: table.database.id, tableId})));
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

/** REDUCER **/
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
    default:
      return state
  }
}