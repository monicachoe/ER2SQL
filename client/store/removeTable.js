import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REMOVE_TABLE = 'REMOVE_TABLE'

/**
 * INITIAL STATE
 */
const table = []

/**
 * ACTION CREATORS
 */
const removeTable = (table) => ({type: REMOVE_TABLE})

/**
 * THUNK CREATORS
 */
export const removeTable = () =>
  dispatch =>
    axios.get(`/api/${tablename}`)
      .then(res => {
        dispatch(removeTable(res.data))
      })
      .catch(error =>
        dispatch(getUser({error})))
/**
 * REDUCER
 */
export default function (state = table, action) {
  switch (action.type) {
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
