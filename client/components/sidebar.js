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
            showCreateTable: false,
            showRemoveTable: false,
            showAssociation: false
        }
        // this.showBothForm = this.showBothForm.bind(this)
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
        this.showAssociationForm = this.showAssociationForm.bind(this);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: true,
            showRemoveTable: false,
            showAssociation: false
        })
    }

    showRemoveTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: true,
            showAssociation: false
        })
    }
    showAssociationForm(e){
        e.preventDefault();
        this.setState({
            showAssociation: !this.state.showAssociation
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
                <button onClick={this.showCreateTableForm}>Create Table</button>
                <button onClick={this.showRemoveTableForm}>RemoveTable</button>
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
      dispatch(getUserDatabases())
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(Sidebar);
