import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAssociation} from '../store';

class Association extends Component {
  constructor(props){
    super(props);
    this.state = {
      foreignKey: '',
      assocType: '-',
      table1 : '',
      table2 : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const database = this.props.database;
    const src = this.props.tables.filter(each=>each.name===this.state.table1)[0];
    const target = this.props.tables.filter(each=>each.name===this.state.table2)[0];
    const assocType = this.state.assocType;
    const fkName = this.state.foreignKey;
    this.props.createAssociation(database, src, target, assocType, fkName);
  }

  render(){
    let tables = this.props.tables;
    let assocTypes = ['one to one', 'one to many', 'many to one', 'many to many'];
    console.log('table 1: ', this.state.table1, 'table 2: ', this.state.table2);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Source: <select name="table1" onChange={this.handleChange}>
            <option>-select-</option>
            {tables.filter(each=> each.name!==this.state.table2).map((each, index) => {
              return <option key={each.tableId} value={each.name}>{each.name}</option>
            })}
          </select>
        </label>
        <label>Target: <select name="table2" onChange={this.handleChange}>
            <option>-select-</option>
            {tables.filter(each=> each.name!==this.state.table1).map((each, index) => <option key={each.tableId} value={each.name}>{each.name}</option>)}
          </select>
        </label>
        <label>Association Type: <select name="assocType" onChange={this.handleChange}>
            <option>-</option>
            {assocTypes.map(each => <option key={each} value={each}>{each}</option>)}
          </select>
        </label>
        {(this.state.assocType==='many to many' || this.state.assocType==='-') ? null : <div><label>Foreign key as: </label>
          <input type="text" name="foreignKey" value={this.state.foreignKey} onChange={this.handleChange} /></div>}
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
    }
  }
};

export default connect(mapState, mapDispatch)(Association);