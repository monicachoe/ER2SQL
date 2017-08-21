import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import store, {updateNameToTable} from '../store';

class UpdateTableName extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			newName: '',
			tableId: 0,
			name: '',
			databaseName: ''
		}
		this.handleChange1 = this.handleChange1.bind(this)
		this.handleChange2 = this.handleChange2.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange1(event){
		console.log("eve", event.target.value)
		var str = (event.target.value).split(" ");
		var num = Number(str[1]);
		var nam = str[0];
		var datab = this.props.database.name
		//console.log("y", typeof(ans))
		this.setState({tableId: num, name: nam, databaseName: datab})
	}

	handleChange2 (event){
		console.log("handle", event.target.value)
		this.setState({newName: event.target.value});
	}

	handleSubmit (event){
		event.preventDefault();
		//let table = event.target.value
		// console.log("table", table)
		// console.log("event target", event.target)
		// let splitName = event.target.tableName.value.split(" ");
  //   let tableName = splitName[0]+splitName[1]+'s';
		this.props.updateN(this.state.newName, this.state.tableId, this.state.name, this.state.databaseName )
	}

	render(){
		var tables = this.props.tables;
		var database = this.props.database;
		console.log("table", tables)
		return(
	    <div>
	    	<form onSubmit={this.handleSubmit}>
	    		<label>
	    			Table Name :
	    			<select value={this.state.tableId} onChange={this.handleChange1}>
	    				<option>-</option>
	    				{
	    					Object.keys(tables).map(each => 
	    					  <option key={each}>
	    					  	{tables[each].name} {tables[each].tableId}
	    					  </option>
	    					)
	    				}
	    			</select>
	    			<input type="text" value={this.state.newName} onChange={this.handleChange2} />
	    		</label>
	    		<button type="submit">Submit</button>
	    	</form>
	    </div>
	    )
		}
	 }

const mapStateToProps = function(state){
	console.log("props", state.metatable, "there", state.updateTableName, "data", state.database)
	return {
		tables: state.metatable,
		table: state.table,
		database: state.database
	}
}

const mapDispatchToProps = function(dispatch){
	return {
		updateN(newName, tableId, name, databaseName){
			dispatch(updateNameToTable(newName, tableId, name, databaseName));
		}
	}
}

	export default connect(mapStateToProps, mapDispatchToProps)(UpdateTableName);
