import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {deleteTable} from '../store';

function RemoveTable (props){
  // const {tablename} = props;
  let dummyData =['monica', 'brenda', 'vinaya', 'kelaiya'];

    return(
        <div>
          <form>
            <label>
              Table Name : 
              <select name='type'>
                {
                  dummyData.map(name => {
                  return(
                         <option value={name}>{name}</option>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemoveTable));