import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAssociation} from '../store';

// class Association extends Component {
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return (
//       <h1>In Association</h1>
//     );
//   }
// }

const Association = (props) => {
  let tables = props.tables;
  let assocTypes = ['one to one', 'one to many', 'many to one', 'many to many'];
  console.log('tables: ', tables);
  let handleSubmit = props.handleSubmit;
  return (
    <form onSubmit={(e)=>handleSubmit(e, props.database)}>
      <label>Table1: <select name='table1'>
          <option>-</option>
          {tables.map(each => <option key={each.tableId} value={each.tableId}>{each.table.tableName}</option>)}
        </select>
      </label>
      <label>Table2: <select name='table2'>
          <option>-</option>
          {tables.map(each => <option key={each.tableId} value={each.tableId}>{each.table.tableName}</option>)}
        </select>
      </label>
      <label>Association Type: <select name='associationType'>
          <option>-</option>
          {assocTypes.map(each => <option key={each} value={each}>{each}</option>)}
        </select>
      </label>
      <input type='submit' />
    </form>
  )
}

const mapState = (state) => {
  return {
    tables : state.temp,
    database : state.database
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e, database){
      e.preventDefault();
      console.log('target: ', e.target, e.target.table1.value, e.target.table2.value, e.target.associationType.value)
      const dbname = database.name;
      const id1 = e.target.table1.value;
      const id2 = e.target.table2.value;
      const assocType = e.target.associationType.value;
      dispatch(createAssociation(dbname, id1, id2, assocType));
    }
  }
};

export default connect(mapState, mapDispatch)(Association);
// export default Association;
