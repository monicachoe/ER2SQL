import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserDatabases} from '../store';

class LoadDb extends Component {

  constructor(props){
    super(props);
    this.state = {
      'selectedDb': ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user.id && this.props.user !== nextProps.user){
      this.props.getUserDatabases(nextProps.user.id);
    }
  }

  handleChange(evt){
    console.log("target", evt.target);
    console.log("target value", evt.target.value);
  }

  handleSubmit (evt){
    evt.preventDefault();
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
    getUserDatabases(userId){
      dispatch(getUserDatabases(userId))
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(LoadDb);
