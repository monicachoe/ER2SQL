import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import store, {updateNameToField} from '../store';

class UpdateFieldName extends Component {
	constructor(props){
		super(props);
		this.state = {
			newName: '',
			oldName: '',
			tableName: ''
		}
	this.handleChange1 = this.handleChange1.bind(this)
	this.handleChange2 = this.handleChange2.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange1 (event){
		var attribute = event.target.value;
		var tables = this.props.tables;
		var database = this.props.database;
		var databaseId 
		var tablename
		var databasename
		console.log("database", database)
		console.log("tables", tables[0])
		// tables.filter(function(table) {
		// 	if (table['fields'].includes(attribute)){
		// 		tablename = table.name
		// 		databaseId = table.databaseId
		// 	}
		// })
		// database.filter(function(datab){
		// 	if(datab.id === databaseId){
		// 		databasename = database.name
		// 	}
		// })
		var str = (event.target.value).split(" : ")
		var tablename = str[0];
		var oldname = str[1];
console.log("event.target", event.target)
		console.log("old",oldname)
		this.setState({oldName: oldname, tableName: tablename})
		//console.log("state", this.state.databaseName, "name", database.name)
	}

	handleChange2 (event){
		console.log("new", event.target.value)
		this.setState({newName: event.target.value})
	}

	handleSubmit (event){
		event.preventDefault()
		console.log("table", this.state.tableName, "old", this.state.oldName, "new", this.state.newName, this.props.database.name)
		this.props.updateField(this.state.newName, this.state.oldName, this.state.tableName, this.props.database.name )
	}

	render(){
		var tables = this.props.tables;
		console.log("tables", tables)
		return(
		    <div>
		    <form onSubmit={this.handleSubmit}>
		    	<label>
		    		Field Name : 
		    		<select value={this.state.tableId} onChange={this.handleChange1}>
		    			<option>-</option>
		    			{

		    				tables.map(each => 
		    					each.fields.map(field => 
		    				    <option key={field}>
		    				    	 {each.name} : {field}
		    				    </option>
		    				  )
		    				 )
		    			}
		    		</select>
		    		<input type="text" onChange={this.handleChange2} />
		    	</label>
		    	<button type="submit">Submit</button>
		    </form>
		    </div>
		  )
	}
}

const mapStateToProps = function(state){
	return {
		tables: state.metatable,
		database: state.database
	}
}

const mapDispatchToProps = function(dispatch){
	return {
		updateField(newName, oldName, tableName, databaseName){
			dispatch(updateNameToField(newName, oldName, tableName, databaseName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFieldName);