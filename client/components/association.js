import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAssociation, getMetatables} from '../store';

class Association extends Component {
  constructor(props){
    super(props);
    this.state = {
      foreignKey: '',
      assocType: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({foreignKey: evt.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const database = this.props.database;
    const src = this.props.tables[e.target.table1.value];
    const target = this.props.tables[e.target.table2.value];
    const assocType = e.target.associationType.value;
    this.setState({assocType: assocType});
    const fkName = this.state.foreignKey;
    this.props.createAssociation(database, src, target, assocType, fkName);
    this.props.getMetatables(this.props.database.id)
  }

  render(){
    let tables = this.props.tables;
    let assocTypes = ['one to one', 'one to many', 'many to one', 'many to many'];
    return (
    <form onSubmit={this.handleSubmit}>
      <label>Source: <select name="table1">
          <option>-select-</option>
          {tables.map((each, index) => {
            return <option key={each.tableId} value={index}>{each.name}</option>
          })}
        </select>
      </label>
      <label>Target: <select name="table2">
          <option>-select-</option>
          {tables.map((each, index) => <option key={each.tableId} value={index}>{each.name}</option>)}
        </select>
      </label>
      <label>Association Type: <select name="associationType">
          <option>-</option>
          {assocTypes.map(each => <option key={each} value={each}>{each}</option>)}
        </select>
      </label>
      {
        (this.state.assocType !== 'many to many')
        ? <div><label>Foreign key as: </label>
        <input type="text" name="foreignKey" value={this.state.foreignKey} onChange={this.handleChange} /></div>
        : ''
      }
      <input type="submit" />
    </form>
    );
  }
}


const mapState = (state) => {
  return {
    tables : state.metatable,
    database : state.database
  }
};

const mapDispatch = (dispatch) => {
  return {
    createAssociation(database, src, target, assocType, fkName){
      dispatch(createAssociation(database, src, target, assocType, fkName));
    },
    getMetatables(dbId){
      dispatch(getMetatables(dbId))
    }
  }
};

export default connect(mapState, mapDispatch)(Association);

