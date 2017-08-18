import axios from 'axios'
import history from '../history'
import {load} from './index';

/**
 * ACTION TYPES
 */
const GET_TABLES = 'GET_TABLES'
const GET_COLUMNS = 'GET_COLUMNS'
const REMOVE = 'REMOVE'

/**
 * INITIAL STATE
 */
const defaultTables = []

/**
 * ACTION CREATORS
 */
const getTables = tables => ({ type: GET_TABLES, tables })
const remove = ()=> ({type: REMOVE});
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
// export const getMetatables = (databaseId) =>
//   dispatch => {
//     return (
//       axios.get(`/api/metadatabase/${databaseId}/tables`)
//         .then(res => {
//           let tables = res.data;
//           var realTables = [];
//           let promies = [];
//           tables.map((table) => {
//             axios.get(`/api/metatable/${table.id}/columns`)
//               .then((columns) => {
//                 console.log('COLUMNS LOGGING HERE', columns);
//                 let tableData = {}
//                 tableData.databaseId = table.databaseId
//                 tableData.name = table.name;
//                 tableData.columns = columns.data
//                 tableData.id = table.id
//                 realTables.push(tableData)
//               })
//           })
//           return realTables
//         })
//         .then((realTables) => {
//           console.log(" From thunk metatble: ", realTables.length, Array.isArray(realTables), realTables);
//           dispatch(getTables(realTables))
//         })
//         .catch(err => console.log(err))
//     )
//   }

export const getMetatables = (databaseId) =>
  dispatch => {
    var tempRealTables = [];
    let promises = [];
    let realTables = []
    return (
      axios.get(`/api/metadatabase/${databaseId}/tables`)
        .then(res => {
          let tables = res.data;
          tables.forEach((table) => {
            tempRealTables.push({databaseId : table.databaseId, name : table.name})
            promises.push(axios.get(`/api/metatable/${table.id}/columns`))
          });
          return promises;
        })
        .then(promises => axios.all(promises))
        .then((res) => {
            console.log('axios.all promise: ',res)
            for (let i=0; i<res.length; i++){
              realTables.push(Object.assign({}, tempRealTables[i], {fields: res[i].data}));
              }
            return realTables;
          })
        .then((realTables) => {
          console.log(" From thunk metatble: ", realTables.length, Array.isArray(realTables), realTables);
          dispatch(getTables(realTables))
        })
        .catch(err => console.log(err))
    )
  }

export const clearMetatable = () => dispatch => {
  dispatch(remove());
}
// dispatch(getTables(res.data)))


/**
 * REDUCER
 */
export default function (state = defaultTables, action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    case REMOVE:
      return []
    default:
      return state
  }
}
