import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history'
import { Field, CreateDB, RemoveTable, LoadDB, Modal, ShowAssociationForm, ShowCreateForm, ShowLoadForm, ShowLoadDataForm, LoadData, ShowModal, UpdateTableName, ShowSQL, ShowTableForm, ShowRemoveTable, UpdateFieldForm, ShowUpdateTableName } from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTable: false,
            showUpdateField: false

        }
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
        this.handleClick = this.handleClick.bind(this)
        this.showUpdateFieldName = this.showUpdateFieldName.bind(this);
        // this.showAssociationForm = this.showAssociationForm.bind(this);
    }

    showUpdateTableName(e) {
        e.preventDefault();
        this.setState({
            showUpdateTable: true,
            showUpdateField: false
        })
    }

    showUpdateFieldName(e) {
        e.preventDefault();
        this.setState({
            showUpdateTable: false,
            showUpdateField: true
        })
    }
    handleClick(evt){
        evt.preventDefault
        history.push('/data')
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='buttons'>
                    <h1>Database: {this.props.database.name}</h1>
                    <ShowCreateForm/>
                    <ShowLoadForm/>
                    <ShowTableForm/>
                    <ShowSQL/>
                    <ShowRemoveTable/>
                    <ShowAssociationForm/>
                    <ShowLoadDataForm/>
                    <ShowUpdateTableName/>
                    <button onClick={this.handleClick}>SHOW TABLE DATA</button>
                    <UpdateFieldForm/>
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
