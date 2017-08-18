import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadDatabase, getMetatables } from '../store';

class LoadDb extends Component {

  constructor(props){
    super(props);
    this.state = {
      'dbName': ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.database !== this.props.database){
      console.log("db id: ", nextProps.database.id);
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
    console.log("metatable after loading: ", this.props.metatable);
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
        {this.props.metatable[0] && this.props.metatable.map( eachTable => {
          <div>{eachTable.name}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = ({user, userdbs, database, metatable}) => ({user, userdbs, database, metatable});

const mapDisptachProps = (dispatch) => {
  return {
    loadDatabase(selectedDb){
      dispatch(loadDatabase(selectedDb));
      // console.log("selectedDb: ", selectedDb);
      // dispatch(getMetatables(selectedDb.id));
    },
    getMetatables(databaseId){
      console.log("in getmeta dispath load");
      dispatch(getMetatables(databaseId));
    }

  }
}

export default connect(mapStateToProps, mapDisptachProps)(LoadDb);