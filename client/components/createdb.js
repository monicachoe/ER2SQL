import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {createDatabase} from '../store'

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
  }
  render(){
    return (
      <div>
      <h1>In CreateDB page</h1>
      <form onSubmit={this.handleSubmit}>
        <label>Enter the DB name:</label>
        <input name="db" type="text" />
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps))(CreateDB);
// export default CreateDB;
