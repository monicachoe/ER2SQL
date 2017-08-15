import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REMOVE_TABLE = 'REMOVE_TABLE'
const CREATE_TABLE = 'CREATE_TABLE'

/**
 * INITIAL STATE
 */
const table = []

/**
 * ACTION CREATORS
 */
const removeTable = (table) => ({type: REMOVE_TABLE})
const createTable = (table) => ({type: CREATE_TABLE, table})

/**
 * THUNK CREATORS
 */

 export const fetchTable = () =>
  dispatch =>
    axios.get(`/api/${table2}`)
    .then(res => {
      console.log("this is axios", res.data);
      dispatch(createTable(res.data))
    })
    .catch(error => console.log(err))

  export const deleteTable = () =>
  dispatch =>
    axios.get(`/api/${table2}/${table2s}`)
    .then(res => {
      dispatch(fetchTable(res.data))
    })
    .catch(error => console.log(error))


/**
 * REDUCER
 */
export default function (state = table, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return action.table
    
    default:
      return state
  }
}
