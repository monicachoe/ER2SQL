import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store from '../store';

function RemoveTable (props){
  const {table} = props;

    return(
        <div>
          <form>
            <label>Name:</label>
            <input type="submit" />
          </form>
        </div>
      )
  }
}

const mapStateToProps = function(state, ownProps){
  return {
    table: state.table
  }
}

export default withRouter(connect(mapStateToProps)(RemoveTable));