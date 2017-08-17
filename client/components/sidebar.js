import React, { Component } from 'react';
import {connect} from 'react-redux';
import {CreateTable, Field, CreateDB, LoadDb} from './index';
import {getUserDatabases} from '../store'

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
            showLoad: false,
        }
        this.showCreateForm = this.showCreateForm.bind(this)
        this.showLoadForm = this.showLoadForm.bind(this)
    }
    showCreateForm(evt) {
        evt.preventDefault()
        if(this.state.showLoad){
            this.setState({
            showLoad: !this.state.showLoad
            })
        }
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    showLoadForm(evt) {
        evt.preventDefault()
        if(this.state.showCreate){
            this.setState({
            showCreate: !this.state.showCreate
            })
        }
        this.setState({
            showLoad: !this.state.showLoad
        })
        //Remove this check once we have our home page not showing
        // createdb/ loaddb options before logging in
        if (this.props.user.id){
            this.props.getUserDatabases(this.props.user.id);
        }
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
                {
                    this.state.showLoad
                        ? <LoadDb/> : <div/>
                }
                {
                    this.state.showCreate
                    ? <CreateDB/> : <div/>
                }
                <CreateTable/>
            </div>
        )
    }
}

const mapStateToProps = ({user, userdbs}) => ({user, userdbs});

const mapDisptachProps = (dispatch) => {
  return {
    getUserDatabases(userId){
      console.log('userId: ', userId);
      dispatch(getUserDatabases(userId))
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(Sidebar);
