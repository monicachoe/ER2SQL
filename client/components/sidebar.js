import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Field, CreateDB, RemoveTable, LoadDB, Modal, ShowAssociationForm, ShowCreateForm, ShowLoadForm, ShowLoadDataForm, LoadData, ShowModal, UpdateTableName, ShowSQL, ShowTableForm, ShowRemoveTable } from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTable: false
        }
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
    }

    showUpdateTableName(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showUpdateTable: true
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='buttons'>
                    <h1>Database: {this.props.database.name}</h1>
                    <ShowCreateForm/>
                    <ShowLoadForm/>
                    <ShowTableForm/>
                    <button onClick={this.showUpdateTableName}>Update Table Name</button>
                    <ShowSQL/>
                    <ShowRemoveTable/>
                    <ShowAssociationForm/>
                    <ShowLoadDataForm/>
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
