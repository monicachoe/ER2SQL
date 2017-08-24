import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import history from '../history'
import { Field, CreateDB, RemoveTable, LoadDB, Modal, ShowAssociationForm, ShowCreateForm, ShowLoadForm, ShowLoadDataForm, LoadData, ShowModal, ShowUpdateTableName, ShowSQL, ShowTableForm, ShowRemoveTable } from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTable: false
        }
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    showUpdateTableName(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showUpdateTable: true
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
