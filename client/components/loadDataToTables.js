import React,{Component} from 'react'
import {connect} from 'react-redux'
import { uploadDataAsCsv } from '../store'

class LoadData extends Component{
  constructor(props){
    super(props);
    this.state = {
      table: {},
      file: '',
      fileUrl: ''
    }
    this.handleTable = this.handleTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleTable(evt){
    let table = this.props.metatable[evt.target.value];
    this.setState({table: table});
  }

  handleSubmit(evt){
    evt.preventDefault();
    let tableName = this.props.database.name + this.state.table.tableId + 's';
    this.props.fileUpload(this.state.file, tableName);
  }

  handleFile(e){
    e.preventDefault();
    let file = e.target.files[0];
    this.setState({file: file});
  }

  render(){
    return (
      <div className = 'modal-load-data'>
        <form className = 'load-data' onSubmit={this.handleSubmit}>
          <select name="table" onChange={this.handleTable}>
            <option>-select-</option>
            {this.props.metatable && this.props.metatable.map((table, idx) =>
              (<option key={idx} value={idx}>
              {table.name}</option>)
            )}
          </select>
          <input type="file" accept=".csv" onChange={this.handleFile} />
          <button type="submit" onSubmit={this.handleSubmit}>Upload Data</button>
        </form>
      </div>
    );
  }
}

const mapState = ({database, metatable}) => ({database, metatable});

const mapDispatch = dispatch => {
  return {
    fileUpload(file, tableName){
      dispatch(uploadDataAsCsv(file, tableName));
    }
  }
}

export default connect(mapState, mapDispatch)(LoadData);
// export default LoadData;
