import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createDatabase, clearTemp} from '../store'
import {Link} from 'react-router-dom'
import history from '../history'

class CreateDB extends Component {
  constructor(props){
    super(props);
    this.state = {
      dbName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({dbName: evt.target.value});
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.createDB(this.state.dbName, this.props.user.id);
    history.push('/schema')
    this.setState({
      dbName : ''
    });
  }
  render(){
    return (
      <div>
      <form className = 'createdbform' onSubmit={this.handleSubmit}>
        <label>Enter the DB name:</label>
        <input name="db" type="text" value={this.state.dbName} onChange={this.handleChange}/>
        <button type="submit">Create DB</button>
      </form>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = (dispatch) => {
  return {
    createDB(dbName, userID){
      dispatch(createDatabase(dbName, userID));
    },
    loadDB(selectedDB){
      dispatch(loadDatabase(selectedDB))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDB);
