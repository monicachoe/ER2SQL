import React, {Component} from 'react';
import { connect } from 'react-redux';
import {deleteTable, getMetatables} from '../store';
import history from '../history'

class RemoveTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      tableName: '',
      tableId: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    let tableName = this.props.database.name + evt.target.value + 's';
    this.setState({tableName: tableName, tableId: evt.target.value})
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.removeTable(this.state.tableId, this.props.database.id);
    // history.push('/schema')
    // this.props.getTables(this.props.database.id)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="tableName">Table Name :</label>
          <select name='tableName' onChange={this.handleChange}>
            <option>-select-</option>
            {this.props.tables && this.props.tables.map(table =>
               (<option key={table.tableId} value={table.tableId}>
                  {table.name}
                </option>)
            )}
            </select>

          <input type='submit' />
        </form>
      </div>
    )
  }

}

const mapStateToProps = function(state){
  return {
    tables : state.metatable,
    database : state.database
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTable(tableName, tableId, databaseId){
      dispatch(deleteTable(tableName, Number(tableId), databaseId));
    },
    getTables(databaseId){
      dispatch(getMetatables(databaseId))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTable);
