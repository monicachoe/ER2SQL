import axios from 'axios'
import history from '../history'
import {load} from './index';

/**
 * ACTION TYPES
 */
const GET_TABLES = 'GET_TABLES'
const REMOVE = 'REMOVE'
const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';
const REMOVE_TABLE = 'REMOVE_TABLE';
const UPDATE_TABLENAME = 'UPDATE_TABLENAME';
const UPDATE_FIELD_NAME = 'UPDATE_FIELD_NAME';

/**
 * INITIAL STATE
 */
const defaultTables = []

/**
 * ACTION CREATORS
 */
const getTables = tables => ({ type: GET_TABLES, tables })
const remove = ()=> ({type: REMOVE});
const addTable = table => ({type: ADD_TABLE, table});
const addField = (curTable, field) => ({type: ADD_FIELD, curTable, field});
const removeTable = (tableName) => ({type: REMOVE_TABLE, tableName});
const updateTableName = (curName, newName) => ({type: UPDATE_TABLENAME, curName, newName});
const updateFieldName = (field) => ({type: UPDATE_FIELD_NAME, field});
/**
 * THUNK CREATORS
 */
export const getMetatables = (databaseId) =>
  dispatch => {
    var tempRealTables = [];
    let promises = [];
    let realTables = [];
    return (
      axios.get(`/api/metadatabase/${databaseId}/tables`)
        .then(res => {
          let tables = res.data;
          tables.forEach((table) => {
            tempRealTables.push({databaseId : table.databaseId, name : table.name, tableId: table.id})
            promises.push(axios.get(`/api/metatable/${table.id}/columns`))
          });
          return promises;
        })
        .then(promises => axios.all(promises))
        .then((res) => {
            for (let i=0; i<res.length; i++){
              realTables.push(Object.assign({}, tempRealTables[i], {fields: res[i].data}));
              }
            return realTables;
          })
        .then((realTables) => {
          dispatch(getTables(realTables))
        })
        .catch(err => console.log(err))
    )
  }

export const clearMetatable = () => dispatch => {
  dispatch(remove());
}

export const createTable = (table) =>
  dispatch => {
    axios.post('/api/metatable', {'tableName' : table.tableName, 'database' : table.database, 'fields' : table.fields})
    .then(() => dispatch(getMetatables(table.database.id)))
    .catch(err => console.log(err));
  }

export const addFieldToTable = (curTable, name, attributes) =>
  dispatch =>
    dispatch(addField(curTable, name, attributes));

export const deleteTable = (tableId, databaseId) =>
    dispatch =>
    axios.delete(`/api/metatable/${databaseId}/id/${tableId}`)
      .then(() => dispatch(getMetatables(databaseId)))
      .catch(err => console.log(err))

export const putTablename = (curName, newName, databaseId) =>
  dispatch =>
    axios.put(`/api/metatable/${curName}`, {name: newName, databaseId})
    .then(res => dispatch(updateTableName(curName, newName)))
    .catch(err => console.log(err));

export const renameField = (dbName, table, oldColumn, newColumn) =>
    dispatch => {
      axios.put(`/api/table/${dbName}/id/${table.tableId}/fields`, {new: newColumn, old: oldColumn, table: table})
      .then(() => dispatch(getMetatables(table.databaseId)))
      .catch(err => console.log(err))
    }

/**
 * REDUCER
 */
export default function (state = defaultTables, action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    case REMOVE:
      return []
    case ADD_TABLE:
      return [...state, action.table];
    case ADD_FIELD:
      let table = state.filter(each => each.tableName === action.curTable)[0];
      let otherTables = state.filter(each => each.tableName !== action.curTable);
      table.fields[action.field.name] = action.attributes;
      return [...otherTables, table];
    case UPDATE_TABLENAME:
      let tables = [];
      for (let table of state){
        if (table.name === action.curName){
          tables.push(Object.assign({}, table, {name : action.newName}));
        } else {
          tables.push(table);
        }
      }
      return tables;
    case REMOVE_TABLE:
      return state.filter(each => each.tableName !== action.tableName);
    case UPDATE_FIELD_NAME:
      return  action.table;
    default:
      return state
  }
}


