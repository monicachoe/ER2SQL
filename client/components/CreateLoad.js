import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases} from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CreateTable, Field, CreateDB, RemoveTable, LoadDB} from './index';

class CreateLoad extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            showCreate: false,
            showLoad: false,
        }
        this.showCreateForm = this.showCreateForm.bind(this)
        this.showLoadForm = this.showLoadForm.bind(this)
        // this.showBothForm = this.showBothForm.bind(this)
    }
    showCreateForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: true,
            showLoad: false
        })
    }

    showLoadForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: false,
            showLoad: true
        })
        this.props.getUserDatabases(this.props.user.id);
    }
        //Remove this check once we have our home page not showing
        // createdb/ loaddb options before logging in
    // showBothForm(evt){
    //     evt.preventDefault()
    //     if(this.state.showLoad){
    //         this.state
    //     }
    //     this.setState({
    //         showLoad: !this.state.showLoad,
    //         showCreate: !this.state.showCreate
    //     })
    // }
    render() {
        let error = this.props.error;
        return (
            <div>
                <button onClick={this.showCreateForm}>Create Db</button>
                <button onClick={this.showLoadForm}>Load DB</button>
                {this.state.showLoad ? <LoadDB/> : <div/>}
                {this.state.showCreate ? <CreateDB/> : <div/>}
                {error && error.response && <div> {error.response.data} </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user,
        userdbs : state.userdbs,
        error : state.database.error
    }
}

const mapDisptachProps = (dispatch) => {
  return {
    getUserDatabases(userId){
      dispatch(getUserDatabases(userId))
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(CreateLoad);
