import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {updateNameToTable} from '../store';

function UpdateTableName (props){
	let tables = props.tables;
	let handleSubmit = props.handleSubmit;
	return(
	    <div>
	    	<form onSubmit={handleSubmit}>
	    		<label>
	    			Table Name :
	    			<select name='tableName'><option>-</option>
	    			{Object.keys(tables).map(each => <option key={each}>table[each].tableName</option>)}
	    			</select>
	    		</label>
	    	</form>
	    </div>
	    )
	   }

const mapStateToProps = function(state, ownProps){
	return {
		tables: state.temp,
	}
}

const mapDispatchToProps = function(dispatch){
	return {
		handleSubmit(event){
			event.preventDefault();
			let tableName = event.target.name.value;
			dispatch(updateNameToTable(tableName));
		}
	}
}

	export default connect(mapStateToProps, mapDispatchToProps)(UpdateTableName);
