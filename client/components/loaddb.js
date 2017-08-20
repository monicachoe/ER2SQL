import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadDatabase, getMetatables } from '../store';

class LoadDb extends Component {

  constructor(props){
    super(props);
    this.state = {
      'dbName': '-'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if((Object.keys(nextProps.database).length !== 0) && (nextProps.database !== this.props.database)){
      this.props.getMetatables(nextProps.database.id);
    }
  }

  handleChange(evt){
    this.setState({dbName: evt.target.value})
  }

  handleSubmit (evt){
    evt.preventDefault();
    let selectedDb = this.props.userdbs.filter((eachDb) => {
      if (eachDb.name === this.state.dbName ) return eachDb;
    })
    this.props.loadDatabase(selectedDb[0]);
  }

  render (){
    return (
      <div>
        <form onSubmit= {this.handleSubmit}>
          <label htmlFor="load">Select database</label>
          <select name="load" onChange={this.handleChange}>
            <option value={this.state.dbName}>{this.state.dbName}</option>
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

const mapStateToProps = ({user, userdbs, database, metatable}) => ({user, userdbs, database, metatable});

const mapDisptachProps = (dispatch) => {
  return {
    loadDatabase(selectedDb){
      dispatch(loadDatabase(selectedDb));
    },
    getMetatables(databaseId){
      dispatch(getMetatables(databaseId));
    }

  }
}

export default connect(mapStateToProps, mapDisptachProps)(LoadDb);
