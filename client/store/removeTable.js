import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REMOVE_TABLE = 'REMOVE_TABLE'
const TABLE_NAME = 'TABLE_NAME'
const CREATE_TABLE = 'CREATE_TABLE'

/**
 * INITIAL STATE
 */
const table = []
const tablename = {}

/**
 * ACTION CREATORS
 */
const removeTable = (table) => ({type: REMOVE_TABLE})
const createTable = (table) => ({type: CREATE_TABLE, table})
const tableName = (tablename) => ({type: TABLE_NAME, tablename})

/**
 * THUNK CREATORS
 */

 export const fetchTable = () =>
  dispatch =>
    axios.get('/api/table')
    .then(res => {
      console.log("this is axios", res.data);
      dispatch(createTable(res.data))
    })
    .catch(error => console.log(error))

  export const deleteTable = () =>
  dispatch =>
    axios.get(`/api/${table}/${table}`)
    .then(res => {
      dispatch(fetchTable(res.data))
    })
    .catch(error => console.log(error))

  export const fetchTableName = (table, databaseid) =>
  dispatch =>
    axios.get(`/api/${table}/${table}/${databaseid}`)
    .then(res => {
      dispatch(tableName(res.data))
    })
    .catch(error => console.log(error))


/**
 * REDUCER
 */
export default function (state = table, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return action.table
    case TABLE_NAME:
      return action.tablename
    default:
      return state
  }
}
