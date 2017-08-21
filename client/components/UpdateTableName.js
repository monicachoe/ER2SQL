import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import store, {updateNameToTable} from '../store';

class UpdateTableName extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			tableName: props.tableName,
			id: props.tableId
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (event){
		console.log("handle", event.target.value)
		this.setstate({tableName: event.target.value})
	}

	handleSubmit (event){
		event.preventDefault();
		let table = event.target.value
		this.props.updateNameToTable(table)
	}

	render(){
		var tables = this.props.tables;
		console.log("table", tables)
		return(
	    <div>
	    	<form onSubmit={this.handleSubmit}>
	    		<label>
	    			Table Name :
	    			<select name='tableName'>
	    				<option>-</option>
	    				{
	    					Object.keys(tables).map(each => <option key={each}>{tables[each].table.tableName}</option>)
	    				}
	    			</select>
	    			<input type="text" value={this.state.tableName} onChange={this.handleChange} />
	    		</label>
	    		<input type="submit" />
	    	</form>
	    </div>
	    )
		}
	 }

const mapStateToProps = function(state){
	console.log("props", state.temp)
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
