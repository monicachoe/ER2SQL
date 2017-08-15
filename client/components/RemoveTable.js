import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {deleteTable} from '../store';

function RemoveTable (props){
  const {table} = props;

    return(
        <div>
          <h1>Hey How are you??</h1>
        </div>
      )
}

const mapStateToProps = function(state, ownProps){
  // console.log("hey");
  // console.log("help", state.table)
  // return {
  //   table: state.table
  // }
}

const mapDispatch(dispatch) => {
  return {
    delete(event){
      event.preventDefault();
      const tableName = e.target.tableName.value;
      dispatch(deleteTable(table));
    }
  }
}

export default withRouter(connect(mapStateToProps)(RemoveTable));