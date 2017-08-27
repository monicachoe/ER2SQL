import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadDatabase, getMetatables } from '../store';
import {Link} from 'react-router-dom'
import history from '../history'

class LoadDb extends Component {
  constructor(props){
    super(props);
    this.state = {
      'dbName': '-select-'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // looks like we don't need to do this but keeping just in case
  // componentWillReceiveProps(nextProps){
  //   if((Object.keys(nextProps.database).length !== 0) && (nextProps.database !== this.props.database)){
  //     console.log('inside of LOADDB')
  //     this.props.loadDatabase(nextProps.database);
  //   }
  // }

  handleChange(evt){
    this.setState({dbName: evt.target.value})
  }

  handleSubmit (evt){
    evt.preventDefault();
    let selectedDb = this.props.userdbs.filter((eachDb) => eachDb.name === this.state.dbName);
    this.props.loadDatabase(selectedDb[0]);
    var table = selectedDb[0]
    history.push('/schema')
  }

  render (){
    return (
      <div>
        <form onSubmit= {this.handleSubmit}>
          <label htmlFor="load">Select a database</label>
          <select name="load" onChange={this.handleChange}>
            <option value={this.state.dbName}>{this.state.dbName}</option>
            {this.props.userdbs && this.props.userdbs.map(eachDB => {
              return (<option key={eachDB.id} value={eachDB.name}>{eachDB.name}</option>)
            })}
          </select>
            <button type='submit'>Load DB</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user, userdbs, database, metatable}) => ({user, userdbs, database, metatable});

const mapDispatch = (dispatch) => {
  return {
    loadDatabase(selectedDb){
      dispatch(loadDatabase(selectedDb));
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(LoadDb);
