import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadDatabase } from '../store';

class LoadDb extends Component {

  constructor(props){
    super(props);
    this.state = {
      'dbName': ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    this.setState({dbName: evt.target.value});
  }

  handleSubmit (evt){
    evt.preventDefault();
    let selectedDb = this.props.userdbs.filter((eachDb) => {
      if (eachDb.name === this.state.dbName ) return eachDb;
    })
    this.props.loadDatabase(selectedDb);
  }

  render(){
    return (
      <div>
        <form onSubmit= {this.handleSubmit}>
          <label htmlFor="load">Select database</label>
          <select name="load" onChange={this.handleChange}>
            {this.props.userdbs && this.props.userdbs.map(eachDB => {
              return (<option key={eachDB.id} value={eachDB.name}>{eachDB.name}</option>)
            })}
          </select>
          <button type="submit">Load DB</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user, userdbs}) => ({user, userdbs});

const mapDisptachProps = (dispatch) => {
  return {
    loadDatabase(selectedDb){
      dispatch(loadDatabase(selectedDb));
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(LoadDb);
