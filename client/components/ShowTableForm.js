import React, { Component } from 'react';
import {CreateTable} from './index';
import Modal from './Modal';

class ShowCreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddTable: false,
        }
        this.showTableForm = this.showTableForm.bind(this);
    }
    showTableForm(evt) {
        evt.preventDefault()
        this.setState({
            showAddTable: !this.state.showAddTable
        })
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.showTableForm}>+ NEW TABLE</button>
                <Modal className = 'modal' show= {this.state.showAddTable}
                    onClose={this.showTableForm}>
                    <CreateTable/>
                    <button className = 'tablebutton' onClick ={this.showTableForm}>✕</button>
                </Modal>
            </div>
        )
    }
}

// const mapStateToProps = ({user, userdbs}) => ({user, userdbs});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserDatabases(userId){
//       dispatch(getUserDatabases(userId))
//     },
//     clearTables(){
//       dispatch(clearTemp())
//     }
//   }
// }

export default (ShowCreateForm);
