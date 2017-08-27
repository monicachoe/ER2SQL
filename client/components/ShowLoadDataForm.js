import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases, clearTemp} from '../store'
import { LoadData } from './index';
import Modal from './Modal';


class ShowLoadDataForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoadData: false,
        }
        this.showLoadDataForm = this.showLoadDataForm.bind(this);
    }
    showLoadDataForm(evt) {
        evt.preventDefault()
        this.setState({
            showLoadData: !this.state.showLoadData
        })
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.showLoadDataForm}>LOAD DATA</button>
                <Modal className = 'modal' show= {this.state.showLoadData}
                    onClose={this.showLoadDataForm}>
                    <LoadData/>
                    <button className = 'tablebutton' onClick ={this.showLoadDataForm}>✕</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowLoadDataForm);
