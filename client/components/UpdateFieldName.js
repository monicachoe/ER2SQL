import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renameField, getMetatables } from '../store';
import history from '../history'

class UpdateFieldName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newColumn: '',
			oldColumn: '',
			table: {}
		}
		this.handleOldColumn = this.handleOldColumn.bind(this)
		this.handleNewColumn = this.handleNewColumn.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleOldColumn(event) {
		var tableColumn = (event.target.value).split(': ')
		var tablename = tableColumn[0];
		var selectedColumn = tableColumn[1];
		this.setState({ oldColumn: selectedColumn, table: this.props.tables.filter(table => (table.name === tablename))[0] })
	}

	handleNewColumn(event) {
		this.setState({ newColumn: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.updateField(this.props.database.name, this.state.table, this.state.oldColumn, this.state.newColumn)
		history.push('/schema')
		this.props.getTables(this.props.database.id)
	}

	render() {
		var tables = this.props.tables;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Field Name :
			    		<select value={this.state.tableId} onChange={this.handleOldColumn}>
							<option>-</option>
							{
								tables.map(table =>
									table.fields.map((field, idx) => {
										return (!(Object.keys(field)[0] === 'id' ||
											Object.keys(field)[0] === 'createdAt' ||
											Object.keys(field)[0] === 'updatedAt'))
											? (<option key={idx}> {table.name}: {Object.keys(field)[0]} </option>)
											: ''
									}))
							}
						</select>
						<input type="text" onChange={this.handleNewColumn} />
					</label>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		tables: state.metatable,
		database: state.database
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		updateField(dbName, table, oldColumn, newColumn) {
			dispatch(renameField(dbName, table, oldColumn, newColumn))
		},
		getTables(databaseId) {
			dispatch(getMetatables(databaseId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFieldName);
