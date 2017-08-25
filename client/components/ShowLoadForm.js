import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases, clearTemp} from '../store'
import { LoadDB } from './index';
import Modal from './Modal';

class ShowLoadForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoad: false
        }
        this.showLoadForm = this.showLoadForm.bind(this);
    }
    showLoadForm(evt) {
        evt.preventDefault()
        this.setState({
            showLoad: !this.state.showLoad
        })
        this.props.getUserDatabases(this.props.user.id);
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.showLoadForm}>LOAD DATABASE</button>
                <Modal className = 'modal' show= {this.state.showLoad}
                    onClose={this.showLoadForm}>
                    <LoadDB className=''/>
                    <button className = 'tablebutton' onClick ={this.showLoadForm}>✕</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowLoadForm);
