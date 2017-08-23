import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {VisualizationForm, CreateTable, Field, CreateDB, RemoveTable, LoadDB, Modal, Association, ShowCreateForm, ShowLoadForm, ShowLoadDataForm, LoadData, ShowModal, UpdateTableName, ShowSQL } from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: false,
            showLoadData: false,
            showUpdateTable: false,
            showVis: false
        }
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
        this.showCreateAssociationForm = this.showCreateAssociationForm.bind(this);
        this.showLoadData = this.showLoadData.bind(this);
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
        this.showVisualization = this.showVisualization.bind(this);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: true,
            showRemoveTable: false,
            showCreateAssociation: false,
            showUpdateTable: false
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
    showAssociationForm(e){
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

    showVisualization() {
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: false,
            showLoadData: false,
            showUpdateTable: false,
            showVis: true
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='buttons'>
                    <h1>{this.props.database.name}</h1>
                    <ShowCreateForm/>
                    <ShowLoadForm/>
                    <button onClick={this.showCreateTableForm}>+ NEW TABLE</button>
                    <button onClick={this.showCreateAssociationForm}>+ ASSOCIATION</button>
                    <button onClick={this.showRemoveTableForm}>REMOVE TABLE</button>
                    <button onClick={this.showUpdateTableName}>Update Table Name</button>
                    <button onClick={this.showVisualization}>Visualize</button>
                    <ShowSQL/>
                    {this.state.showCreateTable ? <CreateTable /> : null}
                    {this.state.showRemoveTable ? <RemoveTable /> : null}
                    {this.state.showCreateAssociation ? <Association /> : null}
                    <ShowLoadDataForm/>
                    {this.state.showUpdateTable ? <UpdateTableName /> : null}
                    {this.state.showVis ? <VisualizationForm /> : null}
                    
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
