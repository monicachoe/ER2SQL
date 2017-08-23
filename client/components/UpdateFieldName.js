import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import store, {updateNameToField, getMetatables} from '../store';
import history from '../history'

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
		var str = (event.target.value).split(" : ")
		var tablename = str[0];
		var oldname = str[1];

		this.setState({oldName: oldname, tableName: tablename})
	}

	handleChange2 (event){
		this.setState({newName: event.target.value})
	}

	handleSubmit (event){
		event.preventDefault()
		this.props.updateField(this.state.newName, this.state.oldName, this.state.tableName, this.props.database.name )
		history.push('/schema')
    this.props.getTables(this.props.database.id)
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
			    					each.fields.map((field, idx) => {
			    						return(
			    				    <option key={idx}>
			    				    	 {each.name} : {Object.keys(field)[0]}
			    				    </option>
			    				    )}
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
		},
		getTables(databaseId){
      dispatch(getMetatables(databaseId))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFieldName);