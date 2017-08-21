import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {deleteTable} from '../store';

function RemoveTable (props){
  let tables = props.tables;
  let handleSubmit = props.handleSubmit;
    return(
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Table Name : 
              <select name='tableName'><option>-</option>
                {Object.keys(tables).map(each => <option key={each}>{tables[each].id} {tables[each].name}</option>)}
              </select>
            </label>
            <input type='submit' />
          </form>
        </div>
      )
}

const mapStateToProps = function(state){
  return {
    tables : state.metatable,
    database : state.database
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(e){
      e.preventDefault();
      let splitName = e.target.tableName.value.split(" ");
      let tableName = splitName[0]+splitName[1]+'s';
      dispatch(deleteTable(tableName, Number(splitName[1])));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTable);