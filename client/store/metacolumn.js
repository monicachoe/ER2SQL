import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COLUMNS = 'GET_COLUMNS'

/**
 * INITIAL STATE
 */
const defaultColumns = []
/**
 * ACTION CREATORS
 */
const getTables = tables => ({type: GET_TABLES, tables})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getColumns = (databaseId) =>
  dispatch =>
    axios.get(`/api/metadatabase/${databaseId}/tables`)
      .then(res =>
        dispatch(getTables(res.data)))
      .catch(err => console.log(err))
    
/**
 * REDUCER
 */
export default function (state = defaultTables, action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}