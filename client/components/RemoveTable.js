import React, {Component} from 'react';
import { connect } from 'react-redux';
import {deleteTable} from '../store';

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
    console.log("from handleChange: ", tableName);
    this.setState({tableName: tableName, tableId: evt.target.value})
  }

  handleSubmit(evt){
    evt.preventDefault();
    console.log("from handleSubmit: ", this.state.tableName);
    this.props.removeTable(this.state.tableName, this.state.tableId);
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
    removeTable(tableName, tableId){
      dispatch(deleteTable(tableName, Number(tableId)));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTable);
