import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getTableData} from '../store'
import ReactDataGrid from 'react-data-grid'

class TableData extends Component{
  constructor(props){
    super(props);
    this.state = {
       table: {},
      _columns: [],
      _rows: [],
      _rowCount: 0
    }
    this.rowGetter = this.rowGetter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("In componentWillRecieveProps...", nextProps);
    if(nextProps.tableData &&   nextProps.tableData.rows !== this.state._rows){
      this.setState({_columns: nextProps.tableData.columns});
      this.setState({_rows: nextProps.tableData.rows});
      this.setState({_rowCount: nextProps.tableData.rowCount});
    }
  }

  handleChange(evt){
    let table = this.props.metatable[evt.target.value];
    this.setState({table: table})

  }

  handleSubmit (evt){
    evt.preventDefault();
    this.props.getData(this.state.table, this.props.database.name);
    
  }

  rowGetter(i) {
    return this.state._rows[i];
  }

  render(){
    console.log("state: ", this.state);
    return (
      <div>
      <form onSubmit= {this.handleSubmit}>
      <label htmlFor="data">Select Table</label>
      <select name="data" onChange={this.handleChange}>
        <option>-select-</option>
        {this.props.metatable && this.props.metatable.map((table, idx) =>
           (<option key={table.tableId} value={idx}>{table.name}</option>)
        )}
      </select>
      <button type="submit">View Data</button>
    </form>
      {
        (this.state._rowCount > 0)
        ? <ReactDataGrid
          columns={this.state._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state._rowCount}
          />
        : ''
      }
      </div>
    );
  }
}

const mapState = ({metatable, database, tableData}) => ({metatable, database, tableData});

const mapDispatch = (dispatch) => {
   return {
    getData(table, dbName){
      console.log('from dispatch: ', table, dbName);
      dispatch(getTableData(table, dbName));
    }
  }
}

export default connect(mapState, mapDispatch)(TableData);

