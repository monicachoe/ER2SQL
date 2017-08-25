import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMail, getUserDatabases } from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import {EndpointsInfo, Field, CreateDB, RemoveTable, LoadDB, Modal, ShowAssociationForm, ShowCreateForm, ShowLoadForm, ShowLoadDataForm, LoadData, ShowModal, UpdateTableName, ShowSQL, ShowTableForm, ShowRemoveTable, UpdateFieldForm, ShowUpdateTableName} from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTable: false,
            showUpdateField: false,
            showEndpoints: false
        }
        this.showUpdateTableName = this.showUpdateTableName.bind(this);
        // this.showEndpointInfo = this.showEndpointInfo.bind(this);
        this.handleClick = this.handleClick.bind(this)
        this.showUpdateFieldName = this.showUpdateFieldName.bind(this);
    }

    showUpdateTableName(e) {
        e.preventDefault();
        this.setState({
            showUpdateTable: true,
            showUpdateField: false
        })
    }

    // showEndpointInfo(e){
    //     e.preventDefault();
    //     this.setState({
    //         showUpdateTable: false,
    //         showEndpoints: true
    //     })
    //     this.props.sendEmail();
    // }

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
                    <ShowUpdateTableName />
                    <UpdateFieldForm />
                    <button onClick={this.handleClick}>SHOW TABLE DATA</button>
                    <EndpointsInfo />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user, userdbs, database }) => ({ user, userdbs, database });

const mapDispatchProps = (dispatch) => {
    return {
        getUserDatabases(userId) {
            dispatch(getUserDatabases())
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Sidebar);
