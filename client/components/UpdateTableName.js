import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {updateNameToTable} from '../store';

class UpdateTableName extends Component {
	constructor(props){
		super(props);
		this.state = {
			newName: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange (event){
		this.setstate({newName: event.target.value})
	}
	render(){
		var tables = props.tables;
	var handleSubmit = props.handleSubmit;
	return(
	    <div>
	    	<form onSubmit={handleSubmit}>
	    		<label>
	    			Table Name :
	    			<select name='tableName'>
	    				<option>-</option>
	    			</select>

	    		</label>
	    		<input  />
	    	</form>
	    </div>
	    )
}
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
