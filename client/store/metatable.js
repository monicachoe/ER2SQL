import axios from 'axios'
import history from '../history'
import {load} from './index';

/**
 * ACTION TYPES
 */
const GET_TABLES = 'GET_TABLES'
const GET_COLUMNS = 'GET_COLUMNS'
const REMOVE = 'REMOVE'

const ADD_TABLE = 'ADD_TABLE';
const ADD_FIELD = 'ADD_FIELD';
const REMOVE_TABLE = 'REMOVE_TABLE';

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

//// FROM TEMP
// fields : [{id : integer}, {name : string}]
export const addTableToTemp = (table) =>
  dispatch => {
    let tableId, tableName;
    axios.post('/api/metatable', {'tableName' : table.tableName, 'databaseId' : table.database.id})
    .then(res => {
      tableId = res.data.id;
      tableName = table.database.name + tableId
      return res.data})
    .then(res => axios.post('/api/tables', {tableName, 'fields' : table.fields}))
    .then(() => {
      let fields = [{'id':'integer'}];
      for (let each of Object.keys(table.fields)){
        fields.push({[each] : table.fields[each].type})
      }
      fields.push({'createdAt' : 'timestamp with time zone'});
      fields.push({'updatedAt' : 'timestamp with time zone'});
      dispatch(addTable({name: table.tableName, fields, databaseId: table.database.id, tableId}))
    });
  }

export const addFieldToTable = (curTable, name, attributes) =>
  dispatch =>
    dispatch(addField(curTable, name, attributes));

export const deleteTable = (tableName, tableId, databaseId) =>
    dispatch =>
    axios.delete(`/api/tables/${tableName}`)
      // .then(res => dispatch(removeTable(tableName)))
      .then((res) => axios.delete(`/api/metatable/${tableId}`))
      .then(() => dispatch(getMetatables(databaseId))  )
      .catch(err => console.log(err))

export const clearTemp = () =>
  dispatch =>
    dispatch(remove());


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
      console.log('inside add field', action)
      let table = state.filter(each => each.tableName === action.curTable)[0];
      let otherTables = state.filter(each => each.tableName !== action.curTable);
      table.fields[action.field.name] = action.attributes;
      return [...otherTables, table];
    case REMOVE_TABLE:
      return state.filter(each => each.tableName !== action.tableName);
    default:
      return state
  }
}


