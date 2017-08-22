import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases, clearTemp} from '../store'
import {CreateDB, LoadDB} from './index';
import Modal from './Modal';

class CreateLoad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
        }
        this.showCreateForm = this.showCreateForm.bind(this);
    }
    showCreateForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.showCreateForm}>Create Db</button>
                <Modal className = 'modal' show= {this.state.showCreate}
                    onClose={this.showCreateForm}>
                    <CreateDB/>
                    <button onClick ={this.showCreateForm}>DONE</button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({user, userdbs}) => ({user, userdbs});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDatabases(userId){
      dispatch(getUserDatabases(userId))
    },
    clearTables(){
      dispatch(clearTemp())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLoad);
