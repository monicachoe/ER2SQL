import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CreateTable, Field, CreateDB, RemoveTable, LoadDB, Modal, Association, CreateLoad, LoadData, ShowModal, UpdateTableName } from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: false,
            showLoadData: false,
            showUpdateTable: false
            // ,
            // showAssociation: false
        }
        // this.showBothForm = this.showBothForm.bind(this)
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
        this.showCreateAssociationForm = this.showCreateAssociationForm.bind(this);
        this.showLoadData = this.showLoadData.bind(this);
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
        // this.showAssociationForm = this.showAssociationForm.bind(this);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: true,
            showRemoveTable: false,
            showCreateAssociation: false,
            showUpdateTable: false
            // ,
            // showAssociation: false
        })
    }

    showRemoveTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: true,
            showCreateAssociation: false,
            showUpdateTable: false
        })
    }

    showCreateAssociationForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: true
        })
    }
    showAssociationForm(e) {
        e.preventDefault();
        this.setState({
            showAssociation: !this.state.showAssociation
        })
    }

    showLoadData() {
        this.setState({
            showLoadData: !this.state.showLoadData
        })
    }

    showUpdateTableName(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showUpdateTable: true
        })
    }
    // showAssociationForm(e){
    //     e.preventDefault();
    //     this.setState({
    //         showAssociation: !this.state.showAssociation
    //     })
    // }
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
            <div className='sidebar'>
                <div className='buttons'>
                    <h1>{this.props.database.name}</h1>
                    <button onClick={this.showCreateTableForm}>⊕ New Table</button>
                    <button onClick={this.showCreateAssociationForm}>Create Association</button>
                    <button onClick={this.showRemoveTableForm}>Remove Table</button>
                    <button onClick={this.showLoadData}>Load Data</button>
                    <button onClick={this.showUpdateTableName}>Update Table Name</button>
                    <CreateLoad />
                    {this.state.showCreateTable ? <CreateTable /> : null}
                    {this.state.showRemoveTable ? <RemoveTable /> : null}
                    {this.state.showCreateAssociation ? <Association /> : null}
                    {this.state.showLoadData ? <LoadData /> : null}
                    {this.state.showUpdateTable ? <UpdateTableName /> : null}

                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user, userdbs, database }) => ({ user, userdbs, database });

const mapDisptachProps = (dispatch) => {
    return {
        getUserDatabases(userId) {
            dispatch(getUserDatabases())
        }
    }
}

export default connect(mapStateToProps, mapDisptachProps)(Sidebar);
