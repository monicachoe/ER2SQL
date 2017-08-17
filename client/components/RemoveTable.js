import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {deleteTable} from '../store';

function RemoveTable (props){
  // const {tablename} = props;
  let dummyData =['monica', 'brenda', 'vinaya', 'kelaiya'];
  let tables = props.tables;
  let keys = Object.keys(tables);
  console.log('tables are: ', tables, props.tables)
  let handleSubmit = props.handleSubmit;
    return(
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Table Name : 
              <select name='tableName'><option>-</option>
                {keys.map(each => <option key={each}>{tables[each].table.database.name} {tables[each].tableId} {tables[each].table.tableName}</option>)}
              </select>
            </label>
            <input type='submit' />
          </form>
        </div>
      )
}

const mapStateToProps = function(state, ownProps){
  return {
    tables : state.temp,
    database : state.database
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // delete(event){
    //   event.preventDefault();
    //   const tableName = e.target.tablename.value;
    //   onClick: () => dispatch(deleteTable(table));
    // },
    handleSubmit(e){
      e.preventDefault();
      let splitName = e.target.tableName.value.split(" ");
      let tableName = splitName[0]+splitName[1]+'s';
      dispatch(deleteTable(tableName, Number(splitName[1])));
      console.log('submitted!', e.target.tableName.value);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTable);