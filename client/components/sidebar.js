import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases} from '../store'
import {CreateTable, RemoveTable, Association, LoadData} from './index';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: false,
            showLoadData: false
        }
        // this.showBothForm = this.showBothForm.bind(this)
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
        this.showCreateAssociationForm = this.showCreateAssociationForm.bind(this);
        this.showLoadData = this.showLoadData.bind(this);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: true,
            showRemoveTable: false,
            showCreateAssociation: false
        })
    }

    showRemoveTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: true,
            showCreateAssociation: false
        })
    }

    showCreateAssociationForm(e){
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

    showLoadData(){
        this.setState({
            showLoadData: !this.state.showLoadData
        })
    }
    render() {
        return (
            <div className = 'sidebar'>
                <div className = 'buttons'>
                <h1>Options</h1>
                <button onClick={this.showCreateTableForm}>Create Table</button>
                <button onClick={this.showCreateAssociationForm}>Create Association</button>
                <button onClick={this.showLoadData}>Load Data</button>
                {this.state.showCreateTable ? <CreateTable /> : null}
                {this.state.showRemoveTable ? <RemoveTable /> : null}
                {this.state.showCreateAssociation ? <Association /> : null}
                {this.state.showLoadData ? <LoadData /> : null}
                </div>
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
