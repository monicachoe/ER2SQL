import React, {Component} from 'react';
import {connect} from 'react-redux';
import {putTablename} from '../store';

class UpdateTableName extends Component {
	constructor(props){
		super(props);
		this.state = {
			valid : true
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({valid : !this.props.tables.map(each => each.name).includes(e.target.value)})
	}

	render(){
		let {database, tables} = this.props;
		return(
			<div>
				<form onSubmit={(e)=>this.props.handleSubmit(e, database)}>
					<label>
						Table Name :
						<select name='curName'>
							<option>-</option>
							{Object.keys(tables).map(each => <option key={each}>{tables[each].name}</option>)}
						</select>
					</label>
					<label>New Name: <input type='text' name='newName' onChange={this.handleChange}/></label>
					<button type="submit" disabled={!this.state.valid}>Submit</button>
					{(this.state.valid) ? null : <p>Invalid tablename</p>}
				</form>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		tables : state.metatable,
		database : state.database
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit(e, database){
			e.preventDefault();
			dispatch(putTablename(e.target.curName.value, e.target.newName.value, database.id))
		}
	}
}

export default connect(mapState, mapDispatch)(UpdateTableName);
