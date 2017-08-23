import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases, clearTemp} from '../store'
import { Association } from './index';
import Modal from './Modal';

class ShowAssociationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAssociation: false,
        }
        this.showAssociationForm = this.showAssociationForm.bind(this);
    }
    showAssociationForm(evt) {
        evt.preventDefault()
        this.setState({
            showAssociation: !this.state.showAssociation
        })
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.showAssociationForm}>+ ASSOCIATION</button>
                <Modal className = 'modal' show= {this.state.showAssociation}
                    onClose={this.showAssociationForm}>
                    <Association/>
                    <button onClick ={this.showAssociationForm}>DONE</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowAssociationForm);
