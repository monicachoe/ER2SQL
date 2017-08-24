import axios from 'axios';

/* ------------   ACTION TYPES     ------------------ */

const GET_TABLE_DATA = 'GET_TABLE_DATA';


/* ------------   ACTION CREATORS     ------------------ */

const get = (data)=> ({type: GET_TABLE_DATA, data});

/* ------------       REDUCERS     ------------------ */

export default function reducer (state = {}, action){
  switch (action.type){
    case GET_TABLE_DATA:
      return action.data;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const getTableData =  (table, dbName) => (dispatch) => {
  console.log("thunk: ", table, dbName)
  axios.get(`/api/data/${dbName}/id/${table.tableId}`)
  .then(result => {
    let columns = result.data.fields.map(field => {
      return ({key: field.name, name: field.name});
    });
    const data = {columns: columns, rows: result.data.rows, rowCount: result.data.rowCount};
    dispatch(get(data));
  })
  .catch(err => console.error(`Getting data of ${table.name} unsuccessfull`, err));
}
