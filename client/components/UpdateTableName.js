import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store, {updateNameToTable} from '../store';

class UpdateTableName extends Component {
	constructor(props){
		super(props);
		this.state = {
			newName: props.tableName
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (event){
		this.setstate({newName: event.target.value})
	}

	handleSubmit (event){
		event.preventDefault();
		let table = event.target.value
		this.props.updateNameToTable(table)
	}

	render(){
		var tables = props.tables;
		return(
	    <div>
	    	<form onSubmit={handleSubmit}>
	    		<label>
	    			Table Name :
	    			<select name='tableName'>
	    				<option>-</option>
	    				{
	    					tables.map((tab) => {return (<option key={tab.id}>tab.name</option>)})
	    				}
	    			</select>
	    			<input style="text" value={this.state.newName} onChange={this.handleChange} />
	    		</label>
	    	</form>
	    </div>
	    )
		}
	 }

const mapStateToProps = function(state, ownProps){
	return {
		tables: state.temp,
		tableName: state.tableName
	}
}

const mapDispatchToProps = function(dispatch){
	return {
		updateNameToTable(table){
			dispatch(updateNameToTable(table));
		}
	}
}

	export default connect(mapStateToProps, mapDispatchToProps)(UpdateTableName);
