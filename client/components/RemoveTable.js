import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {deleteTable} from '../store';

function RemoveTable (props){
  const {tablename} = props;

    return(
        <div>
          <form>
            <label>
              Table Name : 
              <select name='type'>
                {
                  tablename.map(name => {
                  return(
                         <option>name</option>
                        )
                  })
                }
              </select>
            </label>
            <button></button> 
          </form>
        </div>
      )
}

const mapStateToProps = function(state, ownProps){
  console.log("hey");
  console.log("help", state.tablename)
  return {
    tablename: state.tablename
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete(event){
      event.preventDefault();
      const tableName = e.target.tablename.value;
      onClick: () => dispatch(deleteTable(table));
    }
  }
}

export default withRouter(connect(mapStateToProps)(RemoveTable));