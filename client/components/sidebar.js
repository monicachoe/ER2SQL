import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases} from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CreateTable, Field, CreateDB, RemoveTable, LoadDB} from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
            showLoad: false,
            showCreateTable: false,
            showRemoveTable: false
        }
        this.showCreateForm = this.showCreateForm.bind(this)
        this.showLoadForm = this.showLoadForm.bind(this)
        // this.showBothForm = this.showBothForm.bind(this)
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
    }
    showCreateForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: true,
            showLoad: false,
            showCreateTable: false,
            showRemoveTable: false
        })
    }

    showLoadForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: false,
            showLoad: true,
            showCreateTable: false,
            showRemoveTable: false
        })
        this.props.getUserDatabases(this.props.user.id);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showLoad: false,
            showCreate: false,
            showCreateTable: true,
            showRemoveTable: false
        })
    }

    showRemoveTableForm(e) {
        e.preventDefault();
        this.setState({
            showLoad: false,
            showCreate: false,
            showCreateTable: false,
            showRemoveTable: true
        })
    }
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
        return (
            <div>
                <h1>Options</h1>
                <button onClick={this.showCreateForm}>Create Db</button>
                <button onClick={this.showLoadForm}>Load DB</button>
                <button onClick={this.showRemoveTableForm}>RemoveTable</button>
                <button onClick={this.showCreateTableForm}>Create Table</button>
                {this.state.showLoad ? <LoadDB/> : <div/>}
                {this.state.showCreate ? <CreateDB/> : <div/>}
                {this.state.showCreateTable ? <CreateTable /> : null}
                {this.state.showRemoveTable ? <RemoveTable /> : null}
            </div>
        )
    }
}

const mapStateToProps = ({user, userdbs}) => ({user, userdbs});

const mapDisptachProps = (dispatch) => {
  return {
    getUserDatabases(userId){
      console.log('userId: ', userId);
      console.log("dispatched from sidebar")
      dispatch(getUserDatabases())
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(Sidebar);
