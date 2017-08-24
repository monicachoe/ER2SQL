//import axios from 'axios';

/**
 * ACTION TYPES
 */
// const UPDATE_FIELD_NAME = 'UPDATE_FIELD_NAME';

// /**
//  * INITIAL STATE
//  */
// const field = {};

// /**
//  * ACTION CREATORS
//  */
// const updateFieldName = (field) => ({type: UPDATE_FIELD_NAME, field});
// /**
//  * THUNK CREATORS
//  */

// export const updateNameToField = (newName, oldName, tableName, databaseName) => 
//     dispatch => 
//       axios.put(`api/tables/${tableName}/${databaseName}/field`,{"new": newName, "old": oldName})
//       .then((res) => {
//         dispatch(updateFieldName(res.data))
//       })
//       .catch(err => console.log(err))

    

// /**
//  * REDUCER
//  */
// export default function (state = field, action) {
//   switch (action.type) {
//     case UPDATE_FIELD_NAME:
//       return  action.field;
//     default:
//       return state
//   }
// }